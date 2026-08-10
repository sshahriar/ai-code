"""Portfolio service for FinAlly backend."""

from __future__ import annotations

import uuid
from datetime import datetime, timezone

from app.db.database import get_db_connection, init_db
from app.market.cache import PriceCache
from app.market.seed_prices import SEED_PRICES
from app.services.watchlist_service import get_watchlist


def get_user_profile(user_id: str = "default", db_path: str | None = None) -> dict:
    """Retrieve user profile (e.g. cash balance)."""
    init_db(db_path)
    conn = get_db_connection(db_path)
    try:
        cursor = conn.cursor()
        cursor.execute("SELECT id, cash_balance, created_at FROM users_profile WHERE id = ?", (user_id,))
        row = cursor.fetchone()
        if not row:
            # Fallback if somehow missing
            now_str = datetime.now(timezone.utc).isoformat()
            conn.execute(
                "INSERT INTO users_profile (id, cash_balance, created_at) VALUES (?, ?, ?)",
                (user_id, 10000.0, now_str),
            )
            conn.commit()
            return {"id": user_id, "cash_balance": 10000.0, "created_at": now_str}
        return {"id": row["id"], "cash_balance": round(row["cash_balance"], 2), "created_at": row["created_at"]}
    finally:
        conn.close()


def get_positions(user_id: str = "default", db_path: str | None = None) -> list[dict]:
    """Retrieve all current positions for user."""
    init_db(db_path)
    conn = get_db_connection(db_path)
    try:
        cursor = conn.cursor()
        cursor.execute(
            "SELECT id, ticker, quantity, avg_cost, updated_at FROM positions WHERE user_id = ? AND quantity > 0 ORDER BY ticker ASC",
            (user_id,),
        )
        rows = cursor.fetchall()
        return [
            {
                "id": row["id"],
                "ticker": row["ticker"],
                "quantity": row["quantity"],
                "avg_cost": round(row["avg_cost"], 2),
                "updated_at": row["updated_at"],
            }
            for row in rows
        ]
    finally:
        conn.close()


def get_market_price(ticker: str, price_cache: PriceCache | None = None) -> float:
    """Get current market price for ticker, falling back to seed price or default 100.0."""
    ticker_clean = ticker.strip().upper()
    if price_cache is not None:
        p = price_cache.get_price(ticker_clean)
        if p is not None and p > 0:
            return round(p, 2)
    return SEED_PRICES.get(ticker_clean, 100.0)


def get_portfolio_context(
    price_cache: PriceCache | None = None,
    user_id: str = "default",
    db_path: str | None = None,
) -> dict:
    """Gather complete portfolio context including cash, positions, P&L, watchlist, and total value."""
    profile = get_user_profile(user_id, db_path)
    raw_positions = get_positions(user_id, db_path)
    watchlist_items = get_watchlist(user_id, db_path)

    cash_balance = profile["cash_balance"]
    enriched_positions = []
    total_positions_value = 0.0

    for pos in raw_positions:
        ticker = pos["ticker"]
        qty = pos["quantity"]
        avg_cost = pos["avg_cost"]
        current_price = get_market_price(ticker, price_cache)
        market_value = qty * current_price
        cost_basis = qty * avg_cost
        unrealized_pnl = market_value - cost_basis
        unrealized_pnl_pct = (unrealized_pnl / cost_basis * 100) if cost_basis > 0 else 0.0

        total_positions_value += market_value
        enriched_positions.append(
            {
                "id": pos["id"],
                "ticker": ticker,
                "quantity": qty,
                "avg_cost": avg_cost,
                "current_price": current_price,
                "market_value": round(market_value, 2),
                "cost_basis": round(cost_basis, 2),
                "unrealized_pnl": round(unrealized_pnl, 2),
                "unrealized_pnl_pct": round(unrealized_pnl_pct, 2),
                "updated_at": pos["updated_at"],
            }
        )

    total_portfolio_value = cash_balance + total_positions_value

    enriched_watchlist = []
    for item in watchlist_items:
        ticker = item["ticker"]
        price = get_market_price(ticker, price_cache)
        enriched_watchlist.append(
            {
                "id": item["id"],
                "ticker": ticker,
                "price": price,
                "added_at": item["added_at"],
            }
        )

    return {
        "user_id": user_id,
        "cash_balance": round(cash_balance, 2),
        "positions": enriched_positions,
        "total_positions_value": round(total_positions_value, 2),
        "total_portfolio_value": round(total_portfolio_value, 2),
        "watchlist": enriched_watchlist,
    }


