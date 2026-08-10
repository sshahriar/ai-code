"""Unit tests for FinAlly database components and operations."""

import sqlite3
import pytest
from app.db import (
    Database,
    DatabaseRepository,
    Position,
    get_default_db_path,
)
from app.db.schema import DEFAULT_WATCHLIST_TICKERS, REQUIRED_TABLE_NAMES


@pytest.fixture
def repo(tmp_path) -> DatabaseRepository:
    """Fixture providing a clean DatabaseRepository backed by a temporary SQLite file."""
    db_file = tmp_path / "test_finally.db"
    db = Database(db_file)
    return DatabaseRepository(db)


def test_lazy_initialization(tmp_path):
    """Verify lazy initialization creates file, schema, and seed data."""
    db_file = tmp_path / "lazy_init.db"
    assert not db_file.exists()

    db = Database(db_file)
    repo = DatabaseRepository(db)

    assert db_file.exists()

    # Check required tables exist
    conn = db.get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    tables = {row["name"] for row in cursor.fetchall()}
    for table_name in REQUIRED_TABLE_NAMES:
        assert table_name in tables

    # Verify seed user profile
    profile = repo.get_user_profile("default")
    assert profile.id == "default"
    assert profile.cash_balance == 10000.0

    # Verify seed watchlist (10 tickers)
    watchlist = repo.get_watchlist("default")
    assert len(watchlist) == 10
    watchlist_tickers = {item.ticker for item in watchlist}
    assert watchlist_tickers == set(DEFAULT_WATCHLIST_TICKERS)

    # Verify initial snapshot
    snapshots = repo.get_portfolio_snapshots("default")
    assert len(snapshots) >= 1
    assert snapshots[0].total_value == 10000.0


def test_idempotent_initialization(tmp_path):
    """Verify calling initialize_if_needed multiple times does not duplicate seed data."""
    db_file = tmp_path / "idempotent.db"
    db = Database(db_file)
    db.initialize_if_needed()
    db.initialize_if_needed()

    repo = DatabaseRepository(db)
    watchlist = repo.get_watchlist("default")
    assert len(watchlist) == 10


def test_user_profile_and_balance(repo):
    """Test getting user profile and updating cash balance."""
    profile = repo.get_user_profile("default")
    assert profile.cash_balance == 10000.0

    updated = repo.update_cash_balance(12500.50, "default")
    assert updated.cash_balance == 12500.50

    re_fetched = repo.get_user_profile("default")
    assert re_fetched.cash_balance == 12500.50


def test_watchlist_operations(repo):
    """Test watchlist CRUD operations."""
    initial_watchlist = repo.get_watchlist("default")
    assert len(initial_watchlist) == 10

    # Add new ticker (case insensitive)
    item = repo.add_watchlist_ticker("btc", "default")
    assert item.ticker == "BTC"

    updated_watchlist = repo.get_watchlist("default")
    assert len(updated_watchlist) == 11
    assert any(w.ticker == "BTC" for w in updated_watchlist)

    # Adding duplicate ticker should not create extra row
    dup = repo.add_watchlist_ticker("BTC", "default")
    assert dup.ticker == "BTC"
    assert len(repo.get_watchlist("default")) == 11

    # Remove ticker
    removed = repo.remove_watchlist_ticker("BTC", "default")
    assert removed is True
    assert len(repo.get_watchlist("default")) == 10

    # Removing non-existent ticker
    removed_again = repo.remove_watchlist_ticker("BTC", "default")
    assert removed_again is False


def test_position_pnl_calculation():
    """Test position unrealized P&L calculations."""
    pos = Position(
        id="pos1",
        user_id="default",
        ticker="AAPL",
        quantity=10.0,
        avg_cost=150.0,
    )

    # Price up
    pnl_up = DatabaseRepository.calculate_position_pnl(pos, 180.0)
    assert pnl_up.current_value == 1800.0
    assert pnl_up.unrealized_pnl == 300.0
    assert pytest.approx(pnl_up.unrealized_pnl_percent, rel=1e-3) == 20.0

    # Price down
    pnl_down = DatabaseRepository.calculate_position_pnl(pos, 120.0)
    assert pnl_down.current_value == 1200.0
    assert pnl_down.unrealized_pnl == -300.0
    assert pytest.approx(pnl_down.unrealized_pnl_percent, rel=1e-3) == -20.0


def test_execute_buy_trade(repo):
    """Test executing a valid buy trade."""
    # Buy 10 AAPL @ $150 = $1500
    res = repo.execute_trade("AAPL", "buy", 10.0, 150.0, "default")
    assert res.success is True
    assert res.trade is not None
    assert res.trade.ticker == "AAPL"
    assert res.trade.side == "buy"
    assert res.new_cash_balance == 8500.0

    assert res.position is not None
    assert res.position.quantity == 10.0
    assert res.position.avg_cost == 150.0

    # Verify positions table
    positions = repo.get_positions("default")
    assert len(positions) == 1
    assert positions[0].ticker == "AAPL"

    # Verify trade log
    trades = repo.get_trades("default")
    assert len(trades) == 1
    assert trades[0].ticker == "AAPL"
    assert trades[0].price == 150.0

    # Verify snapshot recorded
    snapshots = repo.get_portfolio_snapshots("default")
    assert len(snapshots) >= 2


