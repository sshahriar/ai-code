"""SQLite database operations with lazy initialization and seeding."""

from __future__ import annotations

import json
import os
import sqlite3
import uuid
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

DEFAULT_WATCHLIST_TICKERS = [
    "AAPL",
    "GOOGL",
    "MSFT",
    "AMZN",
    "TSLA",
    "NVDA",
    "META",
    "JPM",
    "V",
    "NFLX",
]


def get_db_path() -> Path:
    """Get path to SQLite database file."""
    env_path = os.environ.get("FINALLY_DB_PATH") or os.environ.get("DB_PATH")
    if env_path:
        return Path(env_path)

    # Default to root/db/finally.db
    root_dir = Path(__file__).resolve().parent.parent.parent
    db_dir = root_dir / "db"
    db_dir.mkdir(parents=True, exist_ok=True)
    return db_dir / "finally.db"


def _get_connection(db_path: Path | str | None = None) -> sqlite3.Connection:
    """Open SQLite connection with row factory configured."""
    target_path = str(db_path) if db_path is not None else str(get_db_path())
    if target_path != ":memory:":
        Path(target_path).parent.mkdir(parents=True, exist_ok=True)
    conn = sqlite3.connect(target_path)
    conn.row_factory = sqlite3.Row
    return conn


def _now_iso() -> str:
    """Current UTC timestamp in ISO 8601 format."""
    return datetime.now(timezone.utc).isoformat()


def init_db(db_path: Path | str | None = None) -> None:
    """Initialize database schema and seed default data if needed."""
    with _get_connection(db_path) as conn:
        cursor = conn.cursor()

        # 1. Users Profile
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS users_profile (
                id TEXT PRIMARY KEY,
                cash_balance REAL NOT NULL DEFAULT 10000.0,
                created_at TEXT NOT NULL
            );
            """
        )

        # 2. Watchlist
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS watchlist (
                id TEXT PRIMARY KEY,
                user_id TEXT NOT NULL DEFAULT 'default',
                ticker TEXT NOT NULL,
                added_at TEXT NOT NULL,
                UNIQUE (user_id, ticker)
            );
            """
        )

        # 3. Positions
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS positions (
                id TEXT PRIMARY KEY,
                user_id TEXT NOT NULL DEFAULT 'default',
                ticker TEXT NOT NULL,
                quantity REAL NOT NULL,
                avg_cost REAL NOT NULL,
                updated_at TEXT NOT NULL,
                UNIQUE (user_id, ticker)
            );
            """
        )

        # 4. Trades
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS trades (
                id TEXT PRIMARY KEY,
                user_id TEXT NOT NULL DEFAULT 'default',
                ticker TEXT NOT NULL,
                side TEXT NOT NULL,
                quantity REAL NOT NULL,
                price REAL NOT NULL,
                executed_at TEXT NOT NULL
            );
            """
        )

        # 5. Portfolio Snapshots
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS portfolio_snapshots (
                id TEXT PRIMARY KEY,
                user_id TEXT NOT NULL DEFAULT 'default',
                total_value REAL NOT NULL,
                recorded_at TEXT NOT NULL
            );
            """
        )

        # 6. Chat Messages
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS chat_messages (
                id TEXT PRIMARY KEY,
                user_id TEXT NOT NULL DEFAULT 'default',
                role TEXT NOT NULL,
                content TEXT NOT NULL,
                actions TEXT,
                created_at TEXT NOT NULL
            );
            """
        )

        # Seed User Profile if empty
        cursor.execute("SELECT COUNT(*) FROM users_profile WHERE id = 'default'")
        if cursor.fetchone()[0] == 0:
            cursor.execute(
                "INSERT INTO users_profile (id, cash_balance, created_at) VALUES ('default', 10000.0, ?)",
                (_now_iso(),),
            )

        # Seed Watchlist if empty for default user
        cursor.execute("SELECT COUNT(*) FROM watchlist WHERE user_id = 'default'")
        if cursor.fetchone()[0] == 0:
            now = _now_iso()
            for ticker in DEFAULT_WATCHLIST_TICKERS:
                cursor.execute(
                    "INSERT INTO watchlist (id, user_id, ticker, added_at) VALUES (?, 'default', ?, ?)",
                    (str(uuid.uuid4()), ticker, now),
                )

        # Seed initial portfolio snapshot if empty
        cursor.execute("SELECT COUNT(*) FROM portfolio_snapshots WHERE user_id = 'default'")
        if cursor.fetchone()[0] == 0:
            cursor.execute(
                "INSERT INTO portfolio_snapshots (id, user_id, total_value, recorded_at) VALUES (?, 'default', 10000.0, ?)",
                (str(uuid.uuid4()), _now_iso()),
            )

        conn.commit()


