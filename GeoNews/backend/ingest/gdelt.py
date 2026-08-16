"""Minimal GDELT GEO adapter (skipped under INGEST_MOCK)."""

from __future__ import annotations

from typing import Any
from urllib.parse import quote

import httpx

from classify import classify_text
from ingest.base import AdapterBatch, BaseAdapter, ensure_event_defaults, utc_now

GDELT_GEO = "https://api.gdeltproject.org/api/v2/geo/geo"
DEFAULT_QUERY = "news"


class GdeltAdapter(BaseAdapter):
    source = "gdelt"

    def __init__(self, *, query: str = DEFAULT_QUERY, timespan: str = "1d") -> None:
        self.query = query
        self.timespan = timespan

    def fetch(self) -> AdapterBatch:
        url = (
            f"{GDELT_GEO}?query={quote(self.query)}"
            f"&format=geojson&timespan={quote(self.timespan)}"
        )
        try:
            with httpx.Client(timeout=30.0) as client:
                resp = client.get(url, headers={"User-Agent": "GeoNews/0.1"})
            if resp.status_code >= 400:
                return AdapterBatch()
            data = resp.json()
        except Exception:
            return AdapterBatch()

        features = data.get("features") if isinstance(data, dict) else None
        if not isinstance(features, list):
            return AdapterBatch()

        events: list[dict[str, Any]] = []
        now = utc_now()
        for feat in features[:50]:
            if not isinstance(feat, dict):
                continue
            props = feat.get("properties") or {}
            geom = feat.get("geometry") or {}
            coords = geom.get("coordinates")
            if not (isinstance(coords, (list, tuple)) and len(coords) >= 2):
                continue
            try:
                lon = float(coords[0])
                lat = float(coords[1])
            except (TypeError, ValueError):
                continue
            title = props.get("name") or props.get("title") or "GDELT event"
            url_art = props.get("url") or props.get("html") or ""
            external_id = str(url_art or props.get("id") or f"gdelt-{lat}-{lon}-{title}")[:500]
            tone = props.get("tone")
            try:
                tone_f = float(tone) if tone is not None else None
            except (TypeError, ValueError):
                tone_f = None
            cameo = props.get("cameo") or props.get("eventcode")
            classified = classify_text(title, None, cameo=cameo, tone=tone_f, source="gdelt")
            events.append(
                ensure_event_defaults(
                    {
                        "source": "gdelt",
                        "external_id": external_id,
                        "title": title,
                        "summary": props.get("shareimage") and title or title,
                        "url": url_art or None,
                        "source_name": props.get("urldomain") or "GDELT",
                        "category": classified["category"],
                        "severity": classified["severity"],
                        "lat": lat,
                        "lon": lon,
                        "place_name": props.get("name"),
                        "occurred_at": now,
                        "ingested_at": now,
                        "raw_json": props,
                    }
                )
            )
        return AdapterBatch(events=events)