def execute_trade(
    ticker: str,
    side: str,
    quantity: float,
    price_cache: PriceCache | None = None,
    user_id: str = "default",
    db_path: str | None = None,
) -> dict:
    """Execute a market order (buy/sell). Returns execution result dict."""
    ticker_clean = ticker.strip().upper()
    side_clean = side.strip().lower()

    if not ticker_clean:
        return {"success": False, "error": "Ticker symbol cannot be empty"}
    if side_clean not in ("buy", "sell"):
        return {"success": False, "error": f"Invalid trade side '{side}'. Must be 'buy' or 'sell'"}
    if quantity <= 0:
        return {"success": False, "error": f"Quantity must be greater than 0. Got {quantity}"}

    price = get_market_price(ticker_clean, price_cache)
    init_db(db_path)
    conn = get_db_connection(db_path)

    try:
        with conn:
            cursor = conn.cursor()

            # Get user profile / cash
            cursor.execute("SELECT cash_balance FROM users_profile WHERE id = ?", (user_id,))
            user_row = cursor.fetchone()
            if not user_row:
                return {"success": False, "error": f"User profile '{user_id}' not found"}
            cash_balance = user_row["cash_balance"]

            # Get existing position if any
            cursor.execute(
                "SELECT id, quantity, avg_cost FROM positions WHERE user_id = ? AND ticker = ?",
                (user_id, ticker_clean),
            )
            pos_row = cursor.fetchone()

            now_str = datetime.now(timezone.utc).isoformat()

            if side_clean == "buy":
                total_cost = quantity * price
                if cash_balance < total_cost:
                    return {
                        "success": False,
                        "error": f"Insufficient cash balance. Required: ${total_cost:,.2f}, Available: ${cash_balance:,.2f}",
                    }

                new_cash = cash_balance - total_cost

                if pos_row:
                    old_qty = pos_row["quantity"]
                    old_avg = pos_row["avg_cost"]
                    new_qty = old_qty + quantity
                    new_avg = (old_qty * old_avg + total_cost) / new_qty
                    cursor.execute(
                        "UPDATE positions SET quantity = ?, avg_cost = ?, updated_at = ? WHERE id = ?",
                        (new_qty, new_avg, now_str, pos_row["id"]),
                    )
                else:
                    pos_id = str(uuid.uuid4())
                    cursor.execute(
                        "INSERT INTO positions (id, user_id, ticker, quantity, avg_cost, updated_at) VALUES (?, ?, ?, ?, ?, ?)",
                        (pos_id, user_id, ticker_clean, quantity, price, now_str),
                    )

                cursor.execute(
                    "UPDATE users_profile SET cash_balance = ? WHERE id = ?",
                    (new_cash, user_id),
                )

            else:  # sell
                if not pos_row or pos_row["quantity"] < quantity:
                    avail = pos_row["quantity"] if pos_row else 0
                    return {
                        "success": False,
                        "error": f"Insufficient shares of {ticker_clean} to sell. Requested: {quantity}, Available: {avail}",
                    }

                total_proceeds = quantity * price
                new_cash = cash_balance + total_proceeds
                rem_qty = pos_row["quantity"] - quantity

                if rem_qty <= 1e-6:
                    cursor.execute("DELETE FROM positions WHERE id = ?", (pos_row["id"],))
                else:
                    cursor.execute(
                        "UPDATE positions SET quantity = ?, updated_at = ? WHERE id = ?",
                        (rem_qty, now_str, pos_row["id"]),
                    )

                cursor.execute(
                    "UPDATE users_profile SET cash_balance = ? WHERE id = ?",
                    (new_cash, user_id),
                )

            # Record trade in trades table
            trade_id = str(uuid.uuid4())
            cursor.execute(
                "INSERT INTO trades (id, user_id, ticker, side, quantity, price, executed_at) VALUES (?, ?, ?, ?, ?, ?, ?)",
                (trade_id, user_id, ticker_clean, side_clean, quantity, price, now_str),
            )

            # Calculate new total portfolio value for snapshot
            cursor.execute("SELECT SUM(quantity * avg_cost) as pos_val FROM positions WHERE user_id = ?", (user_id,))
            sum_row = cursor.fetchone()
            pos_val = sum_row["pos_val"] if sum_row and sum_row["pos_val"] is not None else 0.0
            total_val = new_cash + pos_val

            snapshot_id = str(uuid.uuid4())
            cursor.execute(
                "INSERT INTO portfolio_snapshots (id, user_id, total_value, recorded_at) VALUES (?, ?, ?, ?)",
                (snapshot_id, user_id, total_val, now_str),
            )

            return {
                "success": True,
                "trade": {
                    "id": trade_id,
                    "ticker": ticker_clean,
                    "side": side_clean,
                    "quantity": quantity,
                    "price": price,
                    "executed_at": now_str,
                },
                "new_cash_balance": round(new_cash, 2),
                "total_portfolio_value": round(total_val, 2),
            }
    finally:
        conn.close()
