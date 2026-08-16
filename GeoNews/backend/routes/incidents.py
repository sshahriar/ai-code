"""Incidents list + heatmap."""

from __future__ import annotations

import sqlite3
from collections import defaultdict
from typing import Any

from fastapi import APIRouter, Depends, Query

from deps import get_conn
from db import query_incidents_bbox
from errors import http_error

router = APIRouter(tags=["incidents"])

_INCIDENT_FIELDS = (
    "id",
    "source",
    "category",
    "lat",
    "lon",
    "place_name",
    "occurred_at",
)


def serialize_incident(row: dict[str, Any]) -> dict[str, Any]:
    return {k: row.get(k) for k in _INCIDENT_FIELDS}


@router.get("/api/incidents")
def list_incidents(
    min_lat: float = Query(...),
    min_lon: float = Query(...),
    max_lat: float = Query(...),
    max_lon: float = Query(...),
    source: str = Query("all"),
    since: str | None = Query(None),
    limit: int = Query(500, ge=1, le=2000),
    conn: sqlite3.Connection = Depends(get_conn),
) -> dict:
    if min_lat > max_lat or min_lon > max_lon:
        raise http_error(400, "bad_bbox", "Invalid bounding box")
    if source not in ("police_uk", "sample", "all"):
        raise http_error(400, "bad_source", "source must be police_uk, sample, or all")
    rows = query_incidents_bbox(
        conn,
        min_lat=min_lat,
        min_lon=min_lon,
        max_lat=max_lat,
        max_lon=max_lon,
        source=None if source == "all" else source,
        since=since,
        limit=limit,
    )
    return {"incidents": [serialize_incident(r) for r in rows]}


@router.get("/api/incidents/heatmap")
def incidents_heatmap(
    min_lat: float = Query(...),
    min_lon: float = Query(...),
    max_lat: float = Query(...),
    max_lon: float = Query(...),
    source: str = Query("all"),
    since: str | None = Query(None),
    conn: sqlite3.Connection = Depends(get_conn),
) -> dict:
    if min_lat > max_lat or min_lon > max_lon:
        raise http_error(400, "bad_bbox", "Invalid bounding box")
    rows = query_incidents_bbox(
        conn,
        min_lat=min_lat,
        min_lon=min_lon,
        max_lat=max_lat,
        max_lon=max_lon,
        source=None if source == "all" else source,
        since=since,
        limit=2000,
    )
    buckets: dict[tuple[float, float], float] = defaultdict(float)
    for row in rows:
        lat = row.get("lat")
        lon = row.get("lon")
        if lat is None or lon is None:
            continue
        key = (round(float(lat), 3), round(float(lon), 3))
        buckets[key] += 1.0
    points = [{"lat": lat, "lon": lon, "weight": weight} for (lat, lon), weight in buckets.items()]
    return {"points": points}
