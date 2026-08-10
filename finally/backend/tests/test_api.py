"""Unit tests for FinAlly FastAPI endpoints."""

from __future__ import annotations

import tempfile
from pathlib import Path

import pytest
from fastapi.testclient import TestClient

from app.database import init_db
from app.main import create_app


@pytest.fixture
def test_db_path(tmp_path: Path) -> Path:
    """Fixture providing an isolated temporary database path."""
    db_file = tmp_path / "test_finally.db"
    init_db(db_path=db_file)
    return db_file


@pytest.fixture
def client(test_db_path: Path):
    """TestClient fixture with isolated test database."""
    app = create_app(db_path=test_db_path)
    with TestClient(app) as test_client:
        yield test_client


def test_health_check(client: TestClient):
    """Test GET /api/health returns status 200 and ok payload."""
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_get_watchlist_default(client: TestClient):
    """Test GET /api/watchlist returns default watchlist tickers."""
    response = client.get("/api/watchlist")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) == 10
    tickers = [item["ticker"] for item in data]
    assert "AAPL" in tickers
    assert "NVDA" in tickers
    for item in data:
        assert "price" in item
        assert "change" in item
        assert "change_percent" in item


def test_add_and_remove_watchlist_ticker(client: TestClient):
    """Test POST and DELETE /api/watchlist."""
    # Add new ticker
    add_resp = client.post("/api/watchlist", json={"ticker": "AMD"})
    assert add_resp.status_code == 200
    added_data = add_resp.json()
    assert added_data["ticker"] == "AMD"
    assert "price" in added_data

    # Check it appears in watchlist
    get_resp = client.get("/api/watchlist")
    tickers = [item["ticker"] for item in get_resp.json()]
    assert "AMD" in tickers

    # Remove ticker
    del_resp = client.delete("/api/watchlist/AMD")
    assert del_resp.status_code == 200
    assert del_resp.json() == {"success": True, "ticker": "AMD"}

    # Check it no longer appears in watchlist
    get_resp_after = client.get("/api/watchlist")
    tickers_after = [item["ticker"] for item in get_resp_after.json()]
    assert "AMD" not in tickers_after


def test_remove_nonexistent_watchlist_ticker(client: TestClient):
    """Test DELETE /api/watchlist/{ticker} with unknown ticker returns 404."""
    del_resp = client.delete("/api/watchlist/NONEXISTENT")
    assert del_resp.status_code == 404


def test_get_portfolio_initial(client: TestClient):
    """Test GET /api/portfolio initially has $10,000 cash and empty positions."""
    response = client.get("/api/portfolio")
    assert response.status_code == 200
    data = response.json()
    assert data["cash_balance"] == 10000.0
    assert data["total_value"] == 10000.0
    assert data["total_pnl"] == 0.0
    assert data["positions"] == []


def test_trade_buy_and_sell_flow(client: TestClient):
    """Test executing buy and sell trades and verifying portfolio state."""
    # 1. Buy 10 shares of AAPL
    buy_resp = client.post(
        "/api/portfolio/trade",
        json={"ticker": "AAPL", "quantity": 10, "side": "buy"},
    )
    assert buy_resp.status_code == 200
    buy_data = buy_resp.json()
    assert buy_data["success"] is True
    assert buy_data["trade"]["ticker"] == "AAPL"
    assert buy_data["trade"]["side"] == "buy"
    assert buy_data["trade"]["quantity"] == 10
    trade_price = buy_data["trade"]["price"]
    assert trade_price > 0
    expected_cash = round(10000.0 - (10 * trade_price), 2)
    assert buy_data["cash_balance"] == expected_cash

    # Verify position exists in GET /api/portfolio
    port_resp = client.get("/api/portfolio")
    port_data = port_resp.json()
    assert len(port_data["positions"]) == 1
    pos = port_data["positions"][0]
    assert pos["ticker"] == "AAPL"
    assert pos["quantity"] == 10
    assert pos["avg_cost"] == round(trade_price, 2)

    # 2. Buy another 10 shares of AAPL
    buy2_resp = client.post(
        "/api/portfolio/trade",
        json={"ticker": "AAPL", "quantity": 10, "side": "buy"},
    )
    assert buy2_resp.status_code == 200
    pos_data = buy2_resp.json()["position"]
    assert pos_data["quantity"] == 20

    # 3. Sell 5 shares of AAPL
    sell_resp = client.post(
        "/api/portfolio/trade",
        json={"ticker": "AAPL", "quantity": 5, "side": "sell"},
    )
    assert sell_resp.status_code == 200
    sell_data = sell_resp.json()
    assert sell_data["success"] is True
    assert sell_data["position"]["quantity"] == 15

    # 4. Sell remaining 15 shares of AAPL
    sell_all_resp = client.post(
        "/api/portfolio/trade",
        json={"ticker": "AAPL", "quantity": 15, "side": "sell"},
    )
    assert sell_all_resp.status_code == 200
    assert sell_all_resp.json()["position"] is None

    # Portfolio positions should now be empty
    port_resp_end = client.get("/api/portfolio")
    assert port_resp_end.json()["positions"] == []


def test_trade_insufficient_cash(client: TestClient):
    """Test buying with cost exceeding cash balance returns 400 error."""
    resp = client.post(
        "/api/portfolio/trade",
        json={"ticker": "NVDA", "quantity": 10000, "side": "buy"},
    )
    assert resp.status_code == 400
    assert "Insufficient cash" in resp.json()["detail"]


def test_trade_insufficient_shares(client: TestClient):
    """Test selling shares not owned returns 400 error."""
    resp = client.post(
        "/api/portfolio/trade",
        json={"ticker": "MSFT", "quantity": 5, "side": "sell"},
    )
    assert resp.status_code == 400
    assert "Insufficient shares" in resp.json()["detail"]


def test_trade_invalid_parameters(client: TestClient):
    """Test trading with invalid side or invalid quantity."""
    # Invalid side
    resp1 = client.post(
        "/api/portfolio/trade",
        json={"ticker": "AAPL", "quantity": 1, "side": "hold"},
    )
    assert resp1.status_code == 422  # Pydantic validation error

    # Quantity <= 0
    resp2 = client.post(
        "/api/portfolio/trade",
        json={"ticker": "AAPL", "quantity": 0, "side": "buy"},
    )
    assert resp2.status_code == 422


def test_portfolio_history(client: TestClient):
    """Test GET /api/portfolio/history returns list of snapshots."""
    # Record a trade to produce snapshot
    client.post(
        "/api/portfolio/trade",
        json={"ticker": "AAPL", "quantity": 1, "side": "buy"},
    )
    response = client.get("/api/portfolio/history")
    assert response.status_code == 200
    history = response.json()
    assert isinstance(history, list)
    assert len(history) >= 2  # initial snapshot + post-trade snapshot
    for item in history:
        assert "recorded_at" in item
        assert "total_value" in item


def test_stream_prices_endpoint(client: TestClient, monkeypatch):
    """Test GET /api/stream/prices returns SSE streaming response."""
    async def mock_events(*args, **kwargs):
        yield "retry: 1000\n\n"
        yield 'data: {"AAPL": {"ticker": "AAPL", "price": 190.0}}\n\n'

    monkeypatch.setattr("app.market.stream._generate_events", mock_events)
    response = client.get("/api/stream/prices")
    assert response.status_code == 200
    assert "text/event-stream" in response.headers.get("content-type", "")
    assert "retry: 1000" in response.text




