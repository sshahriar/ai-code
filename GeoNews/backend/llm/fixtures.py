"""Deterministic LLM fixtures for mock / no-key mode.

Never invent official crime statistics. Sample / GDELT-only data is labeled
honestly in caveats.
"""

from __future__ import annotations

from llm.models import ChatResponse, GeoNewsBrief, WatchlistChange

# Rough centroids for fixture routing (degrees).
DHAKA = (23.8103, 90.4125)
LONDON = (51.5074, -0.1278)

_PLACE_MATCH_KM = 80.0


def _haversine_km(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    from math import asin, cos, radians, sin, sqrt

    r = 6371.0
    dlat = radians(lat2 - lat1)
    dlon = radians(lon2 - lon1)
    a = (
        sin(dlat / 2) ** 2
        + cos(radians(lat1)) * cos(radians(lat2)) * sin(dlon / 2) ** 2
    )
    return 2 * r * asin(sqrt(a))


def resolve_fixture_place(
    lat: float | None = None,
    lon: float | None = None,
    place_name: str | None = None,
) -> str:
    """Return ``dhaka``, ``london``, or ``default`` for fixture selection."""
    if place_name:
        lowered = place_name.strip().lower()
        if "dhaka" in lowered or "dhanmondi" in lowered or "bangladesh" in lowered:
            return "dhaka"
        if "london" in lowered or "uk" == lowered or "united kingdom" in lowered:
            return "london"

    if lat is not None and lon is not None:
        if _haversine_km(lat, lon, *DHAKA) <= _PLACE_MATCH_KM:
            return "dhaka"
        if _haversine_km(lat, lon, *LONDON) <= _PLACE_MATCH_KM:
            return "london"

    return "default"


def dhaka_brief(window: str = "72h") -> GeoNewsBrief:
    return GeoNewsBrief(
        place_name="Dhaka",
        window=window,
        headline="Local news activity around Dhaka; no official crime feed",
        risk_level="moderate",
        bullets=[
            "Sample demo incidents are seeded near Dhaka for map testing — not police reports.",
            "Recent headlines (when present) are news / GDELT proxies, not official crime stats.",
            "Treat severity as OSINT triage, not a conviction or government crime rate.",
        ],
        caveats=[
            "Official crime feed unavailable for Bangladesh; Police.uk does not cover BD.",
            "Using news + DEMO SAMPLE points only — do not invent official crime statistics.",
            "Figures are illustrative for the GeoNews demo, not real crime rates.",
        ],
    )


def london_brief(window: str = "72h") -> GeoNewsBrief:
    return GeoNewsBrief(
        place_name="London",
        window=window,
        headline="UK open data may apply; news proxies still unverified",
        risk_level="low",
        bullets=[
            "Police.uk open data can cover England/Wales street-level categories when ingested.",
            "News and GDELT rows remain unverified OSINT — not official crime totals.",
            "No fabricated city-wide crime rates are included in this mock brief.",
        ],
        caveats=[
            "Mock mode: this brief is a deterministic fixture, not a live model call.",
            "Do not treat sample or news counts as official UK crime statistics.",
            "Police.uk categories are open data indicators, not convictions.",
        ],
    )


def default_brief(
    window: str = "72h",
    place_name: str = "Selected area",
) -> GeoNewsBrief:
    return GeoNewsBrief(
        place_name=place_name,
        window=window,
        headline="Limited local context in mock mode",
        risk_level="unknown",
        bullets=[
            "No place-specific fixture matched; returning a cautious default brief.",
            "Available signals would be news / sample layers only until live ingest runs.",
            "No official crime statistics are asserted for this location.",
        ],
        caveats=[
            "Mock / no-key mode: deterministic fixture only.",
            "Never invent coordinates or official crime statistics.",
            "If only sample or GDELT proxies exist, treat them as unverified.",
        ],
    )


def brief_for_place(
    *,
    lat: float | None = None,
    lon: float | None = None,
    place_name: str | None = None,
    window: str = "72h",
) -> GeoNewsBrief:
    key = resolve_fixture_place(lat, lon, place_name)
    if key == "dhaka":
        return dhaka_brief(window)
    if key == "london":
        return london_brief(window)
    name = place_name.strip() if place_name and place_name.strip() else "Selected area"
    return default_brief(window=window, place_name=name)


def chat_fixture(
    message: str,
    *,
    lat: float | None = None,
    lon: float | None = None,
    place_name: str | None = None,
    window: str = "72h",
) -> ChatResponse:
    """Deterministic chat response with a place brief and optional watchlist hint."""
    brief = brief_for_place(lat=lat, lon=lon, place_name=place_name, window=window)
    key = resolve_fixture_place(lat, lon, place_name)
    lowered = (message or "").lower()

    watchlist_changes: list[WatchlistChange] = []
    if "add" in lowered and "watchlist" in lowered:
        if "london" in lowered:
            watchlist_changes.append(
                WatchlistChange(name="London", lat=LONDON[0], lon=LONDON[1], action="add")
            )
        elif "dhaka" in lowered:
            watchlist_changes.append(
                WatchlistChange(name="Dhaka", lat=DHAKA[0], lon=DHAKA[1], action="add")
            )
    if "remove" in lowered and "watchlist" in lowered:
        for name in ("London", "Dhaka", "New York", "Tokyo"):
            if name.lower() in lowered:
                watchlist_changes.append(
                    WatchlistChange(name=name, action="remove")
                )
                break

    if key == "dhaka":
        reply = (
            f"GeoNews Analyst (mock): Around {brief.place_name}, we only have news/"
            "sample signals — not official Bangladeshi crime statistics. "
            f"{brief.headline}"
        )
    elif key == "london":
        reply = (
            f"GeoNews Analyst (mock): For {brief.place_name}, open UK data may apply "
            "when ingested, but this fixture does not invent crime rates. "
            f"{brief.headline}"
        )
    else:
        reply = (
            f"GeoNews Analyst (mock): Limited context for {brief.place_name}. "
            "No official crime statistics are claimed. "
            f"{brief.headline}"
        )

    return ChatResponse(
        message=reply,
        brief=brief,
        watchlist_changes=watchlist_changes,
        highlight_event_ids=[],
    )


# Phrases that would indicate invented official crime stats — mocks must avoid these.
FORBIDDEN_CRIME_STAT_PATTERNS = (
    "official crime rate",
    "crime rate of",
    "crimes per 1000",
    "crimes per 1,000",
    "murder rate of",
    "reported a % increase in official",
    "police recorded total of",
    "official police statistics show",
    "bd crime bureau reports",
    "national crime statistics confirm",
)
