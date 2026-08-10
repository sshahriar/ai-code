"""Unit tests for FinAlly LLM integration, mock mode, auto-execution, and FastAPI chat endpoint."""

from __future__ import annotations

import os
from unittest.mock import AsyncMock, MagicMock, patch

import pytest
from fastapi.testclient import TestClient

from app.db.database import get_db_connection, init_db
from app.main import app
from app.market.cache import PriceCache
from app.services.llm_service import (
    build_system_prompt,
    call_openrouter_api,
    clean_and_parse_json,
    generate_mock_response,
    get_chat_history,
    is_mock_mode,
    process_chat,
)
from app.services.portfolio_service import execute_trade, get_portfolio_context, get_positions, get_user_profile
from app.services.watchlist_service import get_watchlist


@pytest.fixture
def tmp_db_path(tmp_path):
    """Provide a temporary SQLite database file path initialized with tables and seed data."""
    db_file = str(tmp_path / "test_finally.db")
    init_db(db_file)
    return db_file


@pytest.fixture
def price_cache():
    """Provide a PriceCache seeded with test prices."""
    cache = PriceCache()
    cache.update("AAPL", 190.00)
    cache.update("GOOGL", 175.00)
    cache.update("MSFT", 420.00)
    cache.update("TSLA", 250.00)
    cache.update("PYPL", 65.00)
    return cache


def test_is_mock_mode(monkeypatch):
    """Test LLM_MOCK env var logic and missing API key check."""
    monkeypatch.setenv("LLM_MOCK", "true")
    monkeypatch.setenv("OPENROUTER_API_KEY", "some-key")
    assert is_mock_mode() is True

    monkeypatch.setenv("LLM_MOCK", "false")
    monkeypatch.setenv("OPENROUTER_API_KEY", "")
    assert is_mock_mode() is True

    monkeypatch.setenv("LLM_MOCK", "false")
    monkeypatch.setenv("OPENROUTER_API_KEY", "sk-or-v1-12345")
    assert is_mock_mode() is False


def test_build_system_prompt():
    """Test system prompt formatting with portfolio context."""
    context = {
        "cash_balance": 8500.50,
        "total_positions_value": 1500.00,
        "total_portfolio_value": 10000.50,
        "positions": [
            {
                "ticker": "AAPL",
                "quantity": 10.0,
                "avg_cost": 150.00,
                "current_price": 190.00,
                "unrealized_pnl": 400.00,
                "unrealized_pnl_pct": 26.67,
            }
        ],
        "watchlist": [
            {"ticker": "AAPL", "price": 190.00},
            {"ticker": "PYPL", "price": 65.00},
        ],
    }
    prompt = build_system_prompt(context)
    assert "FinAlly" in prompt
    assert "$8,500.50" in prompt
    assert "$10,000.50" in prompt
    assert "AAPL: 10.0 shares" in prompt
    assert "STRICT JSON OUTPUT REQUIREMENT" in prompt


def test_clean_and_parse_json():
    """Test JSON parsing and markdown code fence stripping."""
    # 1. Plain JSON
    plain = '{"message": "Hello", "trades": [], "watchlist_changes": []}'
    res1 = clean_and_parse_json(plain)
    assert res1["message"] == "Hello"

    # 2. Markdown fenced JSON
    fenced = '```json\n{\n  "message": "Fenced",\n  "trades": [{"ticker": "AAPL", "side": "buy", "quantity": 5}]\n}\n```'
    res2 = clean_and_parse_json(fenced)
    assert res2["message"] == "Fenced"
    assert len(res2["trades"]) == 1
    assert res2["trades"][0]["ticker"] == "AAPL"

    # 3. Text containing embedded JSON block
    embedded = 'Here is the JSON output:\n{"message": "Embedded", "trades": []}\nHope this helps!'
    res3 = clean_and_parse_json(embedded)
    assert res3["message"] == "Embedded"

    # 4. Raw invalid JSON fallback
    invalid = "I cannot fulfill this request."
    res4 = clean_and_parse_json(invalid)
    assert res4["message"] == invalid
    assert res4["trades"] == []


