"""Pure SQLite query helpers for GeoNews (no FastAPI)."""

from __future__ import annotations

import json
import sqlite3
import uuid
from datetime import datetime, timezone
from typing import Any


def _utc_now() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")


def _row_to_dict(row: sqlite3.Row | None) -> dict[str, Any] | None:
    if row is None:
        return None
    return dict(row)


def _rows_to_dicts(rows: list[sqlite3.Row]) -> list[dict[str, Any]]:
    return [dict(r) for r in rows]


# --- events -----------------------------------------------------------------


def upsert_event(conn: sqlite3.Connection, event: dict[str, Any]) -> dict[str, Any]:
    """
    Insert or update an event keyed by (source, external_id).

    On conflict, updates mutable fields and keeps the existing ``id``.
    Returns the stored row.
    """
    source = event["source"]
    external_id = event["external_id"]
    now = _utc_now()
    event_id = event.get("id") or str(uuid.uuid4())
    raw = event.get("raw_json")
    if isinstance(raw, (dict, list)):
        raw = json.dumps(raw)

    conn.execute(
        """
        INSERT INTO events (
          id, source, external_id, title, summary, url, source_name,
          category, severity, lat, lon, place_name, country_code,
          occurred_at, ingested_at, raw_json
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(source, external_id) DO UPDATE SET
          title = excluded.title,
          summary = excluded.summary,
          url = excluded.url,
          source_name = excluded.source_name,
          category = excluded.category,
          severity = excluded.severity,
          lat = excluded.lat,
          lon = excluded.lon,
          place_name = excluded.place_name,
          country_code = excluded.country_code,
          occurred_at = excluded.occurred_at,
          ingested_at = excluded.ingested_at,
          raw_json = excluded.raw_json
        """,
        (
            event_id,
            source,
            external_id,
            event.get("title"),
            event.get("summary"),
            event.get("url"),
            event.get("source_name"),
            event.get("category"),
            event.get("severity"),
            event.get("lat"),
            event.get("lon"),
            event.get("place_name"),
            event.get("country_code"),
            event.get("occurred_at") or now,
            event.get("ingested_at") or now,
            raw,
        ),
    )
    conn.commit()
    row = conn.execute(
        "SELECT * FROM events WHERE source = ? AND external_id = ?",
        (source, external_id),
    ).fetchone()
    assert row is not None
    return dict(row)


def get_event(conn: sqlite3.Connection, event_id: str) -> dict[str, Any] | None:
    return _row_to_dict(
        conn.execute("SELECT * FROM events WHERE id = ?", (event_id,)).fetchone()
    )


def query_events_bbox(
    conn: sqlite3.Connection,
    *,
    min_lat: float,
    min_lon: float,
    max_lat: float,
    max_lon: float,
    since: str | None = None,
    category: str | None = None,
    limit: int = 200,
) -> list[dict[str, Any]]:
    """Return events whose lat/lon fall inside the inclusive bounding box."""
    sql = """
        SELECT * FROM events
        WHERE lat IS NOT NULL AND lon IS NOT NULL
          AND lat >= ? AND lat <= ?
          AND lon >= ? AND lon <= ?
    """
    params: list[Any] = [min_lat, max_lat, min_lon, max_lon]
    if since:
        sql += " AND occurred_at >= ?"
        params.append(since)
    if category:
        sql += " AND category = ?"
        params.append(category)
    sql += " ORDER BY occurred_at DESC LIMIT ?"
    params.append(limit)
    return _rows_to_dicts(conn.execute(sql, params).fetchall())


# --- incidents --------------------------------------------------------------


