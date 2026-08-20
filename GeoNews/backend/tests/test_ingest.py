"""Adapter normalize + mock ingest upsert tests."""

from __future__ import annotations

from pathlib import Path

from classify import classify_text
from db import connect, query_events_bbox
from ingest.base import mentions_place, strip_html
from ingest.gdelt import extract_url, is_real_article_url, parse_seendate
from ingest.guardian import normalize_results, parse_publication_date
from ingest.rss import parse_pub_date
from ingest.runner import build_adapters, run_ingest
from ingest.sample import SampleAdapter


def test_sample_adapter_normalize() -> None:
    batch = SampleAdapter().fetch()
    assert len(batch.events) >= 30
    assert len(batch.incidents) >= 20
    ev = batch.events[0]
    for key in (
        "source",
        "external_id",
        "title",
        "category",
        "severity",
        "lat",
        "lon",
        "occurred_at",
        "ingested_at",
    ):
        assert key in ev
    assert ev["source"] == "sample"
    assert 1 <= int(ev["severity"]) <= 5
    inc = batch.incidents[0]
    assert inc["source"] == "sample"


def test_classify_keywords() -> None:
    hit = classify_text("Deadly shooting downtown", "Police responded")
    assert hit["category"] == "crime"
    assert hit["severity"] >= 3

    flood = classify_text("Flash flood closes roads", None)
    assert flood["category"] == "disaster"

    cameo = classify_text("Clashes reported", None, cameo="190", tone=-9)
    assert cameo["category"] == "conflict"
    assert cameo["severity"] >= 4


def test_gdelt_url_helpers() -> None:
    assert is_real_article_url("https://www.bbc.com/news/article-1")
    assert not is_real_article_url("https://news.example.local/story")
    assert not is_real_article_url("not-a-url")

    assert extract_url({"url": "https://reuters.com/x"}) == "https://reuters.com/x"
    html = '<a href="https://apnews.com/article/abc">Headline</a>'
    assert extract_url({"html": html}) == "https://apnews.com/article/abc"
    assert extract_url({"html": "<b>no link</b>"}) is None


def test_place_relevance() -> None:
    assert mentions_place("Flooding shuts Dhaka streets", "Dhaka")
    assert mentions_place("dhaka bus fire kills two", "Dhaka")
    assert mentions_place("Flooding in Chattogram port", "Chattogram, Bangladesh")
    assert not mentions_place("Michigan shooting leaves six dead", "Dhaka")
    assert not mentions_place("", "Dhaka")


def test_guardian_publication_date() -> None:
    assert parse_publication_date("2026-08-16T04:12:33Z") == "2026-08-16T04:12:33Z"
    assert parse_publication_date("nonsense") is None
    assert parse_publication_date(None) is None


def test_guardian_normalize_results() -> None:
    results = [
        {
            "id": "world/2026/aug/16/dhaka-transport",
            "webTitle": "Dhaka begins phasing out battery rickshaws",
            "webUrl": "https://www.theguardian.com/world/2026/aug/16/dhaka-transport",
            "webPublicationDate": "2026-08-16T04:12:33Z",
            "sectionName": "World news",
            "fields": {"trailText": "<p>Protests followed the <b>announcement</b></p>"},
        },
        {
            "webTitle": "Cricket county round-up",
            "webUrl": "https://www.theguardian.com/sport/2026/aug/16/county",
            "fields": {"trailText": "Nothing to do with the watchlist"},
        },
        {"webTitle": "No link here", "webUrl": ""},
    ]
    events = normalize_results(
        results, place="Dhaka", lat=23.8103, lon=90.4125, now="2026-08-16T05:00:00Z"
    )

    assert len(events) == 1
    event = events[0]
    assert event["source"] == "guardian"
    assert event["source_name"] == "The Guardian"
    assert event["url"] == "https://www.theguardian.com/world/2026/aug/16/dhaka-transport"
    assert event["summary"] == "Protests followed the announcement"
    assert event["occurred_at"] == "2026-08-16T04:12:33Z"
    assert (event["lat"], event["lon"]) == (23.8103, 90.4125)
    assert 1 <= int(event["severity"]) <= 5


def test_gdelt_seendate_parsing() -> None:
    assert parse_seendate("20260816T004500Z") == "2026-08-16T00:45:00Z"
    assert parse_seendate("bad-value") is None
    assert parse_seendate(None) is None


def test_rss_strip_html() -> None:
    raw = '<a href="https://x.test/a">Flood hits city</a>&nbsp;&nbsp;<font>Daily Star</font>'
    assert strip_html(raw) == "Flood hits city Daily Star"
    assert strip_html("") == ""


