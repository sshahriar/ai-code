"""Ingest runner: adapters → upsert → ingest_runs + SSE (off event loop)."""

from __future__ import annotations

import sqlite3
import threading
import time
import uuid
from typing import Any

from config import get_settings
from db import connect, get_db_path, upsert_event, upsert_incident
from ingest.base import AdapterBatch, BaseAdapter, utc_now
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


def build_adapters(conn: sqlite3.Connection, *, mock: bool | None = None) -> list[BaseAdapter]:
    settings = get_settings()
    use_mock = settings.ingest_mock if mock is None else mock
    if use_mock:
        return [SampleAdapter()]
    return [
        SampleAdapter(),
        GdeltAdapter(),
        RssAdapter(conn),
        GuardianAdapter(),
        PoliceUkAdapter(conn),
    ]


def run_ingest(*, mock: bool | None = None, trigger: str = "manual") -> dict[str, Any]:
    """Run adapters synchronously (call from a worker thread)."""
    settings = get_settings()
    use_mock = settings.ingest_mock if mock is None else mock
    started = utc_now()
    sse_bus.publish("ingest_progress", {"status": "started", "trigger": trigger, "mock": use_mock})

    conn = connect(get_db_path())
    try:
        adapters = build_adapters(conn, mock=use_mock)
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
    finally:
        conn.close()


def start_manual_ingest_background() -> tuple[bool, str | None]:
    """Rate-limited manual ingest kickoff used by POST /api/ingest/run."""
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

    def _worker() -> None:
        global _running
        try:
            run_ingest(trigger="manual")
        finally:
            with _running_lock:
                _running = False

    threading.Thread(target=_worker, name="geonews-ingest", daemon=True).start()
    return True, None


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
