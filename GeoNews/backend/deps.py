"""FastAPI dependencies."""

from __future__ import annotations

import sqlite3
from collections.abc import Generator

from db import connect, get_db_path


def get_conn() -> Generator[sqlite3.Connection, None, None]:
    """Open a short-lived SQLite connection for a request."""
    conn = connect(get_db_path())
    try:
        yield conn
    finally:
        conn.close()
