"""GET /api/stream/events — SSE stub."""

from __future__ import annotations

from fastapi import APIRouter
from fastapi.responses import StreamingResponse

from ingest.sse import sse_bus

router = APIRouter(tags=["stream"])


@router.get("/api/stream/events")
async def stream_events() -> StreamingResponse:
    return StreamingResponse(
        sse_bus.stream(heartbeat_seconds=15.0),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",
        },
    )
