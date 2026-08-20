"""GDELT adapter (skipped under INGEST_MOCK).

Uses DOC 2.0 ``artlist`` mode, which returns a real publisher ``url`` per row,
and pins each article to the watchlist place it was queried for. DOC matches
full article text, so only headlines that name the place are kept — otherwise a
story about somewhere else would land on the wrong coordinates.
"""

from __future__ import annotations

import re
import sqlite3
import threading
import time
from datetime import datetime, timezone
from typing import Any
from urllib.parse import quote, urlparse

import httpx

from classify import classify_text
from ingest.base import (
    AdapterBatch,
    BaseAdapter,
    ensure_event_defaults,
    mentions_place,
    place_query_name,
    utc_now,
)

GDELT_DOC = "https://api.gdeltproject.org/api/v2/doc/doc"
USER_AGENT = "GeoNews/0.1 (student-project; contact: local)"

_HREF_RE = re.compile(r"""href=["'](https?://[^"']+)["']""", re.IGNORECASE)

# GDELT asks for at most one request every 5 seconds across all of its APIs,
# and blocks bursts for a while, so stay comfortably above the limit.
MIN_REQUEST_INTERVAL_SECONDS = 6.0
_rate_lock = threading.Lock()
_last_request_at = 0.0


def _wait_turn() -> None:
    global _last_request_at
    with _rate_lock:
        gap = time.monotonic() - _last_request_at
        if _last_request_at and gap < MIN_REQUEST_INTERVAL_SECONDS:
            time.sleep(MIN_REQUEST_INTERVAL_SECONDS - gap)
        _last_request_at = time.monotonic()


def throttled_get(
    client: httpx.Client, url: str, *, attempts: int = 3
) -> httpx.Response | None:
    """
    One GDELT request per 5s.

    GDELT answers a burst with either 429 or a dropped connection, so both are
    retried with a widening backoff before giving up.
    """
    for attempt in range(attempts):
        _wait_turn()
        try:
            resp = client.get(url, headers={"User-Agent": USER_AGENT})
        except Exception:
            resp = None
        if resp is not None and resp.status_code != 429:
            return resp
        if attempt < attempts - 1:
            time.sleep(MIN_REQUEST_INTERVAL_SECONDS * (attempt + 1))
    return None


def is_real_article_url(value: Any) -> bool:
    """True for absolute http(s) URLs that are not demo placeholders."""
    if not isinstance(value, str) or not value.strip():
        return False
    parsed = urlparse(value.strip())
    if parsed.scheme not in {"http", "https"} or not parsed.netloc:
        return False
    host = parsed.netloc.lower()
    return not (host.endswith(".local") or host in {"example.com", "example.org"})


def extract_url(props: dict[str, Any]) -> str | None:
    """Pull an article URL from DOC/GEO properties, parsing ``html`` if needed."""
    direct = props.get("url")
    if is_real_article_url(direct):
        return str(direct).strip()
    html = props.get("html")
    if isinstance(html, str):
        for match in _HREF_RE.findall(html):
            if is_real_article_url(match):
                return match
    return None


def parse_seendate(raw: Any) -> str | None:
    """GDELT ``seendate`` (``20260816T004500Z``) → ISO-8601 UTC."""
    if not isinstance(raw, str):
        return None
    text = raw.strip().replace("-", "").replace(":", "")
    for fmt in ("%Y%m%dT%H%M%SZ", "%Y%m%dT%H%M%S", "%Y%m%d%H%M%S"):
        try:
            parsed = datetime.strptime(text, fmt).replace(tzinfo=timezone.utc)
        except ValueError:
            continue
        return parsed.isoformat().replace("+00:00", "Z")
    return None


def _domain_label(article: dict[str, Any], url: str) -> str:
    domain = article.get("domain")
    if isinstance(domain, str) and domain.strip():
        return domain.strip()
    return urlparse(url).netloc or "GDELT"


class GdeltAdapter(BaseAdapter):
    """DOC 2.0 artlist per watchlist place — real, clickable article URLs."""

    source = "gdelt"

    def __init__(
        self,
        conn: sqlite3.Connection | None = None,
        *,
        places: list[dict[str, Any]] | None = None,
        timespan: str = "1d",
        max_records: int = 25,
        max_places: int = 3,
    ) -> None:
        self.conn = conn
        self.places = places
        self.timespan = timespan
        self.max_records = max_records
        self.max_places = max_places

    def _fetch_place(self, client: httpx.Client, name: str) -> list[dict[str, Any]] | None:
        """Articles for one place, or ``None`` when the request itself failed."""
        q = place_query_name(name)
        phrase = quote('"' + q + '"')
        url = (
            f"{GDELT_DOC}?query={phrase}"
            f"&mode=artlist&maxrecords={self.max_records}"
            f"&format=json&sort=datedesc&timespan={quote(self.timespan)}"
        )
        resp = throttled_get(client, url)
        if resp is None or resp.status_code >= 400:
            return None
        try:
            data = resp.json()
        except Exception:
            return None
        articles = data.get("articles") if isinstance(data, dict) else None
        return articles if isinstance(articles, list) else []

    def fetch(self) -> AdapterBatch:
        places = self.resolve_places(self.conn, self.places)[: self.max_places]
        if not places:
            return AdapterBatch()

        events: list[dict[str, Any]] = []
        now = utc_now()
        seen: set[str] = set()
        queried = 0
        failed = 0

        with httpx.Client(timeout=30.0, follow_redirects=True) as client:
            for place in places:
                name = (place.get("name") or "").strip()
                lat = place.get("lat")
                lon = place.get("lon")
                if not name or lat is None or lon is None:
                    continue

                queried += 1
                articles = self._fetch_place(client, name)
                if articles is None:
                    failed += 1
                    continue

                country = place.get("country_code")
                for article in articles:
                    if not isinstance(article, dict):
                        continue
                    link = extract_url(article)
                    title = (article.get("title") or "").strip()
                    if not link or not title or link in seen:
                        continue
                    if not mentions_place(title, name):
                        continue
                    seen.add(link)
                    classified = classify_text(title, None, source="gdelt")
                    row: dict[str, Any] = {
                        "source": "gdelt",
                        "external_id": link[:500],
                        "title": title,
                        "summary": title,
                        "url": link,
                        "source_name": _domain_label(article, link),
                        "category": classified["category"],
                        "severity": classified["severity"],
                        "lat": float(lat),
                        "lon": float(lon),
                        "place_name": name,
                        "occurred_at": parse_seendate(article.get("seendate")) or now,
                        "ingested_at": now,
                        "raw_json": {
                            "title": title,
                            "url": link,
                            "domain": article.get("domain"),
                            "seendate": article.get("seendate"),
                            "place": name,
                        },
                    }
                    if country:
                        row["country_code"] = country
                    events.append(ensure_event_defaults(row))

        if queried and failed == queried:
            raise RuntimeError(
                f"GDELT DOC unreachable or rate-limited for all {queried} place queries"
            )
        return AdapterBatch(events=events)


