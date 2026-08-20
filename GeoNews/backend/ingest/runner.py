"""Ingest runner: adapters → upsert → ingest_runs + SSE (off event loop)."""

from __future__ import annotations

import sqlite3
import threading
import time
import uuid
from typing import Any

from config import get_settings
from db import connect, get_db_path, list_watchlist, query_events_bbox, upsert_event, upsert_incident
from ingest.base import AdapterBatch, BaseAdapter, normalize_place_input, utc_now
from ingest.gdelt import GdeltAdapter
from ingest.guardian import GuardianAdapter
from ingest.police_uk import PoliceUkAdapter
from ingest.rss import RssAdapter
from ingest.sample import SampleAdapter
from ingest.sse import sse_bus

_last_manual_run_at = 0.0
_running = False
_running_lock = threading.Lock()
_scheduler_started = False

# ~25 km latitude delta; used when returning events near a selected place.
_PLACE_BBOX_DEG = 0.25

_EVENT_FIELDS = (
    "id",
    "source",
    "title",
    "summary",
    "url",
    "source_name",
    "category",
    "severity",
    "lat",
    "lon",
    "place_name",
    "occurred_at",
)


def _record_run(
    conn: sqlite3.Connection,
    *,
    source: str,
    status: str,
    rows_upserted: int,
    started_at: str,
    finished_at: str,
    error: str | None = None,
) -> str:
    run_id = str(uuid.uuid4())
    conn.execute(
        """
        INSERT INTO ingest_runs (id, source, started_at, finished_at, status, rows_upserted, error)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        """,
        (run_id, source, started_at, finished_at, status, rows_upserted, error),
    )
    conn.commit()
    return run_id


def _upsert_batch(conn: sqlite3.Connection, batch: AdapterBatch) -> tuple[int, list[str]]:
    count = 0
    event_ids: list[str] = []
    for event in batch.events:
        if event.get("lat") is None or event.get("lon") is None:
            continue
        row = upsert_event(conn, event)
        count += 1
        event_ids.append(row["id"])
    for incident in batch.incidents:
        if incident.get("lat") is None or incident.get("lon") is None:
            continue
        upsert_incident(conn, incident)
        count += 1
    return count, event_ids


def _serialize_event(row: dict[str, Any]) -> dict[str, Any]:
    return {k: row.get(k) for k in _EVENT_FIELDS}


def build_adapters(
    conn: sqlite3.Connection,
    *,
    mock: bool | None = None,
    places: list[dict[str, Any]] | None = None,
) -> list[BaseAdapter]:
    """
    Build the live (or mock) adapter list.

    When ``places`` is provided, adapters query that list instead of the DB
    watchlist — used for place-scoped ingest without mutating watchlist.
    """
    settings = get_settings()
    use_mock = settings.ingest_mock if mock is None else mock
    if use_mock:
        return [SampleAdapter()]
    return [
        GdeltAdapter(conn, places=places),
        RssAdapter(conn, places=places),
        GuardianAdapter(conn, places=places),
        PoliceUkAdapter(conn, places=places),
    ]


def purge_sample_rows(conn: sqlite3.Connection) -> int:
    """Drop seeded demo rows so a live run never mixes fake and real events."""
    removed = conn.execute("DELETE FROM events WHERE source = 'sample'").rowcount
    removed += conn.execute("DELETE FROM incidents WHERE source = 'sample'").rowcount
    conn.commit()
    return max(0, removed)


def _run_adapters(
    conn: sqlite3.Connection,
    adapters: list[BaseAdapter],
    *,
    trigger: str,
    use_mock: bool,
    meta: dict[str, Any] | None = None,
) -> dict[str, Any]:
    started = utc_now()
    progress_start: dict[str, Any] = {
        "status": "started",
        "trigger": trigger,
        "mock": use_mock,
    }
    if meta:
        progress_start.update(meta)
    sse_bus.publish("ingest_progress", progress_start)

    total = 0
    per_source: list[dict[str, Any]] = []
    new_ids: list[str] = []

    for adapter in adapters:
        src_started = utc_now()
        try:
            batch = adapter.fetch()
            rows, ids = _upsert_batch(conn, batch)
            _record_run(
                conn,
                source=adapter.source,
                status="ok",
                rows_upserted=rows,
                started_at=src_started,
                finished_at=utc_now(),
            )
            total += rows
            new_ids.extend(ids)
            per_source.append({"source": adapter.source, "status": "ok", "rows": rows})
            sse_bus.publish(
                "ingest_progress",
                {"status": "adapter_done", "source": adapter.source, "rows": rows},
            )
        except Exception as exc:
            _record_run(
                conn,
                source=adapter.source,
                status="error",
                rows_upserted=0,
                started_at=src_started,
                finished_at=utc_now(),
                error=str(exc)[:500],
            )
            per_source.append(
                {"source": adapter.source, "status": "error", "error": str(exc)}
            )
            sse_bus.publish(
                "ingest_progress",
                {
                    "status": "adapter_error",
                    "source": adapter.source,
                    "error": str(exc),
                },
            )

    # Keep the seeded demo rows until live sources actually return something,
    # so an offline run does not leave an empty map.
    if not use_mock and total > 0:
        purge_sample_rows(conn)

    finished = utc_now()
    if new_ids:
        sse_bus.publish("new_events", {"ids": new_ids[:50], "count": len(new_ids)})
    sse_bus.publish(
        "ingest_progress",
        {"status": "finished", "rows_upserted": total, "finished_at": finished},
    )
    return {
        "ok": True,
        "mock": use_mock,
        "trigger": trigger,
        "started_at": started,
        "finished_at": finished,
        "rows_upserted": total,
        "sources": per_source,
    }