def upsert_incident(conn: sqlite3.Connection, incident: dict[str, Any]) -> dict[str, Any]:
    """Insert or update an incident keyed by (source, external_id)."""
    source = incident["source"]
    if source not in ("police_uk", "sample"):
        raise ValueError("incident source must be 'police_uk' or 'sample'")
    external_id = incident["external_id"]
    incident_id = incident.get("id") or str(uuid.uuid4())
    raw = incident.get("raw_json")
    if isinstance(raw, (dict, list)):
        raw = json.dumps(raw)

    conn.execute(
        """
        INSERT INTO incidents (
          id, source, external_id, category, lat, lon, place_name, occurred_at, raw_json
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(source, external_id) DO UPDATE SET
          category = excluded.category,
          lat = excluded.lat,
          lon = excluded.lon,
          place_name = excluded.place_name,
          occurred_at = excluded.occurred_at,
          raw_json = excluded.raw_json
        """,
        (
            incident_id,
            source,
            external_id,
            incident.get("category"),
            incident.get("lat"),
            incident.get("lon"),
            incident.get("place_name"),
            incident.get("occurred_at") or _utc_now(),
            raw,
        ),
    )
    conn.commit()
    row = conn.execute(
        "SELECT * FROM incidents WHERE source = ? AND external_id = ?",
        (source, external_id),
    ).fetchone()
    assert row is not None
    return dict(row)


def query_incidents_bbox(
    conn: sqlite3.Connection,
    *,
    min_lat: float,
    min_lon: float,
    max_lat: float,
    max_lon: float,
    source: str | None = None,
    since: str | None = None,
    limit: int = 500,
) -> list[dict[str, Any]]:
    """
    Return incidents inside the inclusive bounding box.

    ``source`` may be ``police_uk``, ``sample``, or ``None``/``all`` for both.
    """
    sql = """
        SELECT * FROM incidents
        WHERE lat IS NOT NULL AND lon IS NOT NULL
          AND lat >= ? AND lat <= ?
          AND lon >= ? AND lon <= ?
    """
    params: list[Any] = [min_lat, max_lat, min_lon, max_lon]
    if source and source != "all":
        sql += " AND source = ?"
        params.append(source)
    if since:
        sql += " AND occurred_at >= ?"
        params.append(since)
    sql += " ORDER BY occurred_at DESC LIMIT ?"
    params.append(limit)
    return _rows_to_dicts(conn.execute(sql, params).fetchall())


# --- watchlist --------------------------------------------------------------


def list_watchlist(
    conn: sqlite3.Connection, *, user_id: str = "default"
) -> list[dict[str, Any]]:
    rows = conn.execute(
        """
        SELECT * FROM places_watchlist
        WHERE user_id = ?
        ORDER BY added_at ASC, name ASC
        """,
        (user_id,),
    ).fetchall()
    return _rows_to_dicts(rows)


def get_watchlist_place(
    conn: sqlite3.Connection, place_id: str, *, user_id: str = "default"
) -> dict[str, Any] | None:
    return _row_to_dict(
        conn.execute(
            "SELECT * FROM places_watchlist WHERE id = ? AND user_id = ?",
            (place_id, user_id),
        ).fetchone()
    )


def add_watchlist_place(
    conn: sqlite3.Connection,
    *,
    name: str,
    lat: float,
    lon: float,
    radius_km: float = 25,
    user_id: str = "default",
    place_id: str | None = None,
) -> dict[str, Any]:
    """Insert a watchlist place. Raises sqlite3.IntegrityError on duplicate name."""
    pid = place_id or str(uuid.uuid4())
    conn.execute(
        """
        INSERT INTO places_watchlist (id, user_id, name, lat, lon, radius_km, added_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        """,
        (pid, user_id, name, lat, lon, radius_km, _utc_now()),
    )
    conn.commit()
    row = get_watchlist_place(conn, pid, user_id=user_id)
    assert row is not None
    return row


def delete_watchlist_place(
    conn: sqlite3.Connection, place_id: str, *, user_id: str = "default"
) -> bool:
    cur = conn.execute(
        "DELETE FROM places_watchlist WHERE id = ? AND user_id = ?",
        (place_id, user_id),
    )
    conn.commit()
    return cur.rowcount > 0
