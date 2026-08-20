"""POST /api/ingest/run + POST /api/ingest/place."""

from __future__ import annotations

from typing import Any

from fastapi import APIRouter
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field

from errors import http_error
from ingest import run_place_ingest_gated, start_manual_ingest_background
from ingest.base import normalize_place_input

router = APIRouter(tags=["system"])


class PlaceIngestBody(BaseModel):
    name: str = Field(..., min_length=1)
    lat: float
    lon: float
    country_code: str | None = None


@router.post("/api/ingest/run")
def ingest_run() -> dict:
    ok, err = start_manual_ingest_background()
    if not ok:
        code = "rate_limited" if err and "rate-limited" in err.lower() else "busy"
        status = 429 if code == "rate_limited" else 409
        raise http_error(status, code, err or "Ingest unavailable")
    return {"ok": True, "status": "started"}


@router.post("/api/ingest/place")
def ingest_place(body: PlaceIngestBody) -> Any:
    """
    Place-scoped live ingest for a geocoded point (not added to watchlist).

    Sync route — FastAPI runs it in a worker thread so GDELT throttle / RSS
    I/O do not block the event loop.
    """
    try:
        normalize_place_input(body.model_dump())
    except ValueError as exc:
        raise http_error(400, "bad_request", str(exc)) from exc

    result = run_place_ingest_gated(body.model_dump())
    if not result.get("ok"):
        err = result.get("error") or {}
        code = err.get("code") or "ingest_failed"
        message = err.get("message") or "Place ingest failed"
        if code == "rate_limited":
            raise http_error(429, code, message)
        if code == "busy":
            raise http_error(409, code, message)
        if code == "bad_request":
            raise http_error(400, code, message)
        # All sources failed — return structured body with sources for debugging.
        return JSONResponse(status_code=502, content=result)
    return result
