"""Adapter normalize + mock ingest upsert tests."""

from __future__ import annotations

from pathlib import Path

from classify import classify_text
from db import connect, query_events_bbox
from ingest.runner import run_ingest
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
