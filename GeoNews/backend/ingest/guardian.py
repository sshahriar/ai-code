"""Guardian Open Platform adapter — skipped when GUARDIAN_API_KEY is empty."""

from __future__ import annotations

from typing import Any
from urllib.parse import urlencode

import httpx

from config import get_settings
from ingest.base import AdapterBatch, BaseAdapter

GUARDIAN_SEARCH = "https://content.guardianapis.com/search"


class GuardianAdapter(BaseAdapter):
    """
    Optional free-key adapter.

    Guardian results lack coordinates. Without a place centroid context we skip
    map-pin upserts (return empty batch) so we never invent lat/lon.
    """

    source = "guardian"

    def __init__(self, *, query: str = "world") -> None:
        self.query = query

    def fetch(self) -> AdapterBatch:
        key = get_settings().guardian_api_key
        if not key:
            return AdapterBatch()
        params = urlencode(
            {
                "q": self.query,
                "page-size": "20",
                "show-fields": "trailText",
                "api-key": key,
            }
        )
        url = f"{GUARDIAN_SEARCH}?{params}"
        try:
            with httpx.Client(timeout=25.0) as client:
                # Do not log the API key.
                resp = client.get(url, headers={"User-Agent": "GeoNews/0.1"})
            if resp.status_code >= 400:
                return AdapterBatch()
            payload = resp.json()
        except Exception:
            return AdapterBatch()

        results = (
            ((payload.get("response") or {}).get("results"))
            if isinstance(payload, dict)
            else None
        )
        if not isinstance(results, list):
            return AdapterBatch()
        # Geotagless headlines are not upserted as map events in v1.
        _ = results
        return AdapterBatch()
