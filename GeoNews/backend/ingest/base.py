"""Ingest adapter interface and shared helpers."""

from __future__ import annotations

import html
import re
from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from datetime import datetime, timezone
from typing import Any, Iterable

_TAG_RE = re.compile(r"<[^>]+>")


def utc_now() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")


def strip_html(text: str | None) -> str:
    """Feed summaries arrive as HTML snippets; keep the readable text only."""
    if not text:
        return ""
    return " ".join(html.unescape(_TAG_RE.sub(" ", text)).split())


def mentions_place(text: str, place: str) -> bool:
    """
    True when ``text`` names ``place``.

    Keyword search matches full article bodies, so adapters that pin an article
    to a watchlist centroid use this to avoid dropping a pin on a story that is
    about somewhere else entirely.
    """
    if not text or not place:
        return False
    needle = place_query_name(place)
    if not needle:
        return False
    return needle.lower() in text.lower()


def place_query_name(place: str) -> str:
    """
    Primary toponym for RSS/GDELT/Guardian queries and mention checks.

    Nominatim often returns "Chattogram, Chattogram Division, Bangladesh";
    searching and matching on the full string would miss headlines that only
    say Chattogram.
    """
    if not place:
        return ""
    return place.split(",")[0].strip() or place.strip()


def normalize_place_input(place: dict[str, Any]) -> dict[str, Any]:
    """Validate and normalize a place dict used for scoped ingest (not watchlist)."""
    name = str(place.get("name") or "").strip()
    if not name:
        raise ValueError("place name is required")
    try:
        lat = float(place["lat"])
        lon = float(place["lon"])
    except (KeyError, TypeError, ValueError) as exc:
        raise ValueError("place lat and lon must be numbers") from exc
    if not (-90.0 <= lat <= 90.0 and -180.0 <= lon <= 180.0):
        raise ValueError("place lat/lon out of range")
    out: dict[str, Any] = {"name": name, "lat": lat, "lon": lon}
    cc = place.get("country_code")
    if cc is not None and str(cc).strip():
        out["country_code"] = str(cc).strip().lower()
    return out


@dataclass
class AdapterBatch:
    """Normalized rows produced by one adapter fetch."""

    events: list[dict[str, Any]] = field(default_factory=list)
    incidents: list[dict[str, Any]] = field(default_factory=list)


class BaseAdapter(ABC):
    """One source → normalized events and/or incidents."""

    source: str

    @abstractmethod
    def fetch(self) -> AdapterBatch:
        """Fetch and normalize. Must not raise for empty results; may raise on hard failures."""

    def resolve_places(
        self,
        conn: Any,
        places: list[dict[str, Any]] | None,
    ) -> list[dict[str, Any]]:
        """Use an explicit places list when given; otherwise load the watchlist."""
        if places is not None:
            return list(places)
        if conn is None:
            return []
        from db import list_watchlist

        return list_watchlist(conn)


def ensure_event_defaults(row: dict[str, Any]) -> dict[str, Any]:
    out = dict(row)
    now = utc_now()
    out.setdefault("ingested_at", now)
    out.setdefault("occurred_at", now)
    out.setdefault("category", "other")
    out.setdefault("severity", 2)
    return out


def ensure_incident_defaults(row: dict[str, Any]) -> dict[str, Any]:
    out = dict(row)
    out.setdefault("occurred_at", utc_now())
    out.setdefault("category", "other")
    return out


def merge_batches(batches: Iterable[AdapterBatch]) -> AdapterBatch:
    merged = AdapterBatch()
    for batch in batches:
        merged.events.extend(batch.events)
        merged.incidents.extend(batch.incidents)
    return merged