def test_rss_pub_date() -> None:
    assert parse_pub_date("Sat, 16 Aug 2026 04:00:00 GMT") == "2026-08-16T04:00:00Z"
    assert parse_pub_date("not a date") is None
    assert parse_pub_date(None) is None


def test_live_adapters_exclude_sample(db_path: Path) -> None:
    conn = connect(db_path)
    try:
        sources = [a.source for a in build_adapters(conn, mock=False)]
        mock_sources = [a.source for a in build_adapters(conn, mock=True)]
    finally:
        conn.close()
    assert "sample" not in sources
    assert "gdelt" in sources
    assert mock_sources == ["sample"]


def test_ingest_mock_upsert(db_path: Path, monkeypatch) -> None:
    monkeypatch.setattr("db.connection.DEFAULT_DB_PATH", db_path)
    summary = run_ingest(mock=True, trigger="test")
    assert summary["ok"] is True
    assert summary["rows_upserted"] >= 1

    conn = connect(db_path)
    try:
        events = query_events_bbox(
            conn,
            min_lat=23.6,
            min_lon=90.2,
            max_lat=24.0,
            max_lon=90.6,
            limit=100,
        )
        assert len(events) >= 1
        runs = conn.execute("SELECT COUNT(*) AS c FROM ingest_runs").fetchone()["c"]
        assert runs >= 1
    finally:
        conn.close()


def test_place_query_name() -> None:
    from ingest.base import place_query_name

    assert place_query_name("Chattogram, Bangladesh") == "Chattogram"
    assert place_query_name("Dhaka") == "Dhaka"


class _FakeOkAdapter:
    source = "rss"

    def __init__(self, events: list[dict] | None = None) -> None:
        self._events = events or []

    def fetch(self):
        from ingest.base import AdapterBatch

        return AdapterBatch(events=list(self._events))


class _FakeFailAdapter:
    source = "gdelt"

    def fetch(self):
        raise RuntimeError("GDELT DOC unreachable")


def test_place_ingest_upserts_without_watchlist(db_path: Path, monkeypatch) -> None:
    monkeypatch.setattr("db.connection.DEFAULT_DB_PATH", db_path)
    monkeypatch.setenv("INGEST_MOCK", "false")
    import config as config_mod

    config_mod.get_settings.cache_clear()

    place = {
        "name": "Chattogram",
        "lat": 22.3569,
        "lon": 91.7832,
        "country_code": "bd",
    }
    event = {
        "source": "rss",
        "external_id": "https://news.example.com/chattogram-1",
        "title": "Port expansion planned in Chattogram",
        "summary": "Authorities announced a new berth",
        "url": "https://news.example.com/chattogram-1",
        "source_name": "Example News",
        "category": "economy",
        "severity": 2,
        "lat": place["lat"],
        "lon": place["lon"],
        "place_name": place["name"],
        "occurred_at": "2026-08-17T10:00:00Z",
        "ingested_at": "2026-08-17T10:00:00Z",
    }

    def _fake_build(conn, *, mock=None, places=None):
        assert places is not None
        assert places[0]["name"] == "Chattogram"
        assert places[0]["lat"] == place["lat"]
        return [_FakeOkAdapter([event]), _FakeFailAdapter()]

    monkeypatch.setattr("ingest.runner.build_adapters", _fake_build)

    from db import list_watchlist
    from ingest.runner import run_place_ingest

    conn = connect(db_path)
    try:
        before = list_watchlist(conn)
    finally:
        conn.close()

    result = run_place_ingest(place, mock=False)
    assert result["ok"] is True
    assert result["rows_upserted"] >= 1
    assert result["place"]["name"] == "Chattogram"
    assert "sources" in result
    assert any(s["source"] == "rss" and s["status"] == "ok" for s in result["sources"])
    assert any(e["place_name"] == "Chattogram" for e in result["events"])

    conn = connect(db_path)
    try:
        after = list_watchlist(conn)
        assert after == before
        assert not any(p["name"] == "Chattogram" for p in after)
        runs = conn.execute(
            "SELECT source, status FROM ingest_runs ORDER BY started_at"
        ).fetchall()
        sources = {r["source"]: r["status"] for r in runs}
        assert sources.get("rss") == "ok"
        assert sources.get("gdelt") == "error"
    finally:
        conn.close()


