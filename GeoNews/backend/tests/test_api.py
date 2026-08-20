"""Health + basic API smoke tests."""

from __future__ import annotations

from fastapi.testclient import TestClient


def test_health_ok(client: TestClient) -> None:
    resp = client.get("/api/health")
    assert resp.status_code == 200
    body = resp.json()
    assert body["ok"] is True
    assert "sources" in body
    for key in ("gdelt", "nominatim", "llm", "police_uk"):
        assert key in body["sources"]
    assert body["sources"]["llm"] == "mock"


def test_events_bbox_dhaka(client: TestClient) -> None:
    resp = client.get(
        "/api/events",
        params={
            "min_lat": 23.6,
            "min_lon": 90.2,
            "max_lat": 24.0,
            "max_lon": 90.6,
            "limit": 50,
        },
    )
    assert resp.status_code == 200
    events = resp.json()["events"]
    assert len(events) >= 1
    sample = events[0]
    for field in ("id", "source", "title", "category", "lat", "lon", "occurred_at"):
        assert field in sample


def test_event_not_found(client: TestClient) -> None:
    resp = client.get("/api/events/does-not-exist")
    assert resp.status_code == 404
    body = resp.json()
    assert body["error"]["code"] == "not_found"


def test_watchlist_roundtrip(client: TestClient) -> None:
    listed = client.get("/api/watchlist")
    assert listed.status_code == 200
    assert "places" in listed.json()

    created = client.post(
        "/api/watchlist",
        json={"name": "Testville", "lat": 1.0, "lon": 2.0, "radius_km": 10},
    )
    assert created.status_code == 201
    place_id = created.json()["id"]

    deleted = client.delete(f"/api/watchlist/{place_id}")
    assert deleted.status_code == 200
    assert deleted.json()["ok"] is True


def test_incidents_and_heatmap(client: TestClient) -> None:
    params = {
        "min_lat": 23.6,
        "min_lon": 90.2,
        "max_lat": 24.0,
        "max_lon": 90.6,
    }
    resp = client.get("/api/incidents", params={**params, "source": "sample"})
    assert resp.status_code == 200
    assert len(resp.json()["incidents"]) >= 1

    heat = client.get("/api/incidents/heatmap", params=params)
    assert heat.status_code == 200
    assert "points" in heat.json()


def test_hotspots(client: TestClient) -> None:
    resp = client.get(
        "/api/hotspots",
        params={
            "min_lat": 23.6,
            "min_lon": 90.2,
            "max_lat": 24.0,
            "max_lon": 90.6,
            "window": "7d",
        },
    )
    assert resp.status_code == 200
    body = resp.json()
    assert "hotspots" in body
    for h in body["hotspots"]:
        assert isinstance(h.get("name"), str) and h["name"].strip()
        assert h.get("place_name") == h["name"]


def test_hotspots_name_fallback_when_place_blank(client: TestClient, db_path) -> None:
    """BUG-E2E-002: sparse/blank place_name must still yield a non-empty name."""
    from datetime import datetime, timezone

    from db import connect, upsert_event

    now = datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")
    # Isolated coords so seed Dhaka/London rows do not share the cluster.
    lat, lon = -45.1234, 170.4567
    conn = connect(db_path)
    try:
        upsert_event(
            conn,
            {
                "source": "sample",
                "external_id": "blank-place-isolated-1",
                "title": "Sparse place event",
                "category": "other",
                "severity": 2,
                "lat": lat,
                "lon": lon,
                "place_name": "",
                "occurred_at": now,
            },
        )
        upsert_event(
            conn,
            {
                "source": "sample",
                "external_id": "blank-place-isolated-2",
                "title": "Whitespace place event",
                "category": "other",
                "severity": 3,
                "lat": lat + 0.001,
                "lon": lon + 0.001,
                "place_name": "   ",
                "occurred_at": now,
            },
        )
        conn.commit()
    finally:
        conn.close()

    resp = client.get(
        "/api/hotspots",
        params={
            "min_lat": -45.2,
            "min_lon": 170.3,
            "max_lat": -45.0,
            "max_lon": 170.6,
            "window": "7d",
            "limit": 20,
        },
    )
    assert resp.status_code == 200
    hotspots = resp.json()["hotspots"]
    assert len(hotspots) >= 1
    for h in hotspots:
        name = h.get("name")
        assert isinstance(name, str) and name.strip(), h
        assert h.get("place_name") == name
        # Blank input → coord label like "-45.12, 170.46"
        assert name == f"{h['lat']:.2f}, {h['lon']:.2f}"


