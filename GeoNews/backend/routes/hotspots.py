"""GET /api/hotspots — cluster by rounded lat/lon."""

from __future__ import annotations

import sqlite3
from collections import defaultdict
from datetime import datetime, timedelta, timezone
from typing import Any

from fastapi import APIRouter, Depends, Query

from deps import get_conn
from db import query_events_bbox
from errors import http_error

router = APIRouter(tags=["events"])


def _parse_window(window: str) -> str | None:
    """Return ISO since timestamp for 24h/72h/7d, or None."""
    w = (window or "72h").strip().lower()
    now = datetime.now(timezone.utc)
    mapping = {
        "24h": timedelta(hours=24),
        "72h": timedelta(hours=72),
        "7d": timedelta(days=7),
    }
    delta = mapping.get(w)
    if delta is None:
        return None
    return (now - delta).replace(microsecond=0).isoformat().replace("+00:00", "Z")


def _clean_place_name(value: Any) -> str | None:
    """Return stripped place_name, or None when missing/blank."""
    if value is None:
        return None
    text = str(value).strip()
    return text or None


def _hotspot_label(place_name: str | None, lat: float, lon: float) -> str:
    """
    Guaranteed non-empty display name for a hotspot cluster.

    Prefer event place_name; otherwise formatted coords; last resort Unknown place.
    """
    cleaned = _clean_place_name(place_name)
    if cleaned:
        return cleaned
    try:
        return f"{float(lat):.2f}, {float(lon):.2f}"
    except (TypeError, ValueError):
        return "Unknown place"


@router.get("/api/hotspots")
def hotspots(
    min_lat: float | None = Query(None),
    min_lon: float | None = Query(None),
    max_lat: float | None = Query(None),
    max_lon: float | None = Query(None),
    window: str = Query("72h"),
    limit: int = Query(10, ge=1, le=50),
    decimals: int = Query(2, ge=1, le=3),
    conn: sqlite3.Connection = Depends(get_conn),
) -> dict:
    # Default to a wide world-ish bbox if omitted (demo-friendly).
    if None in (min_lat, min_lon, max_lat, max_lon):
        min_lat, min_lon, max_lat, max_lon = -60.0, -180.0, 80.0, 180.0
    assert min_lat is not None and min_lon is not None
    assert max_lat is not None and max_lon is not None
    if min_lat > max_lat or min_lon > max_lon:
        raise http_error(400, "bad_bbox", "Invalid bounding box")

    since = _parse_window(window)
    if since is None and window:
        raise http_error(400, "bad_window", "window must be one of 24h, 72h, 7d")

    rows = query_events_bbox(
        conn,
        min_lat=min_lat,
        min_lon=min_lon,
        max_lat=max_lat,
        max_lon=max_lon,
        since=since,
        limit=1000,
    )

    clusters: dict[tuple[float, float], dict[str, Any]] = defaultdict(
        lambda: {"count": 0, "severity_sum": 0, "place_name": None}
    )
    for row in rows:
        lat = row.get("lat")
        lon = row.get("lon")
        if lat is None or lon is None:
            continue
        key = (round(float(lat), decimals), round(float(lon), decimals))
        clusters[key]["count"] += 1
        clusters[key]["severity_sum"] += int(row.get("severity") or 1)
        if not clusters[key]["place_name"]:
            cleaned = _clean_place_name(row.get("place_name"))
            if cleaned:
                clusters[key]["place_name"] = cleaned

    hotspots_list = []
    for (lat, lon), meta in clusters.items():
        count = meta["count"]
        avg_sev = meta["severity_sum"] / max(count, 1)
        score = round(count * avg_sev, 2)
        label = _hotspot_label(meta["place_name"], lat, lon)
        hotspots_list.append(
            {
                "lat": lat,
                "lon": lon,
                # Frontend Hotspot chips read `name`; keep place_name for compatibility.
                "name": label,
                "place_name": label,
                "count": count,
                "avg_severity": round(avg_sev, 2),
                "score": score,
            }
        )
    hotspots_list.sort(key=lambda h: h["score"], reverse=True)
    return {"hotspots": hotspots_list[:limit], "window": window}