def run_ingest(*, mock: bool | None = None, trigger: str = "manual") -> dict[str, Any]:
    """Run adapters synchronously (call from a worker thread)."""
    settings = get_settings()
    use_mock = settings.ingest_mock if mock is None else mock
    conn = connect(get_db_path())
    try:
        adapters = build_adapters(conn, mock=use_mock)
        return _run_adapters(conn, adapters, trigger=trigger, use_mock=use_mock)
    finally:
        conn.close()


def run_place_ingest(
    place: dict[str, Any],
    *,
    mock: bool | None = None,
) -> dict[str, Any]:
    """
    Live ingest for one geocoded place without writing to the watchlist.

    Sync / blocking — intended for FastAPI sync routes (threadpool).
    """
    settings = get_settings()
    use_mock = settings.ingest_mock if mock is None else mock
    normalized = normalize_place_input(place)

    conn = connect(get_db_path())
    try:
        watchlist_before = len(list_watchlist(conn))
        adapters = build_adapters(conn, mock=use_mock, places=[normalized])
        summary = _run_adapters(
            conn,
            adapters,
            trigger="place",
            use_mock=use_mock,
            meta={"place": normalized["name"]},
        )

        watchlist_after = len(list_watchlist(conn))
        if watchlist_after != watchlist_before:
            raise RuntimeError("place ingest must not mutate the watchlist")

        lat = float(normalized["lat"])
        lon = float(normalized["lon"])
        delta = _PLACE_BBOX_DEG
        nearby = query_events_bbox(
            conn,
            min_lat=lat - delta,
            min_lon=lon - delta,
            max_lat=lat + delta,
            max_lon=lon + delta,
            limit=100,
        )

        sources = summary["sources"]
        attempted = [s for s in sources if s.get("status") != "skipped"]
        # Sample/mock has one adapter; live may skip Guardian (empty key) with ok+0.
        errors = [s for s in attempted if s.get("status") == "error"]
        oks = [s for s in attempted if s.get("status") == "ok"]

        if attempted and errors and not oks:
            return {
                "ok": False,
                "error": {
                    "code": "ingest_failed",
                    "message": "All place ingest sources failed",
                },
                "place": normalized,
                "rows_upserted": 0,
                "sources": sources,
                "events": [],
            }

        return {
            "ok": True,
            "place": normalized,
            "rows_upserted": summary["rows_upserted"],
            "sources": sources,
            "events": [_serialize_event(r) for r in nearby],
            "started_at": summary["started_at"],
            "finished_at": summary["finished_at"],
            "mock": use_mock,
        }
    finally:
        conn.close()


def _acquire_ingest_slot() -> tuple[bool, str | None]:
    """Shared concurrency + cooldown gate for manual and place ingest."""
    global _last_manual_run_at, _running
    settings = get_settings()
    now = time.monotonic()
    with _running_lock:
        if _running:
            return False, "Ingest already running"
        if _last_manual_run_at and (now - _last_manual_run_at) < settings.ingest_manual_cooldown_seconds:
            wait = int(settings.ingest_manual_cooldown_seconds - (now - _last_manual_run_at)) + 1
            return False, f"Ingest rate-limited; retry in ~{wait}s"
        _running = True
        _last_manual_run_at = now
    return True, None


def _release_ingest_slot() -> None:
    global _running
    with _running_lock:
        _running = False


def start_manual_ingest_background() -> tuple[bool, str | None]:
    """Rate-limited manual ingest kickoff used by POST /api/ingest/run."""
    ok, err = _acquire_ingest_slot()
    if not ok:
        return False, err

    def _worker() -> None:
        try:
            run_ingest(trigger="manual")
        finally:
            _release_ingest_slot()

    threading.Thread(target=_worker, name="geonews-ingest", daemon=True).start()
    return True, None


def run_place_ingest_gated(place: dict[str, Any]) -> dict[str, Any]:
    """
    Place ingest under the same busy/cooldown lock as manual ingest.

    Runs synchronously; caller must be off the asyncio event loop (sync route).
    """
    ok, err = _acquire_ingest_slot()
    if not ok:
        code = "rate_limited" if err and "rate-limited" in err.lower() else "busy"
        return {
            "ok": False,
            "error": {"code": code, "message": err or "Ingest unavailable"},
        }
    try:
        return run_place_ingest(place)
    finally:
        _release_ingest_slot()


def start_scheduler() -> None:
    """Background loop every INGEST_INTERVAL_SECONDS."""
    global _scheduler_started
    if _scheduler_started:
        return
    _scheduler_started = True
    settings = get_settings()

    def _loop() -> None:
        time.sleep(min(5, settings.ingest_interval_seconds))
        while True:
            try:
                with _running_lock:
                    busy = _running
                if not busy:
                    run_ingest(trigger="scheduler")
            except Exception:
                pass
            time.sleep(max(60, settings.ingest_interval_seconds))

    threading.Thread(target=_loop, name="geonews-ingest-scheduler", daemon=True).start()