def test_brief_and_chat_mock(client: TestClient) -> None:
    brief = client.get("/api/brief", params={"lat": 23.81, "lon": 90.41})
    assert brief.status_code == 200
    body = brief.json()
    assert body.get("mock") is True
    assert body.get("place_name") == "Dhaka"
    assert body.get("risk_level") in ("low", "moderate", "high", "unknown")
    assert isinstance(body.get("caveats"), list)

    chat = client.post(
        "/api/chat",
        json={
            "message": "What is happening in Dhaka?",
            "lat": 23.81,
            "lon": 90.41,
            "place_name": "Dhaka",
        },
    )
    assert chat.status_code == 200
    chat_body = chat.json()
    assert chat_body.get("mock") is True
    assert "message" in chat_body
    assert chat_body.get("brief", {}).get("place_name") == "Dhaka"


def test_ingest_place_endpoint_shape(client: TestClient, monkeypatch) -> None:
    from ingest.base import AdapterBatch

    place = {"name": "Chattogram", "lat": 22.3569, "lon": 91.7832, "country_code": "bd"}
    event = {
        "source": "rss",
        "external_id": "https://news.example.com/ctg-api-1",
        "title": "Chattogram rains disrupt traffic",
        "summary": "Local flooding reported",
        "url": "https://news.example.com/ctg-api-1",
        "source_name": "Example",
        "category": "disaster",
        "severity": 3,
        "lat": place["lat"],
        "lon": place["lon"],
        "place_name": place["name"],
        "occurred_at": "2026-08-17T11:00:00Z",
        "ingested_at": "2026-08-17T11:00:00Z",
    }

    class _Ok:
        source = "rss"

        def fetch(self):
            return AdapterBatch(events=[event])

    class _EmptyGdelt:
        source = "gdelt"

        def fetch(self):
            return AdapterBatch()

    monkeypatch.setenv("INGEST_MOCK", "false")
    import config as config_mod

    config_mod.get_settings.cache_clear()
    monkeypatch.setattr(
        "ingest.runner.build_adapters",
        lambda conn, *, mock=None, places=None: [_EmptyGdelt(), _Ok()],
    )
    # Bypass cooldown/busy from prior tests in-process.
    monkeypatch.setattr("ingest.runner._running", False)
    monkeypatch.setattr("ingest.runner._last_manual_run_at", 0.0)

    listed_before = client.get("/api/watchlist").json()["places"]
    resp = client.post("/api/ingest/place", json=place)
    assert resp.status_code == 200
    body = resp.json()
    assert body["ok"] is True
    assert body["place"]["name"] == "Chattogram"
    assert body["place"]["lat"] == place["lat"]
    assert body["place"]["lon"] == place["lon"]
    assert isinstance(body["rows_upserted"], int) and body["rows_upserted"] >= 1
    assert isinstance(body["sources"], list) and body["sources"]
    assert isinstance(body["events"], list)
    assert any(e.get("place_name") == "Chattogram" for e in body["events"])

    listed_after = client.get("/api/watchlist").json()["places"]
    assert listed_after == listed_before
    assert not any(p["name"] == "Chattogram" for p in listed_after)

    chat = client.post(
        "/api/chat",
        json={
            "message": "Brief this place",
            "lat": place["lat"],
            "lon": place["lon"],
            "place_name": "Chattogram",
            "window": "7d",
        },
    )
    assert chat.status_code == 200
    chat_body = chat.json()
    assert "message" in chat_body
    assert "chattogram" in str(chat_body).lower()


