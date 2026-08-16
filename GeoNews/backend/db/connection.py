"""SQLite connection helpers for GeoNews."""

from __future__ import annotations

import sqlite3
from pathlib import Path

# backend/db/connection.py → parents[2] = GeoNews project root
PROJECT_ROOT = Path(__file__).resolve().parents[2]
DEFAULT_DB_PATH = PROJECT_ROOT / "db" / "geonews.db"

_PACKAGE_DIR = Path(__file__).resolve().parent
SCHEMA_PATH = _PACKAGE_DIR / "schema.sql"
SEED_DIR = _PACKAGE_DIR / "seed"


def get_db_path(path: str | Path | None = None) -> Path:
    """Resolve the SQLite file path (default: project ``db/geonews.db``)."""
    return Path(path) if path is not None else DEFAULT_DB_PATH


def connect(path: str | Path | None = None) -> sqlite3.Connection:
    """Open a SQLite connection with row factory and foreign keys on."""
    db_path = get_db_path(path)
    db_path.parent.mkdir(parents=True, exist_ok=True)
    conn = sqlite3.connect(str(db_path))
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON")
    return conn
