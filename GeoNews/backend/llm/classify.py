"""Rules-first event classification with optional LLM fallback."""

from __future__ import annotations

import re
from typing import Any

from llm.client import SYSTEM_PROMPT, should_use_mock, structured_completion
from llm.models import ClassifyResult

CATEGORIES = (
    "crime",
    "conflict",
    "disaster",
    "politics",
    "health",
    "economy",
    "other",
)

_KEYWORD_BUCKETS: list[tuple[str, tuple[str, ...], int]] = [
    (
        "crime",
        (
            "murder",
            "homicide",
            "shooting",
            "robbery",
            "theft",
            "rape",
            "assault",
            "arrest",
            "police",
            "stabbing",
            "kidnapping",
        ),
        3,
    ),
    (
        "conflict",
        (
            "war",
            "airstrike",
            "missile",
            "troop",
            "ceasefire",
            "invasion",
            "militant",
            "shelling",
        ),
        4,
    ),
    (
        "disaster",
        (
            "earthquake",
            "flood",
            "cyclone",
            "hurricane",
            "wildfire",
            "tsunami",
            "landslide",
            "eruption",
        ),
        4,
    ),
    (
        "politics",
        (
            "election",
            "parliament",
            "minister",
            "protest",
            "vote",
            "coalition",
            "impeach",
        ),
        2,
    ),
    (
        "health",
        ("outbreak", "dengue", "cholera", "hospital", "epidemic", "vaccine"),
        3,
    ),
    (
        "economy",
        (
            "inflation",
            "recession",
            "stock",
            "bank",
            "tariff",
            "unemployment",
        ),
        2,
    ),
]

# CAMEO two-digit root → (category, base severity)
_CAMEO_ROOT: dict[str, tuple[str, int]] = {
    "18": ("conflict", 5),
    "19": ("conflict", 5),
    "20": ("conflict", 4),
    "17": ("conflict", 3),
    "14": ("politics", 2),
    "13": ("conflict", 3),
    "15": ("conflict", 3),
    "16": ("conflict", 3),
    "02": ("politics", 1),
    "03": ("politics", 2),
    "04": ("politics", 2),
}


def _clamp_sev(value: int) -> int:
    return max(1, min(5, value))


def _cameo_root(cameo: str | int | None) -> str | None:
    if cameo is None:
        return None
    digits = re.sub(r"\D", "", str(cameo))
    if len(digits) < 2:
        return None
    return digits[:2]


def _apply_tone(severity: int, tone: float | None, cameo_root: str | None) -> int:
    if tone is None:
        return severity
    sev = severity
    if tone <= -8:
        sev = max(sev, 4)
    elif tone <= -4:
        sev = max(sev, 3)
    if tone >= 2 and cameo_root not in ("18", "19", "20"):
        sev = min(sev, 3)
    return _clamp_sev(sev)


def _police_uk_severity(category: str | None) -> int:
    text = (category or "").lower()
    if any(k in text for k in ("violence", "weapon", "robbery", "sexual")):
        return 4
    if any(k in text for k in ("theft", "burglary", "shoplift")):
        return 2
    if "anti-social" in text or "antisocial" in text:
        return 1
    return 2


def classify_rules(
    title: str,
    summary: str = "",
    *,
    cameo: str | int | None = None,
    tone: float | None = None,
    source: str | None = None,
    police_category: str | None = None,
) -> dict[str, Any]:
    """
    Rules-only classifier. Unmatched text → ``category=other``, ``severity=None``.
    """
    if (source or "").lower() == "police_uk":
        sev = _police_uk_severity(police_category or title)
        return {
            "category": "crime",
            "severity": sev,
            "rationale": "source: police_uk",
        }

    text = f"{title} {summary}".lower()
    root = _cameo_root(cameo)

    for category, keywords, base_sev in _KEYWORD_BUCKETS:
        for kw in keywords:
            if kw in text:
                # CAMEO 18–20 with crime keywords → prefer crime
                cat = category
                if root in ("18", "19", "20") and category == "conflict":
                    if any(
                        c_kw in text
                        for c_kw in _KEYWORD_BUCKETS[0][1]  # crime keywords
                    ):
                        cat = "crime"
                sev = _apply_tone(base_sev, tone, root)
                return {
                    "category": cat,
                    "severity": sev,
                    "rationale": f"keyword: {kw}",
                }

    if root and root in _CAMEO_ROOT:
        cat, base = _CAMEO_ROOT[root]
        if root in ("18", "19", "20") and any(
            kw in text for kw in _KEYWORD_BUCKETS[0][1]
        ):
            cat = "crime"
        sev = _apply_tone(base, tone, root)
        return {
            "category": cat,
            "severity": sev,
            "rationale": f"cameo_root: {root}",
        }

    return {
        "category": "other",
        "severity": None,
        "rationale": "rules-unmatched",
    }


def classify_text(
    title: str,
    summary: str = "",
    *,
    cameo: str | int | None = None,
    tone: float | None = None,
    source: str | None = None,
    police_category: str | None = None,
    use_llm_fallback: bool = True,
) -> dict[str, Any]:
    """
    Classify title/summary → ``{category, severity, rationale}``.

    Rules first. LLM fallback only when rules yield ``other`` with unknown severity.
    Under ``LLM_MOCK`` / no key, unmatched stays ``other`` / ``2`` / ``rules-unmatched``.
    """
    result = classify_rules(
        title,
        summary,
        cameo=cameo,
        tone=tone,
        source=source,
        police_category=police_category,
    )
    if result["category"] != "other" or result["severity"] is not None:
        if result["severity"] is None:
            result["severity"] = 2
        return result

    if not use_llm_fallback or should_use_mock():
        return {
            "category": "other",
            "severity": 2,
            "rationale": "rules-unmatched",
        }

    messages = [
        {"role": "system", "content": SYSTEM_PROMPT},
        {
            "role": "user",
            "content": (
                "Classify this news item into category and severity 1-5.\n"
                f"Title: {title}\nSummary: {summary}\n"
                "Never label as official crime unless source is police_uk."
            ),
        },
    ]
    parsed = structured_completion(messages, ClassifyResult)
    return parsed.model_dump()
