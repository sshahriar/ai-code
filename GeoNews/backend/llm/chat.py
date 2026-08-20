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
from llm.context import (
    apply_limited_context_caveat,
    context_is_empty,
    load_place_context,
    load_recent_chat,
    resolve_place,
)
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
    display_name = place_name or place["name"]
    ctx = load_place_context(
        conn,
        lat=place["lat"],
        lon=place["lon"],
        radius_km=radius_km,
        window=window,
    )
    empty = context_is_empty(ctx)

    if should_use_mock():
        resp = chat_fixture(
            message,
            lat=place["lat"],
            lon=place["lon"],
            place_name=display_name,
            window=window,
        )
        data = resp.model_dump()
        data["mock"] = True
        return apply_limited_context_caveat(
            data, empty=empty, place_name=display_name, window=window
        )

    history = load_recent_chat(conn, user_id=user_id)
    history_lines = [
        f"{row.get('role')}: {row.get('content')}" for row in history[-8:]
    ]

    user_content = "\n".join(
        [
            f"User message: {message}",
            f"Place: {display_name} ({place['lat']:.4f}, {place['lon']:.4f})",
            f"Window: {window}",
            "Recent chat:",
            *(history_lines or ["- (none)"]),
            "Nearby events:",
            *(event_summary_lines(ctx["events"]) or ["- (none)"]),
            "Nearby incidents:",
            *(incident_summary_lines(ctx["incidents"]) or ["- (none)"]),
            (
                "No relevant events or incidents were found for this place. "
                "Say so clearly and include a no-news / limited-context caveat. "
                "Do not invent headlines, coordinates, or official crime statistics."
                if empty
                else "Use only the listed events/incidents. Do not invent extra news."
            ),
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
    return apply_limited_context_caveat(
        data, empty=empty, place_name=display_name, window=window
    )