# --- User Profile Queries ---

def get_user_profile(user_id: str = "default", db_path: Path | str | None = None) -> dict[str, Any]:
    with _get_connection(db_path) as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM users_profile WHERE id = ?", (user_id,))
        row = cursor.fetchone()
        if not row:
            now = _now_iso()
            cursor.execute(
                "INSERT INTO users_profile (id, cash_balance, created_at) VALUES (?, 10000.0, ?)",
                (user_id, now),
            )
            conn.commit()
            return {"id": user_id, "cash_balance": 10000.0, "created_at": now}
        return dict(row)


def update_user_cash(cash_balance: float, user_id: str = "default", db_path: Path | str | None = None) -> None:
    with _get_connection(db_path) as conn:
        cursor = conn.cursor()
        cursor.execute(
            "UPDATE users_profile SET cash_balance = ? WHERE id = ?",
            (cash_balance, user_id),
        )
        conn.commit()


# --- Watchlist Queries ---

def get_watchlist(user_id: str = "default", db_path: Path | str | None = None) -> list[dict[str, Any]]:
    with _get_connection(db_path) as conn:
        cursor = conn.cursor()
        cursor.execute(
            "SELECT * FROM watchlist WHERE user_id = ? ORDER BY added_at ASC",
            (user_id,),
        )
        return [dict(row) for row in cursor.fetchall()]


def add_watchlist_ticker(ticker: str, user_id: str = "default", db_path: Path | str | None = None) -> dict[str, Any]:
    ticker = ticker.strip().upper()
    now = _now_iso()
    with _get_connection(db_path) as conn:
        cursor = conn.cursor()
        cursor.execute(
            "SELECT * FROM watchlist WHERE user_id = ? AND ticker = ?",
            (user_id, ticker),
        )
        row = cursor.fetchone()
        if row:
            return dict(row)

        new_id = str(uuid.uuid4())
        cursor.execute(
            "INSERT INTO watchlist (id, user_id, ticker, added_at) VALUES (?, ?, ?, ?)",
            (new_id, user_id, ticker, now),
        )
        conn.commit()
        return {"id": new_id, "user_id": user_id, "ticker": ticker, "added_at": now}


def remove_watchlist_ticker(ticker: str, user_id: str = "default", db_path: Path | str | None = None) -> bool:
    ticker = ticker.strip().upper()
    with _get_connection(db_path) as conn:
        cursor = conn.cursor()
        cursor.execute(
            "DELETE FROM watchlist WHERE user_id = ? AND ticker = ?",
            (user_id, ticker),
        )
        conn.commit()
        return cursor.rowcount > 0


# --- Position Queries ---

def get_positions(user_id: str = "default", db_path: Path | str | None = None) -> list[dict[str, Any]]:
    with _get_connection(db_path) as conn:
        cursor = conn.cursor()
        cursor.execute(
            "SELECT * FROM positions WHERE user_id = ? AND quantity > 0 ORDER BY ticker ASC",
            (user_id,),
        )
        return [dict(row) for row in cursor.fetchall()]


