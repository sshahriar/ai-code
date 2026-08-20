"""GET /api/health"""

from __future__ import annotations

from fastapi import APIRouter

from config import get_settings
from llm.client import llm_status as llm_runtime_status

router = APIRouter(tags=["system"])


@router.get("/api/health")
def health() -> dict:
    settings = get_settings()
    llm_status = llm_runtime_status()
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
