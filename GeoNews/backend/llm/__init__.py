"""LLM surface for FastAPI thin wrappers.

Stable imports (do not rename):

    from llm import generate_brief, handle_chat
"""

from __future__ import annotations

from llm.brief import generate_brief
from llm.chat import handle_chat
from llm.classify import classify_rules, classify_text
from llm.client import MODEL, EXTRA_BODY, llm_status, should_use_mock
from llm.models import ChatResponse, ClassifyResult, GeoNewsBrief, WatchlistChange

__all__ = [
    "MODEL",
    "EXTRA_BODY",
    "ChatResponse",
    "ClassifyResult",
    "GeoNewsBrief",
    "WatchlistChange",
    "classify_rules",
    "classify_text",
    "generate_brief",
    "handle_chat",
    "llm_status",
    "should_use_mock",
]
