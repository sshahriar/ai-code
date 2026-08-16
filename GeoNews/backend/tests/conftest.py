"""Shared pytest fixtures for API + ingest tests."""

from __future__ import annotations

import os
from pathlib import Path

import pytest
from fastapi.testclient import TestClient

os.environ.setdefault("INGEST_MOCK", "true")
os.environ.setdefault("LLM_MOCK", "true")


@pytest.fixture()
def db_path(tmp_path: Path, monkeypatch: pytest.MonkeyPatch) -> Path:
    path = tmp_path / "test_api.db"
    monkeypatch.setenv("INGEST_MOCK", "true")
    monkeypatch.setenv("LLM_MOCK", "true")

    import config as config_mod
    import db.connection as conn_mod

    monkeypatch.setattr(conn_mod, "DEFAULT_DB_PATH", path)
    config_mod.get_settings.cache_clear()

    from db import init_db

    init_db(path).close()
    return path


@pytest.fixture()
def client(db_path: Path, monkeypatch: pytest.MonkeyPatch) -> TestClient:
    def _noop_scheduler() -> None:
        return None

    monkeypatch.setattr("ingest.runner.start_scheduler", _noop_scheduler)
    monkeypatch.setattr("ingest.start_scheduler", _noop_scheduler)

    import main

    monkeypatch.setattr(main, "start_scheduler", _noop_scheduler)

    with TestClient(main.app) as c:
        yield c
