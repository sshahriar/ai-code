"""Unit tests for GeoNews SQLite schema, seed, and query helpers."""

from __future__ import annotations

import sqlite3
from pathlib import Path

import pytest

from db.init import init_db, seed_if_empty
from db.queries import (
    add_watchlist_place,
    insert_chat_message,
    list_watchlist,
    query_events_bbox,
    query_incidents_bbox,
    upsert_event,
    upsert_incident,
)

EXPECTED_TABLES = {
    "places_watchlist",
    "events",
    "incidents",
    "chat_messages",
    "ingest_runs",
}


@pytest.fixture()
def db_path(tmp_path: Path) -> Path:
    return tmp_path / "test_geonews.db"


@pytest.fixture()
def conn(db_path: Path) -> sqlite3.Connection:
    connection = init_db(db_path)
    yield connection
    connection.close()


def test_init_creates_tables(db_path: Path) -> None:
    conn = init_db(db_path, seed=False)
    try:
        rows = conn.execute(
            "SELECT name FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%'"
        ).fetchall()
        names = {r["name"] for r in rows}
        assert EXPECTED_TABLES.issubset(names)

        indexes = {
            r["name"]
            for r in conn.execute(
                "SELECT name FROM sqlite_master WHERE type = 'index'"
            ).fetchall()
        }
        assert "idx_events_lat_lon" in indexes
        assert "idx_events_occurred_at" in indexes
        assert "idx_events_category" in indexes
    finally:
        conn.close()


def test_seed_loads_watchlist_and_samples_when_empty(conn: sqlite3.Connection) -> None:
    watchlist = list_watchlist(conn)
    names = {p["name"] for p in watchlist}
    assert names == {"Dhaka", "London", "New York", "Tokyo"}

    dhaka = next(p for p in watchlist if p["name"] == "Dhaka")
    assert dhaka["lat"] == pytest.approx(23.8103)
    assert dhaka["lon"] == pytest.approx(90.4125)

    incident_count = conn.execute("SELECT COUNT(*) AS c FROM incidents").fetchone()["c"]
    event_count = conn.execute("SELECT COUNT(*) AS c FROM events").fetchone()["c"]
    assert incident_count >= 20
    assert event_count >= 30

    sources = {
        r["source"]
        for r in conn.execute("SELECT DISTINCT source FROM incidents").fetchall()
    }
    assert sources == {"sample"}

    # Second seed pass is a no-op when tables already have rows.
    again = seed_if_empty(conn)
    assert again == {"watchlist": 0, "incidents": 0, "events": 0}


def test_unique_constraints_enforced(conn: sqlite3.Connection) -> None:
    add_watchlist_place(conn, name="Nairobi", lat=-1.2864, lon=36.8172)
    with pytest.raises(sqlite3.IntegrityError):
        add_watchlist_place(conn, name="Nairobi", lat=-1.29, lon=36.82)

    first = upsert_event(
        conn,
        {
            "source": "sample",
            "external_id": "unique-evt-1",
            "title": "Original title",
            "category": "other",
            "severity": 1,
            "lat": 1.0,
            "lon": 2.0,
        },
    )
    second = upsert_event(
        conn,
        {
            "source": "sample",
            "external_id": "unique-evt-1",
            "title": "Updated title",
            "category": "politics",
            "severity": 2,
            "lat": 1.1,
            "lon": 2.1,
        },
    )
    assert first["id"] == second["id"]
    assert second["title"] == "Updated title"
    count = conn.execute(
        "SELECT COUNT(*) AS c FROM events WHERE source = ? AND external_id = ?",
        ("sample", "unique-evt-1"),
    ).fetchone()["c"]
    assert count == 1

    upsert_incident(
        conn,
        {
            "source": "sample",
            "external_id": "unique-inc-1",
            "category": "theft",
            "lat": 23.81,
            "lon": 90.41,
            "place_name": "Dhaka (sample)",
        },
    )
    updated = upsert_incident(
        conn,
        {
            "source": "sample",
            "external_id": "unique-inc-1",
            "category": "robbery",
            "lat": 23.82,
            "lon": 90.42,
            "place_name": "Dhaka (sample)",
        },
    )
    assert updated["category"] == "robbery"
    inc_count = conn.execute(
        "SELECT COUNT(*) AS c FROM incidents WHERE source = ? AND external_id = ?",
        ("sample", "unique-inc-1"),
    ).fetchone()["c"]
    assert inc_count == 1


def test_bbox_query_returns_only_in_bounds_rows(db_path: Path) -> None:
    conn = init_db(db_path, seed=False)
    try:
        upsert_event(
            conn,
            {
                "source": "sample",
                "external_id": "inside-dhaka",
                "title": "Inside bbox",
                "category": "crime",
                "severity": 2,
                "lat": 23.81,
                "lon": 90.41,
            },
        )
        upsert_event(
            conn,
            {
                "source": "sample",
                "external_id": "outside-tokyo",
                "title": "Outside bbox",
                "category": "disaster",
                "severity": 3,
                "lat": 35.68,
                "lon": 139.65,
            },
        )
        upsert_incident(
            conn,
            {
                "source": "sample",
                "external_id": "inc-inside",
                "category": "theft",
                "lat": 23.80,
                "lon": 90.40,
                "place_name": "Dhaka (sample)",
            },
        )
        upsert_incident(
            conn,
            {
                "source": "sample",
                "external_id": "inc-outside",
                "category": "theft",
                "lat": 51.50,
                "lon": -0.12,
                "place_name": "London (sample)",
            },
        )

        events = query_events_bbox(
            conn,
            min_lat=23.7,
            min_lon=90.3,
            max_lat=23.9,
            max_lon=90.5,
        )
        assert [e["external_id"] for e in events] == ["inside-dhaka"]

        incidents = query_incidents_bbox(
            conn,
            min_lat=23.7,
            min_lon=90.3,
            max_lat=23.9,
            max_lon=90.5,
            source="sample",
        )
        assert [i["external_id"] for i in incidents] == ["inc-inside"]
    finally:
        conn.close()


def test_insert_chat_message(conn: sqlite3.Connection) -> None:
    row = insert_chat_message(
        conn,
        role="user",
        content="Brief this place",
        actions={"watchlist_changes": []},
    )
    assert row["role"] == "user"
    stored = conn.execute(
        "SELECT role, content FROM chat_messages WHERE id = ?",
        (row["id"],),
    ).fetchone()
    assert stored["content"] == "Brief this place"
