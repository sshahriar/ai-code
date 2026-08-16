"""Watchlist CRUD via DB helpers."""

from __future__ import annotations

import sqlite3
from typing import Any

from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field

from deps import get_conn
from db import add_watchlist_place, delete_watchlist_place, list_watchlist
from errors import http_error

router = APIRouter(tags=["watchlist"])


class WatchlistCreate(BaseModel):
    name: str = Field(..., min_length=1)
    lat: float
    lon: float
    radius_km: float = 25


def _serialize_place(row: dict[str, Any]) -> dict[str, Any]:
    return {
        "id": row["id"],
        "name": row["name"],
        "lat": row["lat"],
        "lon": row["lon"],
        "radius_km": row["radius_km"],
        "added_at": row["added_at"],
    }


@router.get("/api/watchlist")
def get_watchlist(conn: sqlite3.Connection = Depends(get_conn)) -> dict:
    places = list_watchlist(conn)
    return {"places": [_serialize_place(p) for p in places]}


@router.post("/api/watchlist", status_code=201)
def create_watchlist_place(
    body: WatchlistCreate,
    conn: sqlite3.Connection = Depends(get_conn),
) -> dict:
    try:
        row = add_watchlist_place(
            conn,
            name=body.name.strip(),
            lat=body.lat,
            lon=body.lon,
            radius_km=body.radius_km,
        )
    except sqlite3.IntegrityError as exc:
        raise http_error(409, "duplicate", f"Watchlist place already exists: {body.name}") from exc
    return _serialize_place(row)


@router.delete("/api/watchlist/{place_id}")
def remove_watchlist_place(
    place_id: str,
    conn: sqlite3.Connection = Depends(get_conn),
) -> dict:
    ok = delete_watchlist_place(conn, place_id)
    if not ok:
        raise http_error(404, "not_found", f"Watchlist place {place_id} not found")
    return {"ok": True}
