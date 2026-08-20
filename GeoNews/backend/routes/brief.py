"""GET /api/brief — thin wrapper over llm.generate_brief."""

from __future__ import annotations

import logging
import sqlite3

from fastapi import APIRouter, Depends, Query

from deps import get_conn
from errors import http_error

router = APIRouter(tags=["intel"])
log = logging.getLogger("geonews.brief")

SAFE_LLM_MESSAGE = (
    "The AI analyst could not complete this request. Try again in a moment."
)


@router.get("/api/brief")
def brief(
    lat: float = Query(...),
    lon: float = Query(...),
    radius_km: float = Query(25, gt=0),
    window: str = Query("72h"),
    place_name: str | None = Query(None),
    conn: sqlite3.Connection = Depends(get_conn),
) -> dict:
    try:
        from llm import generate_brief
    except ImportError as exc:
        raise http_error(501, "llm_unavailable", "llm package not installed") from exc
    try:
        return generate_brief(
            lat=lat,
            lon=lon,
            radius_km=radius_km,
            window=window,
            place_name=place_name,
            conn=conn,
        )
    except NotImplementedError as exc:
        raise http_error(501, "llm_not_implemented", str(exc)) from exc
    except Exception as exc:
        log.warning("llm brief failed: %s", type(exc).__name__)
        raise http_error(502, "llm_failed", SAFE_LLM_MESSAGE) from None
