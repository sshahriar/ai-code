"""POST /api/chat — thin wrapper over llm.handle_chat."""

from __future__ import annotations

import logging
import sqlite3
from typing import Any

from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field

from db import add_watchlist_place, delete_watchlist_place, list_watchlist
from db.queries import insert_chat_message
from deps import get_conn
from errors import http_error

router = APIRouter(tags=["intel"])
log = logging.getLogger("geonews.chat")

SAFE_LLM_MESSAGE = (
    "The AI analyst could not complete this request. Try again in a moment."
)


class ChatBody(BaseModel):
    message: str = Field(..., min_length=1)
    lat: float | None = None
    lon: float | None = None
    place_name: str | None = None
    radius_km: float = Field(25, gt=0)
    window: str = "72h"


def _apply_watchlist_changes(
    conn: sqlite3.Connection, changes: list[dict[str, Any]], *, user_id: str
) -> None:
    """Execute allowed add/remove actions only. Never invent coordinates."""
    for change in changes or []:
        action = str(change.get("action") or "").strip().lower()
        name = str(change.get("name") or "").strip()
        if not name:
            continue
        if action == "add":
            lat, lon = change.get("lat"), change.get("lon")
            if lat is None or lon is None:
                continue
            try:
                add_watchlist_place(
                    conn,
                    name=name,
                    lat=float(lat),
                    lon=float(lon),
                    user_id=user_id,
                )
            except sqlite3.IntegrityError:
                continue
        elif action == "remove":
            for place in list_watchlist(conn, user_id=user_id):
                if str(place.get("name") or "").strip().lower() == name.lower():
                    delete_watchlist_place(conn, place["id"], user_id=user_id)
                    break


@router.post("/api/chat")
def chat(body: ChatBody, conn: sqlite3.Connection = Depends(get_conn)) -> dict:
    try:
        from llm import handle_chat
    except ImportError as exc:
        raise http_error(501, "llm_unavailable", "llm package not installed") from exc
    try:
        data = handle_chat(
            message=body.message,
            lat=body.lat,
            lon=body.lon,
            place_name=body.place_name,
            radius_km=body.radius_km,
            window=body.window,
            conn=conn,
        )
    except NotImplementedError as exc:
        raise http_error(501, "llm_not_implemented", str(exc)) from exc
    except Exception as exc:
        log.warning("llm chat failed: %s", type(exc).__name__)
        raise http_error(502, "llm_failed", SAFE_LLM_MESSAGE) from None

    changes = data.get("watchlist_changes") or []
    if isinstance(changes, list):
        _apply_watchlist_changes(conn, changes, user_id="default")

    actions_blob = {"watchlist_changes": changes} if changes else None
    insert_chat_message(
        conn, role="user", content=body.message, actions=None
    )
    insert_chat_message(
        conn,
        role="assistant",
        content=str(data.get("message") or ""),
        actions=actions_blob,
    )
    return data
