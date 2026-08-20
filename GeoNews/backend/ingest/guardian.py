"""Guardian Open Platform adapter — skipped when GUARDIAN_API_KEY is empty."""

from __future__ import annotations

import sqlite3
from datetime import datetime, timedelta, timezone
from typing import Any
from urllib.parse import urlencode

import httpx

from classify import classify_text
from config import get_settings
from ingest.base import (
    AdapterBatch,
    BaseAdapter,
    ensure_event_defaults,
    mentions_place,
    place_query_name,
    strip_html,
    utc_now,
)

GUARDIAN_SEARCH = "https://content.guardianapis.com/search"
SOURCE_NAME = "The Guardian"


def parse_publication_date(raw: Any) -> str | None:
    """Guardian ``webPublicationDate`` (``2026-08-16T04:12:33Z``) → ISO-8601 UTC."""
    if not isinstance(raw, str) or not raw.strip():
        return None
    try:
        parsed = datetime.fromisoformat(raw.strip().replace("Z", "+00:00"))
    except ValueError:
        return None
    if parsed.tzinfo is None:
        parsed = parsed.replace(tzinfo=timezone.utc)
    return (
        parsed.astimezone(timezone.utc)
        .replace(microsecond=0)
        .isoformat()
        .replace("+00:00", "Z")
    )


def normalize_results(
    results: list[Any],
    *,
    place: str,
    lat: float,
    lon: float,
    now: str | None = None,
) -> list[dict[str, Any]]:
    """
    Guardian search results → event rows pinned to one watchlist place.

    Guardian articles carry no coordinates, so a row is kept only when the
    headline or standfirst names the place we queried for.
    """
    stamp = now or utc_now()
    events: list[dict[str, Any]] = []
    for item in results:
        if not isinstance(item, dict):
            continue
        url = (item.get("webUrl") or "").strip()
        title = (item.get("webTitle") or "").strip()
        if not url.startswith("http") or not title:
            continue
        fields = item.get("fields") if isinstance(item.get("fields"), dict) else {}
        summary = strip_html(fields.get("trailText")) or title
        if not mentions_place(f"{title} {summary}", place):
            continue
        classified = classify_text(title, summary, source="guardian")
        events.append(
            ensure_event_defaults(
                {
                    "source": "guardian",
                    "external_id": (item.get("id") or url)[:500],
                    "title": title,
                    "summary": summary[:500],
                    "url": url,
                    "source_name": SOURCE_NAME,
                    "category": classified["category"],
                    "severity": classified["severity"],
                    "lat": lat,
                    "lon": lon,
                    "place_name": place,
                    "occurred_at": parse_publication_date(item.get("webPublicationDate"))
                    or stamp,
                    "ingested_at": stamp,
                    "raw_json": {
                        "id": item.get("id"),
                        "webUrl": url,
                        "sectionName": item.get("sectionName"),
                        "place": place,
                    },
                }
            )
        )
    return events


class GuardianAdapter(BaseAdapter):
    """
    Optional free-key adapter, one search per watchlist place.

    Guardian results lack coordinates, so each article is pinned to the centroid
    of the place it was found for; articles that never name that place are
    dropped rather than given invented coordinates.
    """

    source = "guardian"

    def __init__(
        self,
        conn: sqlite3.Connection | None = None,
        *,
        places: list[dict[str, Any]] | None = None,
        page_size: int = 20,
        max_places: int = 5,
        days: int = 2,
    ) -> None:
        self.conn = conn
        self.places = places
        self.page_size = page_size
        self.max_places = max_places
        self.days = days

    def _search(self, client: httpx.Client, place: str, key: str) -> list[Any] | None:
        """Search results, or ``None`` when the request itself failed."""
        q = place_query_name(place)
        from_date = (datetime.now(timezone.utc) - timedelta(days=self.days)).date()
        params = urlencode(
            {
                "q": f'"{q}"',
                "page-size": str(self.page_size),
                "show-fields": "trailText",
                "order-by": "newest",
                "from-date": from_date.isoformat(),
                "api-key": key,
            }
        )
        try:
            # Do not log the API key.
            resp = client.get(
                f"{GUARDIAN_SEARCH}?{params}",
                headers={"User-Agent": "GeoNews/0.1"},
            )
            if resp.status_code >= 400:
                return None
            payload = resp.json()
        except Exception:
            return None
        if not isinstance(payload, dict):
            return None
        results = (payload.get("response") or {}).get("results")
        return results if isinstance(results, list) else []

    def fetch(self) -> AdapterBatch:
        key = get_settings().guardian_api_key
        if not key:
            return AdapterBatch()

        places = self.resolve_places(self.conn, self.places)[: self.max_places]
        if not places:
            return AdapterBatch()

        events: list[dict[str, Any]] = []
        seen: set[str] = set()
        now = utc_now()
        queried = 0
        failed = 0

        with httpx.Client(timeout=25.0, follow_redirects=True) as client:
            for place in places:
                name = (place.get("name") or "").strip()
                lat = place.get("lat")
                lon = place.get("lon")
                if not name or lat is None or lon is None:
                    continue
                queried += 1
                results = self._search(client, name, key)
                if results is None:
                    failed += 1
                    continue
                country = place.get("country_code")
                for row in normalize_results(
                    results,
                    place=name,
                    lat=float(lat),
                    lon=float(lon),
                    now=now,
                ):
                    if row["url"] in seen:
                        continue
                    if country:
                        row["country_code"] = country
                    seen.add(row["url"])
                    events.append(row)

        if queried and failed == queried:
            raise RuntimeError(
                f"Guardian API unreachable for all {queried} place queries"
            )
        return AdapterBatch(events=events)
