"""POST /api/ingest/run — rate-limited background ingest."""

from __future__ import annotations

from fastapi import APIRouter

from errors import http_error
from ingest import start_manual_ingest_background

router = APIRouter(tags=["system"])


@router.post("/api/ingest/run")
def ingest_run() -> dict:
    ok, err = start_manual_ingest_background()
    if not ok:
        code = "rate_limited" if err and "rate-limited" in err.lower() else "busy"
        status = 429 if code == "rate_limited" else 409
        raise http_error(status, code, err or "Ingest unavailable")
    return {"ok": True, "status": "started"}
