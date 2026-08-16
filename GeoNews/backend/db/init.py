"""Lazy DB init: create tables if missing; seed when empty."""

from __future__ import annotations

import csv
import json
import sqlite3
import uuid
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from db.connection import SCHEMA_PATH, SEED_DIR, connect, get_db_path

WATCHLIST_SEED: list[dict[str, Any]] = [
    {"name": "Dhaka", "lat": 23.8103, "lon": 90.4125, "radius_km": 25},
    {"name": "London", "lat": 51.5074, "lon": -0.1278, "radius_km": 25},
    {"name": "New York", "lat": 40.7128, "lon": -74.0060, "radius_km": 25},
    {"name": "Tokyo", "lat": 35.6762, "lon": 139.6503, "radius_km": 25},
]


def _utc_now() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")


def _table_count(conn: sqlite3.Connection, table: str) -> int:
    row = conn.execute(f"SELECT COUNT(*) AS c FROM {table}").fetchone()
    return int(row["c"] if isinstance(row, sqlite3.Row) else row[0])


def _apply_schema(conn: sqlite3.Connection) -> None:
    schema_sql = SCHEMA_PATH.read_text(encoding="utf-8")
    conn.executescript(schema_sql)


def _seed_watchlist(conn: sqlite3.Connection) -> int:
    if _table_count(conn, "places_watchlist") > 0:
        return 0
    now = _utc_now()
    rows = 0
    for place in WATCHLIST_SEED:
        conn.execute(
            """
            INSERT INTO places_watchlist (id, user_id, name, lat, lon, radius_km, added_at)
            VALUES (?, 'default', ?, ?, ?, ?, ?)
            """,
            (
                str(uuid.uuid4()),
                place["name"],
                place["lat"],
                place["lon"],
                place["radius_km"],
                now,
            ),
        )
        rows += 1
    return rows


def _seed_incidents_from_csv(conn: sqlite3.Connection, csv_path: Path | None = None) -> int:
    if _table_count(conn, "incidents") > 0:
        return 0
    path = csv_path or (SEED_DIR / "sample_incidents.csv")
    if not path.is_file():
        return 0
    rows = 0
    with path.open(encoding="utf-8", newline="") as fh:
        reader = csv.DictReader(fh)
        for row in reader:
            source = (row.get("source") or "sample").strip()
            if source != "sample":
                # Safety: never seed non-sample crime as if official.
                source = "sample"
            external_id = (row.get("external_id") or "").strip()
            if not external_id:
                continue
            incident_id = (row.get("id") or "").strip() or str(uuid.uuid4())
            raw = row.get("raw_json") or json.dumps(
                {
                    "demo": True,
                    "label": "Demo / sample — not an official police report",
                    "external_id": external_id,
                }
            )
            conn.execute(
                """
                INSERT INTO incidents (
                  id, source, external_id, category, lat, lon, place_name, occurred_at, raw_json
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    incident_id,
                    source,
                    external_id,
                    row.get("category") or "other",
                    float(row["lat"]),
                    float(row["lon"]),
                    row.get("place_name") or "Dhaka (sample)",
                    row.get("occurred_at") or _utc_now(),
                    raw,
                ),
            )
            rows += 1
    return rows


def _seed_events_from_json(conn: sqlite3.Connection, json_path: Path | None = None) -> int:
    if _table_count(conn, "events") > 0:
        return 0
    path = json_path or (SEED_DIR / "sample_events.json")
    if not path.is_file():
        return 0
    payload = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(payload, list):
        raise ValueError("sample_events.json must be a JSON array")
    now = _utc_now()
    rows = 0
    for item in payload:
        if not isinstance(item, dict):
            continue
        source = item.get("source") or "sample"
        external_id = item.get("external_id")
        if not external_id:
            continue
        event_id = item.get("id") or str(uuid.uuid4())
        raw = item.get("raw_json")
        if isinstance(raw, dict):
            raw = json.dumps(raw)
        elif raw is None:
            raw = json.dumps({k: v for k, v in item.items() if k != "raw_json"})
        conn.execute(
            """
            INSERT INTO events (
              id, source, external_id, title, summary, url, source_name,
              category, severity, lat, lon, place_name, country_code,
              occurred_at, ingested_at, raw_json
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                event_id,
                source,
                external_id,
                item.get("title"),
                item.get("summary"),
                item.get("url"),
                item.get("source_name"),
                item.get("category") or "other",
                item.get("severity"),
                item.get("lat"),
                item.get("lon"),
                item.get("place_name"),
                item.get("country_code"),
                item.get("occurred_at") or now,
                item.get("ingested_at") or now,
                raw,
            ),
        )
        rows += 1
    return rows


def seed_if_empty(conn: sqlite3.Connection) -> dict[str, int]:
    """Insert default watchlist + sample incidents/events when those tables are empty."""
    counts = {
        "watchlist": _seed_watchlist(conn),
        "incidents": _seed_incidents_from_csv(conn),
        "events": _seed_events_from_json(conn),
    }
    conn.commit()
    return counts


def init_db(path: str | Path | None = None, *, seed: bool = True) -> sqlite3.Connection:
    """
    Create tables if missing; optionally seed when empty.

    Returns an open connection to the database at ``path``
    (default: project ``db/geonews.db``).
    """
    _ = get_db_path(path)  # ensure path resolution / parent mkdir via connect
    conn = connect(path)
    _apply_schema(conn)
    conn.commit()
    if seed:
        seed_if_empty(conn)
    return conn