def test_generate_mock_response():
    """Test deterministic mock generator for buy, sell, watchlist, and general queries."""
    context = {"cash_balance": 10000.0, "total_portfolio_value": 10000.0, "positions": []}

    # Buy query
    mock_buy = generate_mock_response("Buy 10 AAPL", context)
    assert len(mock_buy["trades"]) == 1
    assert mock_buy["trades"][0] == {"ticker": "AAPL", "side": "buy", "quantity": 10.0}

    # Sell query
    mock_sell = generate_mock_response("Sell 5 MSFT", context)
    assert len(mock_sell["trades"]) == 1
    assert mock_sell["trades"][0] == {"ticker": "MSFT", "side": "sell", "quantity": 5.0}

    # Watchlist add
    mock_add = generate_mock_response("Add PYPL to my watchlist", context)
    assert len(mock_add["watchlist_changes"]) == 1
    assert mock_add["watchlist_changes"][0] == {"ticker": "PYPL", "action": "add"}

    # Watchlist remove
    mock_remove = generate_mock_response("Remove AAPL from watchlist", context)
    assert len(mock_remove["watchlist_changes"]) == 1
    assert mock_remove["watchlist_changes"][0] == {"ticker": "AAPL", "action": "remove"}

    # General query
    mock_gen = generate_mock_response("How is my portfolio doing?", context)
    assert "FinAlly Assistant" in mock_gen["message"]
    assert mock_gen["trades"] == []


@pytest.mark.asyncio
async def test_process_chat_mock_buy_trade_auto_execution(tmp_db_path, price_cache, monkeypatch):
    """Test end-to-end chat flow for buying shares in mock mode with auto-execution and DB persistence."""
    monkeypatch.setenv("LLM_MOCK", "true")

    # Initial cash $10,000
    res = await process_chat(
        user_message="Buy 10 shares of AAPL",
        price_cache=price_cache,
        user_id="default",
        db_path=tmp_db_path,
    )

    assert "message" in res
    assert len(res["trades"]) == 1
    trade = res["trades"][0]
    assert trade["ticker"] == "AAPL"
    assert trade["side"] == "buy"
    assert trade["quantity"] == 10.0
    assert trade["status"] == "executed"
    assert trade["price"] == 190.00

    # Verify DB state: cash balance reduced by 10 * 190 = 1900 -> $8,100.00
    profile = get_user_profile("default", db_path=tmp_db_path)
    assert profile["cash_balance"] == 8100.00

    # Verify positions: 10 AAPL shares
    positions = get_positions("default", db_path=tmp_db_path)
    assert len(positions) == 1
    assert positions[0]["ticker"] == "AAPL"
    assert positions[0]["quantity"] == 10.0

    # Verify chat messages table contains user and assistant messages
    history = get_chat_history("default", db_path=tmp_db_path)
    assert len(history) == 2
    assert history[0]["role"] == "user"
    assert history[0]["content"] == "Buy 10 shares of AAPL"
    assert history[1]["role"] == "assistant"
    assert history[1]["actions"]["trades"][0]["ticker"] == "AAPL"


@pytest.mark.asyncio
async def test_process_chat_mock_sell_trade_auto_execution(tmp_db_path, price_cache, monkeypatch):
    """Test auto-executing sell trade after purchasing shares."""
    monkeypatch.setenv("LLM_MOCK", "true")

    # Buy 10 AAPL first via execute_trade helper
    execute_trade("AAPL", "buy", 10.0, price_cache=price_cache, user_id="default", db_path=tmp_db_path)

    # Now sell 5 AAPL via chat
    res = await process_chat(
        user_message="Sell 5 AAPL",
        price_cache=price_cache,
        user_id="default",
        db_path=tmp_db_path,
    )

    assert len(res["trades"]) == 1
    assert res["trades"][0]["side"] == "sell"
    assert res["trades"][0]["quantity"] == 5.0

    # Remaining position should be 5 shares
    positions = get_positions("default", db_path=tmp_db_path)
    assert len(positions) == 1
    assert positions[0]["quantity"] == 5.0