def test_place_ingest_zero_rows_ok(db_path: Path, monkeypatch) -> None:
    monkeypatch.setattr("db.connection.DEFAULT_DB_PATH", db_path)
    monkeypatch.setenv("INGEST_MOCK", "false")
    import config as config_mod

    config_mod.get_settings.cache_clear()

    class _EmptyGdelt:
        source = "gdelt"

        def fetch(self):
            from ingest.base import AdapterBatch

            return AdapterBatch()

    class _EmptyRss:
        source = "rss"

        def fetch(self):
            from ingest.base import AdapterBatch

            return AdapterBatch()

    monkeypatch.setattr(
        "ingest.runner.build_adapters",
        lambda conn, *, mock=None, places=None: [_EmptyGdelt(), _EmptyRss()],
    )

    from ingest.runner import run_place_ingest

    result = run_place_ingest(
        {"name": "Nowhereville", "lat": 1.0, "lon": 2.0},
        mock=False,
    )
    assert result["ok"] is True
    assert result["rows_upserted"] == 0
    assert result["events"] == []
    assert all(s["status"] == "ok" for s in result["sources"])


def test_place_ingest_all_sources_fail(db_path: Path, monkeypatch) -> None:
    monkeypatch.setattr("db.connection.DEFAULT_DB_PATH", db_path)
    monkeypatch.setenv("INGEST_MOCK", "false")
    import config as config_mod

    config_mod.get_settings.cache_clear()

    class _FailRss:
        source = "rss"

        def fetch(self):
            raise RuntimeError("RSS down")

    monkeypatch.setattr(
        "ingest.runner.build_adapters",
        lambda conn, *, mock=None, places=None: [_FakeFailAdapter(), _FailRss()],
    )

    from ingest.runner import run_place_ingest

    result = run_place_ingest(
        {"name": "Chattogram", "lat": 22.35, "lon": 91.78},
        mock=False,
    )
    assert result["ok"] is False
    assert result["error"]["code"] == "ingest_failed"
    assert result["rows_upserted"] == 0
    assert result["events"] == []
    assert all(s["status"] == "error" for s in result["sources"])


def test_place_ingest_purges_sample_only_when_live_rows(
    db_path: Path, monkeypatch
) -> None:
    monkeypatch.setattr("db.connection.DEFAULT_DB_PATH", db_path)
    monkeypatch.setenv("INGEST_MOCK", "false")
    import config as config_mod

    config_mod.get_settings.cache_clear()

    from ingest.base import AdapterBatch
    from ingest.runner import run_ingest, run_place_ingest

    run_ingest(mock=True, trigger="seed")
    conn = connect(db_path)
    try:
        sample_count = conn.execute(
            "SELECT COUNT(*) AS c FROM events WHERE source = 'sample'"
        ).fetchone()["c"]
        assert sample_count > 0
    finally:
        conn.close()

    class _EmptyRss:
        source = "rss"

        def fetch(self):
            return AdapterBatch()

    monkeypatch.setattr(
        "ingest.runner.build_adapters",
        lambda conn, *, mock=None, places=None: [_EmptyRss()],
    )
    zero = run_place_ingest({"name": "X", "lat": 10.0, "lon": 10.0}, mock=False)
    assert zero["ok"] is True
    assert zero["rows_upserted"] == 0

    conn = connect(db_path)
    try:
        still = conn.execute(
            "SELECT COUNT(*) AS c FROM events WHERE source = 'sample'"
        ).fetchone()["c"]
        assert still == sample_count
    finally:
        conn.close()

    live_event = {
        "source": "rss",
        "external_id": "https://news.example.com/x-1",
        "title": "X news",
        "summary": "X",
        "url": "https://news.example.com/x-1",
        "source_name": "Example",
        "category": "other",
        "severity": 2,
        "lat": 10.0,
        "lon": 10.0,
        "place_name": "X",
        "occurred_at": "2026-08-17T10:00:00Z",
        "ingested_at": "2026-08-17T10:00:00Z",
    }
    monkeypatch.setattr(
        "ingest.runner.build_adapters",
        lambda conn, *, mock=None, places=None: [_FakeOkAdapter([live_event])],
    )
    filled = run_place_ingest({"name": "X", "lat": 10.0, "lon": 10.0}, mock=False)
    assert filled["ok"] is True
    assert filled["rows_upserted"] >= 1

    conn = connect(db_path)
    try:
        left = conn.execute(
            "SELECT COUNT(*) AS c FROM events WHERE source = 'sample'"
        ).fetchone()["c"]
        assert left == 0
    finally:
        conn.close()
