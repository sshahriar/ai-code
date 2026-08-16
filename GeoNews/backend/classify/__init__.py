"""Rule-based event classification (plan + geonews-classify skill)."""

from __future__ import annotations

import re
from typing import Any

CATEGORIES = (
    "crime",
    "conflict",
    "disaster",
    "politics",
    "health",
    "economy",
    "other",
)

_KEYWORD_BUCKETS: list[tuple[str, tuple[str, ...]]] = [
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
    ),
    (
        "health",
        ("outbreak", "dengue", "cholera", "hospital", "epidemic", "vaccine"),
    ),
    (
        "economy",
        ("inflation", "recession", "stock", "bank", "tariff", "unemployment"),
    ),
]

# CAMEO two-digit root → (category, base_severity)
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

_POLICE_SEVERITY: list[tuple[tuple[str, ...], int]] = [
    (("violence", "weapon", "violent"), 4),
    (("theft", "burglary", "robbery", "shoplift"), 2),
    (("anti-social", "antisocial", "asb"), 1),
]


def _cameo_root(cameo: str | int | None) -> str | None:
    if cameo is None:
        return None
    digits = re.sub(r"\D", "", str(cameo))
    if len(digits) < 2:
        return None
    return digits[:2]


def _keyword_hit(text: str) -> tuple[str, str] | None:
    lowered = text.lower()
    for category, words in _KEYWORD_BUCKETS:
        for word in words:
            if word in lowered:
                return category, f"keyword: {word}"
    return None


def _nudge_severity(severity: int, tone: float | None, cameo_root: str | None) -> int:
    if tone is None:
        return max(1, min(5, severity))
    sev = severity
    if tone <= -8:
        sev = max(sev, 4)
    elif tone <= -4:
        sev = max(sev, 3)
    if tone >= 2 and cameo_root not in {"18", "19", "20"}:
        sev = min(sev, 3)
    return max(1, min(5, sev))


def classify_police_uk(category_str: str | None) -> dict[str, Any]:
    """Police.uk rows are always crime; severity from category string."""
    text = (category_str or "").lower()
    severity = 2
    rationale = "police_uk default"
    for needles, sev in _POLICE_SEVERITY:
        if any(n in text for n in needles):
            severity = sev
            rationale = f"police_uk category: {category_str}"
            break
    return {"category": "crime", "severity": severity, "rationale": rationale}


def classify_text(
    title: str | None = None,
    summary: str | None = None,
    *,
    cameo: str | int | None = None,
    tone: float | None = None,
    source: str | None = None,
    police_category: str | None = None,
) -> dict[str, Any]:
    """
    Map title/summary (+ optional GDELT fields) to category + severity 1–5.

    Never labels official crime unless ``source == "police_uk"``.
    """
    if source == "police_uk":
        return classify_police_uk(police_category)

    text = f"{title or ''} {summary or ''}".strip()
    root = _cameo_root(cameo)
    hit = _keyword_hit(text) if text else None

    category = "other"
    severity = 2
    rationale = "rules-unmatched"

    if hit:
        category, rationale = hit
        severity = 3
        if category == "conflict":
            severity = 4
        elif category == "disaster":
            severity = 3
        elif category in ("politics", "economy"):
            severity = 2

    if root and root in _CAMEO_ROOT:
        cameo_cat, base_sev = _CAMEO_ROOT[root]
        if category == "other":
            category = cameo_cat
            severity = base_sev
            rationale = f"cameo root: {root}"
        elif category == "crime" and cameo_cat == "conflict":
            # keep crime if keywords matched
            severity = max(severity, base_sev - 1)
        else:
            severity = max(severity, base_sev)
            rationale = f"{rationale}; cameo root: {root}"

    severity = _nudge_severity(severity, tone, root)
    if category not in CATEGORIES:
        category = "other"
    return {"category": category, "severity": severity, "rationale": rationale}