@pytest.mark.asyncio
async def test_process_chat_insufficient_cash_error_handling(tmp_db_path, price_cache, monkeypatch):
    """Test trade validation failure (insufficient cash) is handled gracefully with an error note."""
    monkeypatch.setenv("LLM_MOCK", "true")

    # Attempt buying 1000 AAPL ($190,000 cost > $10,000 cash)
    res = await process_chat(
        user_message="Buy 1000 AAPL",
        price_cache=price_cache,
        user_id="default",
        db_path=tmp_db_path,
    )

    assert res["trades"] == []
    assert "[Execution Notice]" in res["message"]
    assert "Insufficient cash balance" in res["message"]

    # Cash balance remains unchanged
    profile = get_user_profile("default", db_path=tmp_db_path)
    assert profile["cash_balance"] == 10000.00


@pytest.mark.asyncio
async def test_process_chat_watchlist_auto_execution(tmp_db_path, monkeypatch):
    """Test adding and removing watchlist items via process_chat."""
    monkeypatch.setenv("LLM_MOCK", "true")

    # Add PYPL to watchlist
    res_add = await process_chat("Add PYPL", user_id="default", db_path=tmp_db_path)
    assert len(res_add["watchlist_changes"]) == 1
    assert res_add["watchlist_changes"][0]["ticker"] == "PYPL"
    assert res_add["watchlist_changes"][0]["action"] == "add"

    wl = get_watchlist("default", db_path=tmp_db_path)
    tickers = [item["ticker"] for item in wl]
    assert "PYPL" in tickers

    # Remove PYPL from watchlist
    res_remove = await process_chat("Remove PYPL", user_id="default", db_path=tmp_db_path)
    assert len(res_remove["watchlist_changes"]) == 1
    assert res_remove["watchlist_changes"][0]["ticker"] == "PYPL"
    assert res_remove["watchlist_changes"][0]["action"] == "remove"

    wl_after = get_watchlist("default", db_path=tmp_db_path)
    tickers_after = [item["ticker"] for item in wl_after]
    assert "PYPL" not in tickers_after


@pytest.mark.asyncio
async def test_openrouter_api_call_mocking(tmp_db_path, price_cache, monkeypatch):
    """Test call_openrouter_api with a mocked HTTP response."""
    monkeypatch.setenv("LLM_MOCK", "false")
    monkeypatch.setenv("OPENROUTER_API_KEY", "sk-or-test-key")

    mock_llm_payload = {
        "choices": [
            {
                "message": {
                    "content": '{\n  "message": "I recommend buying 10 shares of NVDA based on momentum.",\n  "trades": [{"ticker": "NVDA", "side": "buy", "quantity": 10}],\n  "watchlist_changes": []\n}'
                }
            }
        ]
    }

    mock_response = MagicMock()
    mock_response.status_code = 200
    mock_response.json.return_value = mock_llm_payload
    mock_response.raise_for_status = lambda: None

    with patch("httpx.AsyncClient.post", return_value=mock_response):
        res = await process_chat(
            user_message="Recommend a trade for me",
            price_cache=price_cache,
            user_id="default",
            db_path=tmp_db_path,
        )

    assert "recommend buying 10 shares of NVDA" in res["message"]
    assert len(res["trades"]) == 1
    assert res["trades"][0]["ticker"] == "NVDA"
    assert res["trades"][0]["side"] == "buy"


def test_post_api_chat_endpoint(tmp_db_path, monkeypatch):
    """Test POST /api/chat endpoint using FastAPI TestClient."""
    monkeypatch.setenv("LLM_MOCK", "true")

    app.state.db_path = tmp_db_path
    app.state.price_cache = PriceCache()
    app.state.price_cache.update("AAPL", 190.00)

    client = TestClient(app)

    response = client.post("/api/chat", json={"message": "Buy 5 AAPL"})
    assert response.status_code == 200
    data = response.json()
    assert "message" in data
    assert "trades" in data
    assert "watchlist_changes" in data
    assert len(data["trades"]) == 1
    assert data["trades"][0]["ticker"] == "AAPL"

    # Test empty message validation
    err_res = client.post("/api/chat", json={"message": "  "})
    assert err_res.status_code == 400

    # Test GET /api/chat/history endpoint
    hist_res = client.get("/api/chat/history")
    assert hist_res.status_code == 200
    history = hist_res.json()
    assert len(history) >= 2
