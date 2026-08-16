"""Nominatim place search + reverse."""

from __future__ import annotations

from fastapi import APIRouter, Query

from errors import http_error
from geocode import GeocodeError, reverse_geocode, search_place

router = APIRouter(tags=["places"])


@router.get("/api/places/search")
def places_search(q: str = Query(..., min_length=1)) -> dict:
    try:
        results = search_place(q, limit=5)
    except GeocodeError as exc:
        raise http_error(exc.status, exc.code, exc.message) from exc
    return {"results": results}


@router.get("/api/places/reverse")
def places_reverse(
    lat: float = Query(...),
    lon: float = Query(...),
) -> dict:
    try:
        result = reverse_geocode(lat, lon)
    except GeocodeError as exc:
        raise http_error(exc.status, exc.code, exc.message) from exc
    return result