def test_ingest_place_all_fail_502(client: TestClient, monkeypatch) -> None:
    class _Fail:
        source = "rss"

        def fetch(self):
            raise RuntimeError("down")

    monkeypatch.setenv("INGEST_MOCK", "false")
    import config as config_mod

    config_mod.get_settings.cache_clear()
    monkeypatch.setattr(
        "ingest.runner.build_adapters",
        lambda conn, *, mock=None, places=None: [_Fail()],
    )
    monkeypatch.setattr("ingest.runner._running", False)
    monkeypatch.setattr("ingest.runner._last_manual_run_at", 0.0)

    resp = client.post(
        "/api/ingest/place",
        json={"name": "Chattogram", "lat": 22.35, "lon": 91.78},
    )
    assert resp.status_code == 502
    body = resp.json()
    assert body["ok"] is False
    assert body["error"]["code"] == "ingest_failed"
    assert body["sources"]


def test_chat_empty_place_returns_limited_context_caveat(client: TestClient) -> None:
    resp = client.post(
        "/api/chat",
        json={
            "message": "Brief this place",
            "lat": -12.0,
            "lon": -77.0,
            "place_name": "Nowhereville",
            "window": "24h",
        },
    )
    assert resp.status_code == 200
    body = resp.json()
    blob = str(body).lower()
    assert "no news" in blob or "limited context" in blob
    caveats = (body.get("brief") or {}).get("caveats") or []
    assert any("no news" in c.lower() or "limited context" in c.lower() for c in caveats)


def test_chat_persists_messages_for_selected_place(client: TestClient, db_path) -> None:
    from datetime import datetime, timezone

    from db import connect, upsert_event

    now = datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")
    conn = connect(db_path)
    try:
        upsert_event(
            conn,
            {
                "source": "rss",
                "external_id": "https://news.example.com/ctg-chat-1",
                "title": "Chattogram port delay",
                "summary": "Ships waiting offshore",
                "url": "https://news.example.com/ctg-chat-1",
                "source_name": "Example",
                "category": "economy",
                "severity": 2,
                "lat": 22.3569,
                "lon": 91.7832,
                "place_name": "Chattogram",
                "occurred_at": now,
            },
        )
        conn.commit()
    finally:
        conn.close()

    resp = client.post(
        "/api/chat",
        json={
            "message": "Brief this place",
            "lat": 22.3569,
            "lon": 91.7832,
            "place_name": "Chattogram",
            "window": "7d",
        },
    )
    assert resp.status_code == 200
    body = resp.json()
    assert "chattogram" in str(body).lower()

    conn = connect(db_path)
    try:
        rows = conn.execute(
            "SELECT role, content FROM chat_messages ORDER BY created_at"
        ).fetchall()
        roles = [r["role"] for r in rows]
        assert roles.count("user") >= 1
        assert roles.count("assistant") >= 1
        assert any("Brief this place" in (r["content"] or "") for r in rows)
    finally:
        conn.close()


def test_chat_live_failure_does_not_leak_secrets(client: TestClient, monkeypatch) -> None:
    monkeypatch.setenv("LLM_MOCK", "false")
    monkeypatch.setenv("OPENROUTER_API_KEY", "sk-test")

    def _boom(*_args, **_kwargs):
        raise RuntimeError("OPENROUTER_API_KEY=sk-or-secret traceback")

    monkeypatch.setattr("llm.chat.structured_completion", _boom)
    resp = client.post(
        "/api/chat",
        json={
            "message": "Brief this place",
            "lat": 22.35,
            "lon": 91.78,
            "place_name": "Chattogram",
        },
    )
    assert resp.status_code == 502
    body = resp.json()
    assert body["error"]["code"] == "llm_failed"
    dumped = str(body).lower()
    assert "sk-or" not in dumped
    assert "traceback" not in dumped
    assert "secret" not in dumped