def test_execute_buy_multiple_times(repo):
    """Test weighted average cost calculation on multiple buys."""
    # Buy 10 AAPL @ $100 = $1000 cost
    repo.execute_trade("AAPL", "buy", 10.0, 100.0, "default")

    # Buy 10 AAPL @ $200 = $2000 cost
    res = repo.execute_trade("AAPL", "buy", 10.0, 200.0, "default")
    assert res.success is True
    assert res.position is not None
    assert res.position.quantity == 20.0
    # Total cost = 3000 for 20 shares -> avg cost = 150
    assert pytest.approx(res.position.avg_cost, rel=1e-3) == 150.0
    assert res.new_cash_balance == 7000.0


def test_execute_buy_insufficient_funds(repo):
    """Test buy trade failure due to insufficient cash balance."""
    # Try buying $20,000 worth of stock with $10,000 cash balance
    res = repo.execute_trade("AAPL", "buy", 100.0, 200.0, "default")
    assert res.success is False
    assert "Insufficient funds" in res.message
    assert res.trade is None

    profile = repo.get_user_profile("default")
    assert profile.cash_balance == 10000.0
    assert len(repo.get_positions("default")) == 0


def test_execute_sell_trade(repo):
    """Test executing a sell trade."""
    # First buy 20 shares @ $100
    repo.execute_trade("AAPL", "buy", 20.0, 100.0, "default")

    # Sell 5 shares @ $150 = $750 proceeds
    res = repo.execute_trade("AAPL", "sell", 5.0, 150.0, "default")
    assert res.success is True
    assert res.new_cash_balance == 8750.0  # 8000 + 750
    assert res.position is not None
    assert res.position.quantity == 15.0
    assert res.position.avg_cost == 100.0  # avg_cost remains 100 on sell

    # Sell remaining 15 shares @ $120
    res_final = repo.execute_trade("AAPL", "sell", 15.0, 120.0, "default")
    assert res_final.success is True
    assert res_final.new_cash_balance == 10550.0  # 8750 + 1800
    assert res_final.position is None

    # Verify positions table is empty
    assert len(repo.get_positions("default")) == 0


def test_execute_sell_insufficient_shares(repo):
    """Test sell trade failure due to insufficient shares."""
    # Sell ticker not owned
    res = repo.execute_trade("GOOGL", "sell", 5.0, 100.0, "default")
    assert res.success is False
    assert "Insufficient shares" in res.message

    # Buy 5 shares, try selling 10 shares
    repo.execute_trade("GOOGL", "buy", 5.0, 100.0, "default")
    res2 = repo.execute_trade("GOOGL", "sell", 10.0, 100.0, "default")
    assert res2.success is False
    assert "Insufficient shares" in res2.message


def test_invalid_trade_parameters(repo):
    """Test edge cases with invalid trade side, negative quantity, or zero price."""
    assert repo.execute_trade("AAPL", "hold", 10, 100).success is False
    assert repo.execute_trade("AAPL", "buy", -5, 100).success is False
    assert repo.execute_trade("AAPL", "buy", 10, 0).success is False


def test_portfolio_snapshots(repo):
    """Test adding and retrieving portfolio snapshots."""
    snap1 = repo.add_portfolio_snapshot(10500.0, "default")
    snap2 = repo.add_portfolio_snapshot(11000.0, "default")

    assert snap1.total_value == 10500.0
    assert snap2.total_value == 11000.0

    history = repo.get_portfolio_snapshots("default")
    assert len(history) >= 3  # Initial + snap1 + snap2


def test_chat_messages(repo):
    """Test adding and retrieving chat messages."""
    msg1 = repo.add_chat_message("user", "Buy 10 shares of AAPL", user_id="default")
    actions = [{"ticker": "AAPL", "side": "buy", "quantity": 10}]
    msg2 = repo.add_chat_message(
        "assistant",
        "Executed trade for 10 AAPL shares.",
        actions=actions,
        user_id="default",
    )

    messages = repo.get_chat_messages("default")
    assert len(messages) == 2
    assert messages[0].role == "user"
    assert messages[0].content == "Buy 10 shares of AAPL"
    assert messages[1].role == "assistant"
    assert messages[1].actions == actions


@pytest.mark.asyncio
async def test_async_repository_methods(tmp_path):
    """Test async helper wrappers in DatabaseRepository."""
    db_file = tmp_path / "async_test.db"
    db = Database(db_file)
    repo = DatabaseRepository(db)

    profile = await repo.get_user_profile_async("default")
    assert profile.cash_balance == 10000.0

    watchlist = await repo.get_watchlist_async("default")
    assert len(watchlist) == 10

    trade_res = await repo.execute_trade_async("NVDA", "buy", 5.0, 120.0, "default")
    assert trade_res.success is True
    assert trade_res.new_cash_balance == 9400.0

    positions = await repo.get_positions_async("default")
    assert len(positions) == 1
    assert positions[0].ticker == "NVDA"

    msg = await repo.add_chat_message_async("user", "Hello assistant")
    assert msg.content == "Hello assistant"

    messages = await repo.get_chat_messages_async("default")
    assert len(messages) == 1
