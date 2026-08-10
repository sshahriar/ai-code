"""Watchlist service for FinAlly backend."""

from __future__ import annotations

import uuid
from datetime import datetime, timezone

from app.db.database import get_db_connection, init_db


def get_watchlist(user_id: str = "default", db_path: str | None = None) -> list[dict]:
    """Retrieve all tickers in the user's watchlist."""
    init_db(db_path)
    conn = get_db_connection(db_path)
    try:
        cursor = conn.cursor()
        cursor.execute(
            "SELECT id, ticker, added_at FROM watchlist WHERE user_id = ? ORDER BY added_at ASC",
            (user_id,),
        )
        rows = cursor.fetchall()
        return [
            {
                "id": row["id"],
                "ticker": row["ticker"],
                "added_at": row["added_at"],
            }
            for row in rows
        ]
    finally:
        conn.close()


def add_to_watchlist(ticker: str, user_id: str = "default", db_path: str | None = None) -> dict:
    """Add a ticker to the user's watchlist."""
    ticker_clean = ticker.strip().upper()
    if not ticker_clean:
        raise ValueError("Ticker symbol cannot be empty")

    init_db(db_path)
    conn = get_db_connection(db_path)
    try:
        now_str = datetime.now(timezone.utc).isoformat()
        with conn:
            cursor = conn.cursor()
            cursor.execute(
                "SELECT id, ticker, added_at FROM watchlist WHERE user_id = ? AND ticker = ?",
                (user_id, ticker_clean),
            )
            existing = cursor.fetchone()
            if existing:
                return {
                    "id": existing["id"],
                    "ticker": existing["ticker"],
                    "added_at": existing["added_at"],
                    "action": "already_exists",
                }

            item_id = str(uuid.uuid4())
            cursor.execute(
                "INSERT INTO watchlist (id, user_id, ticker, added_at) VALUES (?, ?, ?, ?)",
                (item_id, user_id, ticker_clean, now_str),
            )
            return {
                "id": item_id,
                "ticker": ticker_clean,
                "added_at": now_str,
                "action": "added",
            }
    finally:
        conn.close()


def remove_from_watchlist(ticker: str, user_id: str = "default", db_path: str | None = None) -> bool:
    """Remove a ticker from the user's watchlist."""
    ticker_clean = ticker.strip().upper()
    init_db(db_path)
    conn = get_db_connection(db_path)
    try:
        with conn:
            cursor = conn.cursor()
            cursor.execute(
                "DELETE FROM watchlist WHERE user_id = ? AND ticker = ?",
                (user_id, ticker_clean),
            )
            return cursor.rowcount > 0
    finally:
        conn.close()
