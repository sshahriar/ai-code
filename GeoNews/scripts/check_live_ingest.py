"""Smoke-check live ingest: run real adapters and print a few article links.

Usage (from project root):
    .venv/Scripts/python.exe scripts/check_live_ingest.py
"""

from __future__ import annotations

import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "backend"))

from db import connect, get_db_path, init_db  # noqa: E402
from ingest.runner import build_adapters  # noqa: E402


def safe(text: object, width: int = 70) -> str:
    """Windows consoles are often cp1252; drop characters they cannot print."""
    raw = str(text)[:width]
    return raw.encode("ascii", "replace").decode("ascii")


def main() -> int:
    init_db().close()
    conn = connect(get_db_path())
    try:
        for adapter in build_adapters(conn, mock=False):
            try:
                batch = adapter.fetch()
            except Exception as exc:  # noqa: BLE001 - smoke script
                print(f"{adapter.source:<10} ERROR {exc}")
                continue
            print(
                f"{adapter.source:<10} events={len(batch.events):<4} "
                f"incidents={len(batch.incidents)}"
            )
            for event in batch.events[:3]:
                print(f"    - {safe(event['title'])}")
                print(f"      {safe(event.get('url'), 120)}")
    finally:
        conn.close()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