def get_position(ticker: str, user_id: str = "default", db_path: Path | str | None = None) -> dict[str, Any] | None:
    ticker = ticker.strip().upper()
    with _get_connection(db_path) as conn:
        cursor = conn.cursor()
        cursor.execute(
            "SELECT * FROM positions WHERE user_id = ? AND ticker = ?",
            (user_id, ticker),
        )
        row = cursor.fetchone()
        return dict(row) if row else None


def upsert_position(
    ticker: str,
    quantity: float,
    avg_cost: float,
    user_id: str = "default",
    db_path: Path | str | None = None,
) -> dict[str, Any]:
    ticker = ticker.strip().upper()
    now = _now_iso()
    with _get_connection(db_path) as conn:
        cursor = conn.cursor()
        cursor.execute(
            "SELECT * FROM positions WHERE user_id = ? AND ticker = ?",
            (user_id, ticker),
        )
        row = cursor.fetchone()
        if row:
            cursor.execute(
                "UPDATE positions SET quantity = ?, avg_cost = ?, updated_at = ? WHERE user_id = ? AND ticker = ?",
                (quantity, avg_cost, now, user_id, ticker),
            )
            pos_id = row["id"]
        else:
            pos_id = str(uuid.uuid4())
            cursor.execute(
                "INSERT INTO positions (id, user_id, ticker, quantity, avg_cost, updated_at) VALUES (?, ?, ?, ?, ?, ?)",
                (pos_id, user_id, ticker, quantity, avg_cost, now),
            )
        conn.commit()
        return {
            "id": pos_id,
            "user_id": user_id,
            "ticker": ticker,
            "quantity": quantity,
            "avg_cost": avg_cost,
            "updated_at": now,
        }


def delete_position(ticker: str, user_id: str = "default", db_path: Path | str | None = None) -> bool:
    ticker = ticker.strip().upper()
    with _get_connection(db_path) as conn:
        cursor = conn.cursor()
        cursor.execute(
            "DELETE FROM positions WHERE user_id = ? AND ticker = ?",
            (user_id, ticker),
        )
        conn.commit()
        return cursor.rowcount > 0


# --- Trade Log & Portfolio Snapshots ---

def record_trade(
    ticker: str,
    side: str,
    quantity: float,
    price: float,
    user_id: str = "default",
    db_path: Path | str | None = None,
) -> dict[str, Any]:
    ticker = ticker.strip().upper()
    side = side.lower()
    trade_id = str(uuid.uuid4())
    now = _now_iso()
    with _get_connection(db_path) as conn:
        cursor = conn.cursor()
        cursor.execute(
            """
            INSERT INTO trades (id, user_id, ticker, side, quantity, price, executed_at)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            """,
            (trade_id, user_id, ticker, side, quantity, price, now),
        )
        conn.commit()
        return {
            "id": trade_id,
            "user_id": user_id,
            "ticker": ticker,
            "side": side,
            "quantity": quantity,
            "price": price,
            "executed_at": now,
        }


def record_portfolio_snapshot(
    total_value: float,
    user_id: str = "default",
    db_path: Path | str | None = None,
) -> dict[str, Any]:
    snap_id = str(uuid.uuid4())
    now = _now_iso()
    with _get_connection(db_path) as conn:
        cursor = conn.cursor()
        cursor.execute(
            """
            INSERT INTO portfolio_snapshots (id, user_id, total_value, recorded_at)
            VALUES (?, ?, ?, ?)
            """,
            (snap_id, user_id, total_value, now),
        )
        conn.commit()
        return {
            "id": snap_id,
            "user_id": user_id,
            "total_value": total_value,
            "recorded_at": now,
        }


def get_portfolio_history(user_id: str = "default", db_path: Path | str | None = None) -> list[dict[str, Any]]:
    with _get_connection(db_path) as conn:
        cursor = conn.cursor()
        cursor.execute(
            """
            SELECT id, user_id, total_value, recorded_at
            FROM portfolio_snapshots
            WHERE user_id = ?
            ORDER BY recorded_at ASC
            """,
            (user_id,),
        )
        return [dict(row) for row in cursor.fetchall()]
