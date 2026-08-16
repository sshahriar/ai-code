"""Place brief generation (mock fixtures or live Cerebras structured output)."""

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
from llm.context import load_place_context, resolve_place
from llm.fixtures import brief_for_place
from llm.models import GeoNewsBrief


def generate_brief(
    *,
    lat: float,
    lon: float,
    radius_km: float = 25.0,
    window: str = "72h",
    place_name: str | None = None,
    conn: sqlite3.Connection | None = None,
) -> dict[str, Any]:
    """
    Build a structured place brief for ``GET /api/brief``.

    Keyword-only to match Backend routes. Uses fixtures when ``LLM_MOCK=true``
    or no API key. Returns a plain dict matching ``GeoNewsBrief`` (+ ``mock``).
    """
    place = resolve_place(lat=lat, lon=lon, place_name=place_name, conn=conn)
    ctx = load_place_context(
        conn,
        lat=place["lat"],
        lon=place["lon"],
        radius_km=radius_km,
        window=window,
    )

    if should_use_mock():
        brief = brief_for_place(
            lat=place["lat"],
            lon=place["lon"],
            place_name=place_name or place["name"],
            window=window,
        )
        data = brief.model_dump()
        data["mock"] = True
        return data

    events = ctx["events"]
    incidents = ctx["incidents"]
    sources = {e.get("source") for e in events} | {i.get("source") for i in incidents}
    user_content = "\n".join(
        [
            f"Place: {place_name or place['name']} ({place['lat']:.4f}, {place['lon']:.4f})",
            f"Radius_km: {radius_km}",
            f"Window: {window}",
            f"Sources seen: {sorted(s for s in sources if s)}",
            "Events:",
            *(event_summary_lines(events) or ["- (none)"]),
            "Incidents:",
            *(incident_summary_lines(incidents) or ["- (none)"]),
            "Produce a GeoNewsBrief. Do not invent official crime statistics.",
        ]
    )
    messages = [
        {"role": "system", "content": SYSTEM_PROMPT},
        {"role": "user", "content": user_content},
    ]
    result = structured_completion(messages, GeoNewsBrief)
    data = result.model_dump()
    data["mock"] = False
    return data
