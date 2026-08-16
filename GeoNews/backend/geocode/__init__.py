"""Nominatim forward/reverse geocoding with rate limit + cache."""

from __future__ import annotations

import sqlite3
import threading
import time
from datetime import datetime, timezone
from typing import Any
from urllib.parse import urlencode

import httpx

from config import get_settings
from db import connect, get_db_path

NOMINATIM_BASE = "https://nominatim.openstreetmap.org"
CACHE_TTL_SECONDS = 7 * 24 * 3600

_lock = threading.Lock()
_last_request_at = 0.0
_memory_cache: dict[str, tuple[float, Any]] = {}
_table_ready = False
_table_lock = threading.Lock()


def _utc_now() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")


def _norm_q(q: str) -> str:
    return " ".join(q.lower().strip().split())


def _ensure_cache_table(conn: sqlite3.Connection) -> None:
    global _table_ready
    if _table_ready:
        return
    with _table_lock:
        if _table_ready:
            return
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS geocode_cache (
              cache_key TEXT PRIMARY KEY,
              kind TEXT NOT NULL,
              payload TEXT NOT NULL,
              created_at TEXT NOT NULL
            )
            """
        )
        conn.commit()
        _table_ready = True


def _memory_get(key: str) -> Any | None:
    item = _memory_cache.get(key)
    if not item:
        return None
    expires_at, payload = item
    if time.time() > expires_at:
        _memory_cache.pop(key, None)
        return None
    return payload


def _memory_set(key: str, payload: Any) -> None:
    _memory_cache[key] = (time.time() + CACHE_TTL_SECONDS, payload)


def _sqlite_get(key: str) -> Any | None:
    import json

    try:
        conn = connect(get_db_path())
        try:
            _ensure_cache_table(conn)
            row = conn.execute(
                "SELECT payload, created_at FROM geocode_cache WHERE cache_key = ?",
                (key,),
            ).fetchone()
            if row is None:
                return None
            created = row["created_at"]
            # Rough TTL check via ISO parse fallback: store epoch in created if needed
            # We store ISO; compare by parsing.
            try:
                created_dt = datetime.fromisoformat(created.replace("Z", "+00:00"))
                age = (datetime.now(timezone.utc) - created_dt).total_seconds()
                if age > CACHE_TTL_SECONDS:
                    return None
            except ValueError:
                pass
            return json.loads(row["payload"])
        finally:
            conn.close()
    except Exception:
        return None


def _sqlite_set(key: str, kind: str, payload: Any) -> None:
    import json

    try:
        conn = connect(get_db_path())
        try:
            _ensure_cache_table(conn)
            conn.execute(
                """
                INSERT INTO geocode_cache (cache_key, kind, payload, created_at)
                VALUES (?, ?, ?, ?)
                ON CONFLICT(cache_key) DO UPDATE SET
                  payload = excluded.payload,
                  created_at = excluded.created_at,
                  kind = excluded.kind
                """,
                (key, kind, json.dumps(payload), _utc_now()),
            )
            conn.commit()
        finally:
            conn.close()
    except Exception:
        pass


def _cache_get(key: str) -> Any | None:
    hit = _memory_get(key)
    if hit is not None:
        return hit
    hit = _sqlite_get(key)
    if hit is not None:
        _memory_set(key, hit)
    return hit


def _cache_set(key: str, kind: str, payload: Any) -> None:
    _memory_set(key, payload)
    _sqlite_set(key, kind, payload)


def _rate_limit() -> None:
    global _last_request_at
    with _lock:
        now = time.monotonic()
        wait = 1.0 - (now - _last_request_at)
        if wait > 0:
            time.sleep(wait)
        _last_request_at = time.monotonic()


def _headers() -> dict[str, str]:
    return {
        "User-Agent": get_settings().nominatim_user_agent,
        "Accept-Language": "en",
    }


class GeocodeError(Exception):
    def __init__(self, code: str, message: str, status: int = 502) -> None:
        super().__init__(message)
        self.code = code
        self.message = message
        self.status = status


def search_place(q: str, *, limit: int = 5) -> list[dict[str, Any]]:
    """Forward geocode. Returns a list of place hits (up to ``limit``)."""
    query = (q or "").strip()
    if not query:
        raise GeocodeError("bad_request", "q is required", status=400)

    cache_key = f"fwd:{_norm_q(query)}:{limit}"
    cached = _cache_get(cache_key)
    if cached is not None:
        return cached

    _rate_limit()
    params = urlencode({"q": query, "format": "jsonv2", "limit": str(limit), "addressdetails": "1"})
    url = f"{NOMINATIM_BASE}/search?{params}"
    try:
        with httpx.Client(timeout=20.0) as client:
            resp = client.get(url, headers=_headers())
    except httpx.HTTPError as exc:
        raise GeocodeError("nominatim_down", f"Nominatim request failed: {exc}") from exc

    if resp.status_code == 429:
        raise GeocodeError("nominatim_rate_limited", "Nominatim rate limited (429)", status=429)
    if resp.status_code >= 500:
        raise GeocodeError("nominatim_down", f"Nominatim server error ({resp.status_code})")
    if resp.status_code >= 400:
        raise GeocodeError("nominatim_error", f"Nominatim client error ({resp.status_code})", status=400)

    raw = resp.json()
    results: list[dict[str, Any]] = []
    for item in raw if isinstance(raw, list) else []:
        try:
            lat = float(item["lat"])
            lon = float(item["lon"])
        except (KeyError, TypeError, ValueError):
            continue
        bbox_raw = item.get("boundingbox")
        bbox = None
        if isinstance(bbox_raw, (list, tuple)) and len(bbox_raw) == 4:
            # Nominatim: [south, north, west, east] → [min_lon, min_lat, max_lon, max_lat]
            try:
                south, north, west, east = (float(x) for x in bbox_raw)
                bbox = [west, south, east, north]
            except (TypeError, ValueError):
                bbox = None
        address = item.get("address") or {}
        country_code = address.get("country_code")
        results.append(
            {
                "name": item.get("display_name") or query,
                "lat": lat,
                "lon": lon,
                "bbox": bbox,
                "country_code": country_code,
            }
        )

    _cache_set(cache_key, "forward", results)
    return results


def reverse_geocode(lat: float, lon: float) -> dict[str, Any]:
    """Reverse geocode a point → ``{name, country_code}``."""
    cache_key = f"rev:{round(lat, 4)},{round(lon, 4)}"
    cached = _cache_get(cache_key)
    if cached is not None:
        return cached

    _rate_limit()
    params = urlencode({"lat": str(lat), "lon": str(lon), "format": "jsonv2"})
    url = f"{NOMINATIM_BASE}/reverse?{params}"
    try:
        with httpx.Client(timeout=20.0) as client:
            resp = client.get(url, headers=_headers())
    except httpx.HTTPError as exc:
        raise GeocodeError("nominatim_down", f"Nominatim request failed: {exc}") from exc

    if resp.status_code == 429:
        raise GeocodeError("nominatim_rate_limited", "Nominatim rate limited (429)", status=429)
    if resp.status_code >= 500:
        raise GeocodeError("nominatim_down", f"Nominatim server error ({resp.status_code})")

    data = resp.json() if resp.content else {}
    if not isinstance(data, dict) or data.get("error"):
        result = {"name": "Unknown", "country_code": None}
    else:
        address = data.get("address") or {}
        result = {
            "name": data.get("display_name") or "Unknown",
            "country_code": address.get("country_code"),
        }

    _cache_set(cache_key, "reverse", result)
    return result


def clear_memory_cache() -> None:
    """Test helper."""
    _memory_cache.clear()
