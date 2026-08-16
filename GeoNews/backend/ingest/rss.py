"""Google News RSS adapter (minimal; geocodes watchlist place, not each headline)."""

from __future__ import annotations

import sqlite3
import xml.etree.ElementTree as ET
from typing import Any
from urllib.parse import quote

import httpx

from classify import classify_text
from db import list_watchlist
from ingest.base import AdapterBatch, BaseAdapter, ensure_event_defaults, utc_now

RSS_URL = "https://news.google.com/rss/search?q={q}+when:1d&hl=en-US&gl=US&ceid=US:en"


class RssAdapter(BaseAdapter):
    source = "rss"

    def __init__(self, conn: sqlite3.Connection | None = None) -> None:
        self.conn = conn

    def fetch(self) -> AdapterBatch:
        if self.conn is None:
            return AdapterBatch()
        places = list_watchlist(self.conn)
        events: list[dict[str, Any]] = []
        now = utc_now()
        for place in places[:5]:
            name = place.get("name") or ""
            if not name:
                continue
            lat = place.get("lat")
            lon = place.get("lon")
            if lat is None or lon is None:
                continue
            url = RSS_URL.format(q=quote(str(name)))
            try:
                with httpx.Client(timeout=25.0, follow_redirects=True) as client:
                    resp = client.get(url, headers={"User-Agent": "GeoNews/0.1"})
                if resp.status_code >= 400:
                    continue
                root = ET.fromstring(resp.text)
            except Exception:
                continue
            items = root.findall(".//item")[:10]
            for item in items:
                title = (item.findtext("title") or "").strip()
                link = (item.findtext("link") or "").strip()
                desc = (item.findtext("description") or "").strip()
                if not title or not link:
                    continue
                classified = classify_text(title, desc, source="rss")
                events.append(
                    ensure_event_defaults(
                        {
                            "source": "rss",
                            "external_id": link[:500],
                            "title": title,
                            "summary": desc[:500] if desc else title,
                            "url": link,
                            "source_name": "Google News",
                            "category": classified["category"],
                            "severity": classified["severity"],
                            "lat": float(lat),
                            "lon": float(lon),
                            "place_name": name,
                            "occurred_at": now,
                            "ingested_at": now,
                            "raw_json": {"title": title, "link": link},
                        }
                    )
                )
        return AdapterBatch(events=events)
