"""Google News RSS adapter (minimal; geocodes watchlist place, not each headline)."""

from __future__ import annotations

import sqlite3
import xml.etree.ElementTree as ET
from datetime import timezone
from email.utils import parsedate_to_datetime
from typing import Any
from urllib.parse import quote

import httpx

from classify import classify_text
from ingest.base import (
    AdapterBatch,
    BaseAdapter,
    ensure_event_defaults,
    place_query_name,
    strip_html,
    utc_now,
)

RSS_URL = "https://news.google.com/rss/search?q={q}+when:1d&hl=en-US&gl=US&ceid=US:en"


def parse_pub_date(raw: str | None) -> str | None:
    """RSS ``pubDate`` (``Sat, 16 Aug 2026 04:00:00 GMT``) → ISO-8601 UTC."""
    if not raw or not raw.strip():
        return None
    try:
        parsed = parsedate_to_datetime(raw.strip())
    except (TypeError, ValueError):
        return None
    if parsed.tzinfo is None:
        parsed = parsed.replace(tzinfo=timezone.utc)
    return (
        parsed.astimezone(timezone.utc)
        .replace(microsecond=0)
        .isoformat()
        .replace("+00:00", "Z")
    )


class RssAdapter(BaseAdapter):
    source = "rss"

    def __init__(
        self,
        conn: sqlite3.Connection | None = None,
        *,
        places: list[dict[str, Any]] | None = None,
        max_places: int = 5,
    ) -> None:
        self.conn = conn
        self.places = places
        self.max_places = max_places

    def fetch(self) -> AdapterBatch:
        places = self.resolve_places(self.conn, self.places)[: self.max_places]
        if not places:
            return AdapterBatch()

        events: list[dict[str, Any]] = []
        now = utc_now()
        queried = 0
        failed = 0

        for place in places:
            name = (place.get("name") or "").strip()
            if not name:
                continue
            lat = place.get("lat")
            lon = place.get("lon")
            if lat is None or lon is None:
                continue
            q = place_query_name(name)
            url = RSS_URL.format(q=quote(q))
            queried += 1
            try:
                with httpx.Client(timeout=25.0, follow_redirects=True) as client:
                    resp = client.get(url, headers={"User-Agent": "GeoNews/0.1"})
                if resp.status_code >= 400:
                    failed += 1
                    continue
                root = ET.fromstring(resp.text)
            except Exception:
                failed += 1
                continue
            items = root.findall(".//item")[:10]
            country = place.get("country_code")
            for item in items:
                title = (item.findtext("title") or "").strip()
                link = (item.findtext("link") or "").strip()
                desc = strip_html(item.findtext("description") or "")
                if not title or not link:
                    continue
                publisher = (item.findtext("source") or "").strip()
                if publisher and title.endswith(f" - {publisher}"):
                    title = title[: -(len(publisher) + 3)].strip()
                # Relevance: feed was queried for this place; pin to supplied centroid.
                classified = classify_text(title, desc, source="rss")
                row: dict[str, Any] = {
                    "source": "rss",
                    "external_id": link[:500],
                    "title": title,
                    "summary": desc[:500] if desc else title,
                    "url": link,
                    "source_name": publisher or "Google News",
                    "category": classified["category"],
                    "severity": classified["severity"],
                    "lat": float(lat),
                    "lon": float(lon),
                    "place_name": name,
                    "occurred_at": parse_pub_date(item.findtext("pubDate")) or now,
                    "ingested_at": now,
                    "raw_json": {"title": title, "link": link},
                }
                if country:
                    row["country_code"] = country
                events.append(ensure_event_defaults(row))

        if queried and failed == queried:
            raise RuntimeError(
                f"Google News RSS unreachable for all {queried} place queries"
            )
        return AdapterBatch(events=events)
