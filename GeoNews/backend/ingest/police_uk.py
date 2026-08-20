"""Police.uk street crime adapter — UK bbox only; writes incidents."""

from __future__ import annotations

import sqlite3
from typing import Any

import httpx

from classify import classify_police_uk
from ingest.base import AdapterBatch, BaseAdapter, ensure_incident_defaults, utc_now

POLICE_URL = "https://data.police.uk/api/crimes-street/all-crime"
UK_BBOX = (49.8, 60.9, -8.7, 1.8)  # min_lat, max_lat, min_lon, max_lon


def in_uk(lat: float, lon: float) -> bool:
    min_lat, max_lat, min_lon, max_lon = UK_BBOX
    return min_lat <= lat <= max_lat and min_lon <= lon <= max_lon


class PoliceUkAdapter(BaseAdapter):
    source = "police_uk"

    def __init__(
        self,
        conn: sqlite3.Connection | None = None,
        *,
        places: list[dict[str, Any]] | None = None,
        max_places: int = 3,
    ) -> None:
        self.conn = conn
        self.places = places
        self.max_places = max_places

    def fetch(self) -> AdapterBatch:
        places = [
            p
            for p in self.resolve_places(self.conn, self.places)
            if p.get("lat") is not None
            and p.get("lon") is not None
            and in_uk(float(p["lat"]), float(p["lon"]))
        ][: self.max_places]
        if not places:
            return AdapterBatch()

        incidents: list[dict[str, Any]] = []
        now = utc_now()
        queried = 0
        failed = 0

        for place in places:
            lat = float(place["lat"])
            lon = float(place["lon"])
            url = f"{POLICE_URL}?lat={lat}&lng={lon}"
            queried += 1
            try:
                with httpx.Client(timeout=30.0) as client:
                    resp = client.get(url, headers={"User-Agent": "GeoNews/0.1"})
                if resp.status_code >= 400:
                    failed += 1
                    continue
                rows = resp.json()
            except Exception:
                failed += 1
                continue
            if not isinstance(rows, list):
                continue
            for row in rows[:100]:
                if not isinstance(row, dict):
                    continue
                loc = row.get("location") or {}
                try:
                    ilat = float(loc.get("latitude"))
                    ilon = float(loc.get("longitude"))
                except (TypeError, ValueError):
                    continue
                cat = ((row.get("category") or "") if isinstance(row.get("category"), str) else "") or (
                    (row.get("category") or {}).get("name")
                    if isinstance(row.get("category"), dict)
                    else "crime"
                )
                classified = classify_police_uk(str(cat))
                external_id = str(row.get("persistent_id") or row.get("id") or f"{ilat}-{ilon}-{cat}")
                incidents.append(
                    ensure_incident_defaults(
                        {
                            "source": "police_uk",
                            "external_id": external_id[:500],
                            "category": str(cat) or classified["category"],
                            "lat": ilat,
                            "lon": ilon,
                            "place_name": place.get("name") or "UK",
                            "occurred_at": row.get("month") or now,
                            "raw_json": row,
                        }
                    )
                )

        if queried and failed == queried:
            raise RuntimeError(
                f"Police.uk unreachable for all {queried} place queries"
            )
        return AdapterBatch(incidents=incidents)
