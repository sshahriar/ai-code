"""Events list + detail."""

from __future__ import annotations

import sqlite3
from typing import Any

from fastapi import APIRouter, Depends, Query

from deps import get_conn
from db import get_event, query_events_bbox
from errors import http_error

router = APIRouter(tags=["events"])

_EVENT_FIELDS = (
    "id",
    "source",
    "title",
    "summary",
    "url",
    "source_name",
    "category",
    "severity",
    "lat",
    "lon",
    "place_name",
    "occurred_at",
)


def serialize_event(row: dict[str, Any]) -> dict[str, Any]:
    return {k: row.get(k) for k in _EVENT_FIELDS}


@router.get("/api/events")
def list_events(
    min_lat: float = Query(...),
    min_lon: float = Query(...),
    max_lat: float = Query(...),
    max_lon: float = Query(...),
    since: str | None = Query(None),
    category: str | None = Query(None),
    limit: int = Query(200, ge=1, le=1000),
    conn: sqlite3.Connection = Depends(get_conn),
) -> dict:
    if min_lat > max_lat or min_lon > max_lon:
        raise http_error(400, "bad_bbox", "Invalid bounding box")
    rows = query_events_bbox(
        conn,
        min_lat=min_lat,
        min_lon=min_lon,
        max_lat=max_lat,
        max_lon=max_lon,
        since=since,
        category=category,
        limit=limit,
    )
    return {"events": [serialize_event(r) for r in rows]}


@router.get("/api/events/{event_id}")
def event_detail(
    event_id: str,
    conn: sqlite3.Connection = Depends(get_conn),
) -> dict:
    row = get_event(conn, event_id)
    if row is None:
        raise http_error(404, "not_found", f"Event {event_id} not found")
    return serialize_event(row)
