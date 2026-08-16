"""GET /api/health"""

from __future__ import annotations

from fastapi import APIRouter

from config import get_settings

router = APIRouter(tags=["system"])


@router.get("/api/health")
def health() -> dict:
    settings = get_settings()
    llm_status = "mock" if (settings.llm_mock or not settings.openrouter_api_key) else "ok"
    # Free sources assumed reachable when not forced mock; degraded when mock-only.
    if settings.ingest_mock:
        gdelt = "degraded"
        police = "degraded"
        nominatim = "ok"
    else:
        gdelt = "ok"
        police = "ok"
        nominatim = "ok"
    return {
        "ok": True,
        "sources": {
            "gdelt": gdelt,
            "nominatim": nominatim,
            "llm": llm_status,
            "police_uk": police,
        },
    }
