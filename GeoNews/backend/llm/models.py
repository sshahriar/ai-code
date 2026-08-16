"""Pydantic structured-output models for GeoNews LLM calls."""

from __future__ import annotations

from pydantic import BaseModel, Field


class GeoNewsBrief(BaseModel):
    place_name: str
    window: str
    headline: str
    risk_level: str = Field(pattern="^(low|moderate|high|unknown)$")
    bullets: list[str]
    caveats: list[str]


class WatchlistChange(BaseModel):
    name: str
    lat: float | None = None
    lon: float | None = None
    action: str = Field(pattern="^(add|remove)$")


class ChatResponse(BaseModel):
    message: str
    brief: GeoNewsBrief | None = None
    watchlist_changes: list[WatchlistChange] = []
    highlight_event_ids: list[str] = []


class ClassifyResult(BaseModel):
    category: str = Field(
        pattern="^(crime|conflict|disaster|politics|health|economy|other)$"
    )
    severity: int = Field(ge=1, le=5)
    rationale: str
