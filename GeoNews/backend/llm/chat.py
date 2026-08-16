"""Chat structured responses (mock fixtures or live Cerebras output)."""

from __future__ import annotations

import sqlite3
from typing import Any

from llm.client import (
    SYSTEM_PROMPT,
    event_summary_lines,
    incident_summary_lines,
    should_use_mock,
    structured_completion,
)
from llm.context import load_place_context, load_recent_chat, resolve_place
from llm.fixtures import chat_fixture
from llm.models import ChatResponse


def handle_chat(
    *,
    message: str,
    lat: float | None = None,
    lon: float | None = None,
    place_name: str | None = None,
    radius_km: float = 25.0,
    window: str = "72h",
    conn: sqlite3.Connection | None = None,
    user_id: str = "default",
) -> dict[str, Any]:
    """
    Build a structured chat response for ``POST /api/chat``.

    Keyword-only to match Backend routes. Returns ``ChatResponse`` dict (+ ``mock``).
    Does **not** mutate the DB (Backend owns watchlist + message persistence).
    """
    place = resolve_place(lat=lat, lon=lon, place_name=place_name, conn=conn)

    if should_use_mock():
        resp = chat_fixture(
            message,
            lat=place["lat"],
            lon=place["lon"],
            place_name=place_name or place["name"],
            window=window,
        )
        data = resp.model_dump()
        data["mock"] = True
        return data

    ctx = load_place_context(
        conn,
        lat=place["lat"],
        lon=place["lon"],
        radius_km=radius_km,
        window=window,
    )
    history = load_recent_chat(conn, user_id=user_id)
    history_lines = [
        f"{row.get('role')}: {row.get('content')}" for row in history[-8:]
    ]

    user_content = "\n".join(
        [
            f"User message: {message}",
            f"Place: {place_name or place['name']} ({place['lat']:.4f}, {place['lon']:.4f})",
            f"Window: {window}",
            "Recent chat:",
            *(history_lines or ["- (none)"]),
            "Nearby events:",
            *(event_summary_lines(ctx["events"]) or ["- (none)"]),
            "Nearby incidents:",
            *(incident_summary_lines(ctx["incidents"]) or ["- (none)"]),
            "Respond as ChatResponse including an optional brief for this place. "
            "watchlist_changes may only add/remove places. "
            "highlight_event_ids must be real ids from the event list when possible. "
            "Never invent official crime statistics.",
        ]
    )
    messages = [
        {"role": "system", "content": SYSTEM_PROMPT},
        {"role": "user", "content": user_content},
    ]
    result = structured_completion(messages, ChatResponse)
    data = result.model_dump()
    data["mock"] = False
    return data
