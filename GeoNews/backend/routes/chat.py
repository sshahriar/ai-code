"""POST /api/chat — thin wrapper over llm.handle_chat."""

from __future__ import annotations

from fastapi import APIRouter
from pydantic import BaseModel, Field

from errors import http_error

router = APIRouter(tags=["intel"])


class ChatBody(BaseModel):
    message: str = Field(..., min_length=1)
    lat: float | None = None
    lon: float | None = None
    place_name: str | None = None


@router.post("/api/chat")
def chat(body: ChatBody) -> dict:
    try:
        from llm import handle_chat
    except ImportError as exc:
        raise http_error(501, "llm_unavailable", "llm package not installed") from exc
    try:
        return handle_chat(
            message=body.message,
            lat=body.lat,
            lon=body.lon,
            place_name=body.place_name,
        )
    except NotImplementedError as exc:
        raise http_error(501, "llm_not_implemented", str(exc)) from exc
