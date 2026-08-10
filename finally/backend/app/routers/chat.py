"""FastAPI chat router handling POST /api/chat and GET /api/chat/history."""

from __future__ import annotations

from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel, Field

from app.services.llm_service import get_chat_history, process_chat

router = APIRouter(prefix="/api/chat", tags=["chat"])


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, description="User prompt message")


class TradeActionResponse(BaseModel):
    ticker: str
    side: str
    quantity: float
    price: float | None = None
    status: str | None = None


class WatchlistActionResponse(BaseModel):
    ticker: str
    action: str
    result: str | None = None


class ChatResponse(BaseModel):
    message: str
    trades: list[dict] = Field(default_factory=list)
    watchlist_changes: list[dict] = Field(default_factory=list)


@router.post("", response_model=ChatResponse)
async def send_chat_message(chat_req: ChatRequest, request: Request) -> dict:
    """POST /api/chat - Accept user message, gather context, process via LLM/mock, auto-execute actions."""
    if not chat_req.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty")

    price_cache = getattr(request.app.state, "price_cache", None)
    db_path = getattr(request.app.state, "db_path", None)

    result = await process_chat(
        user_message=chat_req.message,
        price_cache=price_cache,
        user_id="default",
        db_path=db_path,
    )
    return result


@router.get("/history")
async def get_history(request: Request, limit: int = 20) -> list[dict]:
    """GET /api/chat/history - Retrieve recent conversation history."""
    db_path = getattr(request.app.state, "db_path", None)
    return get_chat_history(user_id="default", limit=limit, db_path=db_path)
