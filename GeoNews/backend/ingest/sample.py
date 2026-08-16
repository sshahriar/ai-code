"""Sample / mock ingest adapter — loads seed JSON + CSV."""

from __future__ import annotations

import csv
import json
from pathlib import Path
from typing import Any

from db.connection import SEED_DIR
from ingest.base import AdapterBatch, BaseAdapter, ensure_event_defaults, ensure_incident_defaults, utc_now


class SampleAdapter(BaseAdapter):
    """Always available. Sole writer when ``INGEST_MOCK=true``."""

    source = "sample"

    def __init__(
        self,
        *,
        events_path: Path | None = None,
        incidents_path: Path | None = None,
    ) -> None:
        self.events_path = events_path or (SEED_DIR / "sample_events.json")
        self.incidents_path = incidents_path or (SEED_DIR / "sample_incidents.csv")

    def fetch(self) -> AdapterBatch:
        return AdapterBatch(
            events=self._load_events(),
            incidents=self._load_incidents(),
        )

    def _load_events(self) -> list[dict[str, Any]]:
        if not self.events_path.is_file():
            return []
        payload = json.loads(self.events_path.read_text(encoding="utf-8"))
        if not isinstance(payload, list):
            return []
        now = utc_now()
        out: list[dict[str, Any]] = []
        for item in payload:
            if not isinstance(item, dict):
                continue
            external_id = item.get("external_id")
            if not external_id:
                continue
            row = ensure_event_defaults(
                {
                    "source": "sample",
                    "external_id": str(external_id),
                    "title": item.get("title"),
                    "summary": item.get("summary"),
                    "url": item.get("url"),
                    "source_name": item.get("source_name") or "GeoNews Sample Wire",
                    "category": item.get("category") or "other",
                    "severity": item.get("severity") or 2,
                    "lat": item.get("lat"),
                    "lon": item.get("lon"),
                    "place_name": item.get("place_name"),
                    "country_code": item.get("country_code"),
                    "occurred_at": item.get("occurred_at") or now,
                    "ingested_at": now,
                    "raw_json": item,
                }
            )
            out.append(row)
        return out

    def _load_incidents(self) -> list[dict[str, Any]]:
        if not self.incidents_path.is_file():
            return []
        out: list[dict[str, Any]] = []
        with self.incidents_path.open(encoding="utf-8", newline="") as fh:
            reader = csv.DictReader(fh)
            for row in reader:
                external_id = (row.get("external_id") or "").strip()
                if not external_id:
                    continue
                try:
                    lat = float(row["lat"])
                    lon = float(row["lon"])
                except (KeyError, TypeError, ValueError):
                    continue
                out.append(
                    ensure_incident_defaults(
                        {
                            "source": "sample",
                            "external_id": external_id,
                            "category": row.get("category") or "other",
                            "lat": lat,
                            "lon": lon,
                            "place_name": row.get("place_name") or "Dhaka (DEMO SAMPLE)",
                            "occurred_at": row.get("occurred_at") or utc_now(),
                            "raw_json": {
                                "demo": True,
                                "label": "Demo / sample — not an official police report",
                                "external_id": external_id,
                            },
                        }
                    )
                )
        return out
