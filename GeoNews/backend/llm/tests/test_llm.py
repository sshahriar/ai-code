"""Unit tests for GeoNews LLM package (mock path + structured models)."""

from __future__ import annotations

import json
import os
from pathlib import Path

import pytest
from pydantic import ValidationError

from llm.brief import generate_brief
from llm.chat import handle_chat
from llm.classify import classify_rules, classify_text
from llm.client import should_use_mock
from llm.fixtures import (
    FORBIDDEN_CRIME_STAT_PATTERNS,
    brief_for_place,
    chat_fixture,
    resolve_fixture_place,
)
from llm.models import ChatResponse, ClassifyResult, GeoNewsBrief, WatchlistChange


@pytest.fixture(autouse=True)
def _force_mock(monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.setenv("LLM_MOCK", "true")
    monkeypatch.delenv("OPENROUTER_API_KEY", raising=False)


def test_should_use_mock_when_flag_or_missing_key(monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.setenv("LLM_MOCK", "true")
    assert should_use_mock() is True

    monkeypatch.setenv("LLM_MOCK", "false")
    monkeypatch.delenv("OPENROUTER_API_KEY", raising=False)
    # Reload path: client caches env load but should_use_mock re-reads os.environ
    assert should_use_mock() is True

    monkeypatch.setenv("OPENROUTER_API_KEY", "sk-test")
    monkeypatch.setenv("LLM_MOCK", "false")
    assert should_use_mock() is False


def test_parse_geonews_brief_structured_output() -> None:
    payload = {
        "place_name": "Dhaka",
        "window": "72h",
        "headline": "Cautious local summary",
        "risk_level": "moderate",
        "bullets": ["Sample points only"],
        "caveats": ["Official crime feed unavailable for BD"],
    }
    brief = GeoNewsBrief.model_validate(payload)
    assert brief.risk_level == "moderate"
    roundtrip = GeoNewsBrief.model_validate_json(brief.model_dump_json())
    assert roundtrip.place_name == "Dhaka"


def test_parse_chat_response_structured_output() -> None:
    raw = json.dumps(
        {
            "message": "Here is a cautious update.",
            "brief": {
                "place_name": "London",
                "window": "24h",
                "headline": "Open data may apply",
                "risk_level": "low",
                "bullets": ["No invented rates"],
                "caveats": ["Mock fixture"],
            },
            "watchlist_changes": [
                {"name": "London", "lat": 51.5, "lon": -0.12, "action": "add"}
            ],
            "highlight_event_ids": ["abc-123"],
        }
    )
    resp = ChatResponse.model_validate_json(raw)
    assert resp.brief is not None
    assert resp.watchlist_changes[0].action == "add"
    assert resp.highlight_event_ids == ["abc-123"]


def test_reject_invalid_risk_level() -> None:
    with pytest.raises(ValidationError):
        GeoNewsBrief(
            place_name="X",
            window="72h",
            headline="h",
            risk_level="critical",
            bullets=[],
            caveats=[],
        )


def test_reject_invalid_watchlist_action() -> None:
    with pytest.raises(ValidationError):
        WatchlistChange(name="Dhaka", action="nuke")


def test_fixture_place_routing() -> None:
    assert resolve_fixture_place(23.81, 90.41) == "dhaka"
    assert resolve_fixture_place(51.50, -0.12) == "london"
    assert resolve_fixture_place(place_name="Dhanmondi") == "dhaka"
    assert resolve_fixture_place(0.0, 0.0) == "default"


def test_mock_briefs_for_dhaka_london_default() -> None:
    dhaka = brief_for_place(lat=23.81, lon=90.41, window="72h")
    london = brief_for_place(lat=51.5, lon=-0.12, window="24h")
    other = brief_for_place(lat=1.0, lon=1.0, place_name="Nairobi", window="7d")

    assert dhaka.place_name == "Dhaka"
    assert london.place_name == "London"
    assert other.place_name == "Nairobi"
    assert other.risk_level == "unknown"
    assert any("Official crime feed unavailable" in c for c in dhaka.caveats)
    assert any("DEMO SAMPLE" in b or "sample" in b.lower() for b in dhaka.bullets)


def _blob_text(obj: object) -> str:
    return json.dumps(obj if isinstance(obj, dict) else obj.model_dump()).lower()


def test_mock_fixtures_reject_invented_crime_stats() -> None:
    briefs = [
        brief_for_place(lat=23.81, lon=90.41),
        brief_for_place(lat=51.5, lon=-0.12),
        brief_for_place(lat=0.0, lon=0.0, place_name="Somewhere"),
        chat_fixture("What is the crime rate?", lat=23.81, lon=90.41),
        chat_fixture("Summarize London", lat=51.5, lon=-0.12),
    ]
    for item in briefs:
        text = _blob_text(item)
        for pattern in FORBIDDEN_CRIME_STAT_PATTERNS:
            assert pattern not in text, f"found forbidden pattern {pattern!r}"
        # Positive honesty checks
        assert "official" in text or "sample" in text or "mock" in text


def test_generate_brief_and_handle_chat_mock_dicts() -> None:
    brief = generate_brief(lat=23.8103, lon=90.4125, radius_km=25, window="72h")
    assert isinstance(brief, dict)
    assert brief["place_name"] == "Dhaka"
    assert brief["mock"] is True
    assert brief["risk_level"] in ("low", "moderate", "high", "unknown")
    GeoNewsBrief.model_validate({k: v for k, v in brief.items() if k != "mock"})

    chat = handle_chat(
        message="Add London to watchlist",
        lat=23.81,
        lon=90.41,
        place_name="Dhaka",
    )
    assert isinstance(chat, dict)
    assert chat["mock"] is True
    parsed = ChatResponse.model_validate({k: v for k, v in chat.items() if k != "mock"})
    assert parsed.brief is not None
    assert any(c.action == "add" and c.name == "London" for c in parsed.watchlist_changes)


def test_classify_rules_keywords_and_police() -> None:
    shooting = classify_rules("Fatal shooting downtown", "Police investigate")
    assert shooting["category"] == "crime"
    assert 1 <= shooting["severity"] <= 5

    flood = classify_rules("Severe flood hits coast", "")
    assert flood["category"] == "disaster"

    police = classify_rules(
        "anti-social-behaviour",
        source="police_uk",
        police_category="anti-social-behaviour",
    )
    assert police["category"] == "crime"
    assert police["severity"] == 1

    unmatched = classify_rules("Sunny afternoon picnic", "")
    assert unmatched["category"] == "other"
    assert unmatched["severity"] is None


def test_classify_text_mock_unmatched() -> None:
    result = classify_text("Completely bland headline with no cues")
    assert result == {
        "category": "other",
        "severity": 2,
        "rationale": "rules-unmatched",
    }
    ClassifyResult.model_validate(result)


def test_handle_chat_empty_context_caveat() -> None:
    chat = handle_chat(
        message="Brief this place",
        lat=22.3569,
        lon=91.7832,
        place_name="Chattogram",
        window="24h",
    )
    blob = json.dumps(chat).lower()
    assert "no news" in blob or "limited context" in blob
    assert chat["brief"] is not None
    caveats = " ".join(chat["brief"]["caveats"]).lower()
    assert "no news" in caveats or "limited context" in caveats


def test_handle_chat_live_includes_place_events(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
) -> None:
    monkeypatch.setenv("LLM_MOCK", "false")
    monkeypatch.setenv("OPENROUTER_API_KEY", "sk-test")

    from datetime import datetime, timezone

    from db import init_db, upsert_event
    from llm.models import ChatResponse, GeoNewsBrief

    db_file = tmp_path / "chat_ctx.db"
    conn = init_db(db_file, seed=False)
    now = datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")
    upsert_event(
        conn,
        {
            "source": "rss",
            "external_id": "https://news.example.com/ctg-llm-1",
            "title": "Chattogram port congestion eases",
            "category": "economy",
            "severity": 2,
            "lat": 22.3569,
            "lon": 91.7832,
            "place_name": "Chattogram",
            "occurred_at": now,
        },
    )
    captured: dict[str, str] = {}

    def _fake_completion(messages, _model, **_kwargs):
        captured["prompt"] = messages[1]["content"]
        return ChatResponse(
            message="Port delays are easing around Chattogram.",
            brief=GeoNewsBrief(
                place_name="Chattogram",
                window="72h",
                headline="Port congestion easing",
                risk_level="low",
                bullets=["RSS headline mentions Chattogram port congestion."],
                caveats=["News proxies only; not official statistics."],
            ),
            watchlist_changes=[],
            highlight_event_ids=[],
        )

    monkeypatch.setattr("llm.chat.structured_completion", _fake_completion)
    try:
        out = handle_chat(
            message="Brief this place",
            lat=22.3569,
            lon=91.7832,
            place_name="Chattogram",
            conn=conn,
            window="7d",
        )
    finally:
        conn.close()

    assert out["mock"] is False
    assert "Chattogram port congestion eases" in captured["prompt"]
    assert "Chattogram" in captured["prompt"]
    assert "sk-or" not in json.dumps(out)


def test_no_crash_without_api_key(monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.delenv("OPENROUTER_API_KEY", raising=False)
    monkeypatch.setenv("LLM_MOCK", "false")
    # Missing key → mock path, must not raise
    out = generate_brief(lat=23.81, lon=90.41)
    assert out["place_name"] == "Dhaka"
    assert out["mock"] is True
    chat = handle_chat(message="hello", place_name="London")
    assert "message" in chat
    assert chat["mock"] is True
