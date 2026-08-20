"""LiteLLM → OpenRouter (Cerebras) client helpers."""

from __future__ import annotations

import os
from pathlib import Path
from typing import Any, TypeVar

from pydantic import BaseModel

MODEL = "openrouter/openai/gpt-oss-120b"
EXTRA_BODY = {"provider": {"order": ["cerebras"]}}

SYSTEM_PROMPT = (
    "You are GeoNews Analyst. Be concise, sourced, and honest about uncertainty. "
    "Never invent coordinates or official crime statistics. "
    "If data is sample or GDELT-only, say so in caveats. "
    "Allowed side effects in structured chat: watchlist add/remove only. "
    "Return valid structured JSON in one shot. No token streaming."
)

T = TypeVar("T", bound=BaseModel)

# backend/llm/client.py → parents[2] = GeoNews project root
_PROJECT_ROOT = Path(__file__).resolve().parents[2]
_ENV_LOADED = False
_DOTENV_VALUES: dict[str, str] = {}


def _parse_dotenv() -> dict[str, str]:
    env_path = _PROJECT_ROOT / ".env"
    if not env_path.is_file():
        return {}
    values: dict[str, str] = {}
    for raw in env_path.read_text(encoding="utf-8").splitlines():
        line = raw.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, _, value = line.partition("=")
        key = key.strip()
        value = value.strip().strip("'").strip('"')
        if key:
            values[key] = value
    return values


def load_project_env() -> None:
    """Load project-root ``.env``. Pytest owns env vars and must not inherit secrets."""
    global _ENV_LOADED, _DOTENV_VALUES
    if _ENV_LOADED:
        return
    _ENV_LOADED = True
    _DOTENV_VALUES = _parse_dotenv()
    if os.environ.get("PYTEST_CURRENT_TEST"):
        return
    for key, value in _DOTENV_VALUES.items():
        # Fill missing *or empty* process vars so a blank shell key cannot hide .env.
        if not (os.environ.get(key) or "").strip():
            os.environ[key] = value


def get_openrouter_api_key() -> str | None:
    load_project_env()
    key = (os.environ.get("OPENROUTER_API_KEY") or "").strip()
    if key:
        return key
    if os.environ.get("PYTEST_CURRENT_TEST"):
        return None
    return (_DOTENV_VALUES.get("OPENROUTER_API_KEY") or "").strip() or None


def should_use_mock() -> bool:
    """True when ``LLM_MOCK`` is set or ``OPENROUTER_API_KEY`` is missing."""
    load_project_env()
    flag = (os.environ.get("LLM_MOCK") or "").strip().lower()
    if flag in ("1", "true", "yes", "on"):
        return True
    return get_openrouter_api_key() is None


def llm_status() -> str:
    """Health-friendly status: ``mock`` | ``ok`` (key present, not forced mock)."""
    if should_use_mock():
        return "mock"
    return "ok"


def structured_completion(
    messages: list[dict[str, str]],
    response_model: type[T],
    *,
    reasoning_effort: str = "low",
) -> T:
    """
    Call LiteLLM with Cerebras provider order and parse structured JSON.

    Raises on transport / validation errors (callers should catch for routes).
    """
    from litellm import completion

    api_key = get_openrouter_api_key()
    if not api_key:
        raise RuntimeError("OPENROUTER_API_KEY missing; use mock path instead")

    # LiteLLM OpenRouter: pass the key explicitly so an empty process env cannot
    # mask the project .env value, and so we never rely on OPENAI_API_KEY.
    os.environ["OPENROUTER_API_KEY"] = api_key

    response = completion(
        model=MODEL,
        messages=messages,
        response_format=response_model,
        reasoning_effort=reasoning_effort,
        extra_body=EXTRA_BODY,
        api_key=api_key,
    )
    content = getattr(response.choices[0].message, "content", None)
    if not content:
        parsed = getattr(response.choices[0].message, "parsed", None)
        if isinstance(parsed, response_model):
            return parsed
        raise RuntimeError("Empty LLM response content")
    return response_model.model_validate_json(_extract_json_text(str(content)))


def _extract_json_text(content: str) -> str:
    """Strip markdown fences so Pydantic can parse a JSON object."""
    text = content.strip()
    if text.startswith("```"):
        lines = text.split("\n")
        lines = lines[1:]
        if lines and lines[-1].strip().startswith("```"):
            lines = lines[:-1]
        text = "\n".join(lines).strip()
    start = text.find("{")
    end = text.rfind("}")
    if start != -1 and end != -1 and end > start:
        return text[start : end + 1]
    return text


def ensure_system(messages: list[dict[str, str]]) -> list[dict[str, str]]:
    """Prepend GeoNews Analyst system message if missing."""
    if messages and messages[0].get("role") == "system":
        return messages
    return [{"role": "system", "content": SYSTEM_PROMPT}, *messages]


def event_summary_lines(events: list[dict[str, Any]], limit: int = 12) -> list[str]:
    lines: list[str] = []
    for ev in events[:limit]:
        title = (ev.get("title") or "").strip() or "(untitled)"
        cat = ev.get("category") or "other"
        src = ev.get("source") or "?"
        sev = ev.get("severity")
        eid = ev.get("id") or ""
        lines.append(f"- [{src}/{cat}/sev={sev}] {title} (id={eid})")
    return lines


def incident_summary_lines(incidents: list[dict[str, Any]], limit: int = 12) -> list[str]:
    lines: list[str] = []
    for inc in incidents[:limit]:
        src = inc.get("source") or "?"
        cat = inc.get("category") or "?"
        place = inc.get("place_name") or ""
        lines.append(f"- [{src}] {cat} @ {place}")
    if any((i.get("source") == "sample") for i in incidents):
        lines.append(
            "NOTE: sample incidents are DEMO ONLY — not official crime statistics."
        )
    return lines
