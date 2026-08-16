"""GET /api/brief — thin wrapper over llm.generate_brief."""

from __future__ import annotations

from fastapi import APIRouter, Query

from errors import http_error

router = APIRouter(tags=["intel"])


@router.get("/api/brief")
def brief(
    lat: float = Query(...),
    lon: float = Query(...),
    radius_km: float = Query(25, gt=0),
    window: str = Query("72h"),
) -> dict:
    try:
        from llm import generate_brief
    except ImportError as exc:
        raise http_error(501, "llm_unavailable", "llm package not installed") from exc
    try:
        return generate_brief(lat=lat, lon=lon, radius_km=radius_km, window=window)
    except NotImplementedError as exc:
        raise http_error(501, "llm_not_implemented", str(exc)) from exc
