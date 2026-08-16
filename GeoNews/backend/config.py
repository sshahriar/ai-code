"""Environment configuration for the GeoNews FastAPI backend."""

from __future__ import annotations

import os
from functools import lru_cache
from pathlib import Path

from dotenv import load_dotenv

# backend/ → project root
PROJECT_ROOT = Path(__file__).resolve().parents[1]
load_dotenv(PROJECT_ROOT / ".env")


def _env_bool(name: str, default: bool = False) -> bool:
    raw = os.getenv(name)
    if raw is None:
        return default
    return raw.strip().lower() in {"1", "true", "yes", "on"}


@lru_cache(maxsize=1)
def get_settings() -> "Settings":
    return Settings()


class Settings:
    def __init__(self) -> None:
        self.ingest_mock: bool = _env_bool("INGEST_MOCK", False)
        self.llm_mock: bool = _env_bool("LLM_MOCK", False)
        self.guardian_api_key: str = (os.getenv("GUARDIAN_API_KEY") or "").strip()
        self.openrouter_api_key: str = (os.getenv("OPENROUTER_API_KEY") or "").strip()
        self.nominatim_user_agent: str = (
            os.getenv("NOMINATIM_USER_AGENT")
            or "GeoNews/0.1 (student-project; contact: local)"
        ).strip()
        self.ingest_interval_seconds: int = int(
            os.getenv("INGEST_INTERVAL_SECONDS") or "900"
        )
        self.ingest_manual_cooldown_seconds: int = int(
            os.getenv("INGEST_MANUAL_COOLDOWN_SECONDS") or "30"
        )
        self.host: str = (os.getenv("HOST") or "0.0.0.0").strip()
        self.port: int = int(os.getenv("PORT") or "8000")
