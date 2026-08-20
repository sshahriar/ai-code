"""Load events / incidents / chat context for LLM prompts (uses db helpers)."""

from __future__ import annotations

import math
import sqlite3
from datetime import datetime, timedelta, timezone
from typing import Any


def radius_to_bbox(
    lat: float, lon: float, radius_km: float
) -> tuple[float, float, float, float]:
    """Approximate WGS84 bbox for a circle (min_lat, min_lon, max_lat, max_lon)."""
    dlat = radius_km / 111.0
    cos_lat = max(0.01, abs(math.cos(math.radians(lat))))
    dlon = radius_km / (111.0 * cos_lat)
    return lat - dlat, lon - dlon, lat + dlat, lon + dlon


def parse_window_to_since(window: str) -> str | None:
    """
    Map window strings like ``24h``, ``72h``, ``7d`` to an ISO-8601 UTC lower bound.

    Returns ``None`` when the window is empty / unrecognized (no time filter).
    """
    if not window:
        return None
    raw = window.strip().lower()
    now = datetime.now(timezone.utc)
    try:
        if raw.endswith("h"):
            hours = int(raw[:-1])
            since = now - timedelta(hours=hours)
        elif raw.endswith("d"):
            days = int(raw[:-1])
            since = now - timedelta(days=days)
        else:
            return None
    except ValueError:
        return None
    return since.replace(microsecond=0).isoformat().replace("+00:00", "Z")


def load_place_context(
    conn: sqlite3.Connection | None,
    *,
    lat: float,
    lon: float,
    radius_km: float = 25.0,
    window: str = "72h",
    event_limit: int = 40,
    incident_limit: int = 40,
) -> dict[str, Any]:
    """
    Query nearby events and incidents when a DB connection is provided.

    Without ``conn``, returns empty lists (fixtures / offline still work).
    """
    since = parse_window_to_since(window)
    if conn is None:
        return {
            "events": [],
            "incidents": [],
            "since": since,
            "bbox": radius_to_bbox(lat, lon, radius_km),
        }

    from db.queries import query_events_bbox, query_incidents_bbox

    min_lat, min_lon, max_lat, max_lon = radius_to_bbox(lat, lon, radius_km)
    events = query_events_bbox(
        conn,
        min_lat=min_lat,
        min_lon=min_lon,
        max_lat=max_lat,
        max_lon=max_lon,
        since=since,
        limit=event_limit,
    )
    incidents = query_incidents_bbox(
        conn,
        min_lat=min_lat,
        min_lon=min_lon,
        max_lat=max_lat,
        max_lon=max_lon,
        since=since,
        limit=incident_limit,
    )
    return {
        "events": events,
        "incidents": incidents,
        "since": since,
        "bbox": (min_lat, min_lon, max_lat, max_lon),
    }


def load_recent_chat(
    conn: sqlite3.Connection | None,
    *,
    user_id: str = "default",
    limit: int = 12,
) -> list[dict[str, Any]]:
    """Read recent ``chat_messages`` rows (newest last). No-op without conn."""
    if conn is None:
        return []
    rows = conn.execute(
        """
        SELECT id, user_id, role, content, actions, created_at
        FROM chat_messages
        WHERE user_id = ?
        ORDER BY created_at DESC
        LIMIT ?
        """,
        (user_id, limit),
    ).fetchall()
    items = [dict(r) for r in rows]
    items.reverse()
    return items


DEFAULT_PLACE = {"name": "Dhaka", "lat": 23.8103, "lon": 90.4125}

LIMITED_CONTEXT_CAVEAT = (
    "No news found for this place in the selected window; context is limited."
)


def context_is_empty(ctx: dict[str, Any]) -> bool:
    return not ctx.get("events") and not ctx.get("incidents")


def apply_limited_context_caveat(
    payload: dict[str, Any],
    *,
    empty: bool,
    place_name: str,
    window: str,
) -> dict[str, Any]:
    """Guarantee a user-visible caveat when ingest produced no local rows."""
    if not empty:
        return payload

    is_chat = "message" in payload
    brief = payload.get("brief") if is_chat else payload
    if not isinstance(brief, dict):
        brief = {
            "place_name": place_name,
            "window": window,
            "headline": f"Limited context for {place_name}",
            "risk_level": "unknown",
            "bullets": [
                "No recent events or incidents were available for this place."
            ],
            "caveats": [LIMITED_CONTEXT_CAVEAT],
        }
        if is_chat:
            payload["brief"] = brief
        else:
            payload.update(brief)
    else:
        caveats = [str(c) for c in (brief.get("caveats") or [])]
        blob = " ".join(caveats).lower()
        if "no news" not in blob and "limited context" not in blob:
            caveats.append(LIMITED_CONTEXT_CAVEAT)
            brief["caveats"] = caveats
        if is_chat:
            payload["brief"] = brief

    message = payload.get("message")
    if isinstance(message, str):
        lowered = message.lower()
        if "no news" not in lowered and "limited context" not in lowered:
            payload["message"] = f"{message.rstrip()} {LIMITED_CONTEXT_CAVEAT}"
    return payload


def resolve_place(
    *,
    lat: float | None = None,
    lon: float | None = None,
    place_name: str | None = None,
    conn: sqlite3.Connection | None = None,
) -> dict[str, Any]:
    """
    Resolve place for brief/chat: explicit coords → watchlist last → Dhaka default.
    """
    if lat is not None and lon is not None:
        return {
            "name": (place_name or "Selected area").strip() or "Selected area",
            "lat": float(lat),
            "lon": float(lon),
        }

    if conn is not None:
        from db.queries import list_watchlist

        places = list_watchlist(conn)
        if places:
            last = places[-1]
            return {
                "name": place_name or last["name"],
                "lat": float(last["lat"]),
                "lon": float(last["lon"]),
            }

    return {
        "name": (place_name or DEFAULT_PLACE["name"]),
        "lat": DEFAULT_PLACE["lat"],
        "lon": DEFAULT_PLACE["lon"],
    }
