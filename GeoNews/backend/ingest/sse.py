"""Simple in-process SSE bus for ingest progress + heartbeats."""

from __future__ import annotations

import asyncio
import json
import threading
from collections import deque
from dataclasses import dataclass
from datetime import datetime, timezone
from typing import Any, AsyncIterator


def _utc_now() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")


@dataclass
class SseEvent:
    event: str
    data: dict[str, Any]


class SseBus:
    def __init__(self, maxlen: int = 100) -> None:
        self._history: deque[SseEvent] = deque(maxlen=maxlen)
        self._subscribers: list[asyncio.Queue[SseEvent | None]] = []
        self._lock = threading.Lock()

    def publish(self, event: str, data: dict[str, Any] | None = None) -> None:
        payload = dict(data or {})
        payload.setdefault("ts", _utc_now())
        item = SseEvent(event=event, data=payload)
        with self._lock:
            self._history.append(item)
            subs = list(self._subscribers)
        for q in subs:
            try:
                q.put_nowait(item)
            except asyncio.QueueFull:
                pass

    def subscribe(self) -> asyncio.Queue[SseEvent | None]:
        q: asyncio.Queue[SseEvent | None] = asyncio.Queue(maxsize=50)
        with self._lock:
            self._subscribers.append(q)
        return q

    def unsubscribe(self, q: asyncio.Queue[SseEvent | None]) -> None:
        with self._lock:
            if q in self._subscribers:
                self._subscribers.remove(q)

    async def stream(self, *, heartbeat_seconds: float = 15.0) -> AsyncIterator[str]:
        q = self.subscribe()
        try:
            yield _format_sse("heartbeat", {"ok": True, "ts": _utc_now()})
            while True:
                try:
                    item = await asyncio.wait_for(q.get(), timeout=heartbeat_seconds)
                except asyncio.TimeoutError:
                    yield _format_sse("heartbeat", {"ok": True, "ts": _utc_now()})
                    continue
                if item is None:
                    break
                yield _format_sse(item.event, item.data)
        finally:
            self.unsubscribe(q)


def _format_sse(event: str, data: dict[str, Any]) -> str:
    return f"event: {event}\ndata: {json.dumps(data, default=str)}\n\n"


sse_bus = SseBus()
