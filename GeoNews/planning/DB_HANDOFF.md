# DB Handoff — Phase 1

Database Engineer deliverable for GeoNews (`plan.md` §9). SQLite only; no API routes.

## Files created

| Path | Purpose |
|---|---|
| `backend/pyproject.toml` | Minimal uv/pip project + pytest config |
| `backend/db/__init__.py` | Public exports for Backend |
| `backend/db/schema.sql` | Table + index DDL |
| `backend/db/connection.py` | DB path + `connect()` |
| `backend/db/init.py` | `init_db()`, `seed_if_empty()` |
| `backend/db/queries.py` | Upsert / bbox / watchlist helpers |
| `backend/db/seed/sample_incidents.csv` | 20 demo incidents around Dhaka (`source=sample`) |
| `backend/db/seed/sample_events.json` | 30 mixed-category sample events |
| `backend/db/tests/test_db.py` | Unit tests |
| `db/.gitignore` | Ignores runtime `*.db` under `db/` |
| `backend/.gitignore` | Ignores local `.venv/` |

Runtime DB file (created on first `init_db()`): `db/geonews.db` (project root).

## How to run DB tests

```powershell
cd backend
py -m venv .venv
.\.venv\Scripts\python.exe -m pip install -e ".[dev]"
.\.venv\Scripts\python.exe -m pytest db/tests -v
```

Expected: **4 passed**.

## Imports for Backend

From the `backend/` working directory (or with `backend` on `PYTHONPATH`):

```python
from db import (
    DEFAULT_DB_PATH,
    init_db,              # create tables + seed if empty; returns connection
    seed_if_empty,        # re-run seed guards on an open connection
    connect,              # open connection only (no schema/seed)
    get_db_path,
    upsert_event,
    upsert_incident,
    query_events_bbox,
    query_incidents_bbox,
    list_watchlist,
    get_watchlist_place,
    add_watchlist_place,
    delete_watchlist_place,
    get_event,
)
```

Typical startup:

```python
conn = init_db()  # → db/geonews.db
# or: conn = init_db("/path/to/test.db")
```

## Function cheat sheet

| Need | Function |
|---|---|
| Lazy init + seed | `init_db(path=None, seed=True)` |
| Seed only if empty | `seed_if_empty(conn)` |
| Upsert event by `(source, external_id)` | `upsert_event(conn, dict)` |
| Upsert incident by `(source, external_id)` | `upsert_incident(conn, dict)` |
| Events in map bbox | `query_events_bbox(conn, min_lat=…, min_lon=…, max_lat=…, max_lon=…, since=None, category=None, limit=200)` |
| Incidents in bbox | `query_incidents_bbox(conn, min_lat=…, min_lon=…, max_lat=…, max_lon=…, source=None, since=None, limit=500)` |
| Watchlist list / get / add / delete | `list_watchlist`, `get_watchlist_place`, `add_watchlist_place`, `delete_watchlist_place` |

## Assumptions

1. **Runtime path** is project-root `db/geonews.db`, resolved from `backend/db/connection.py` via `parents[2]`. Override with `init_db(path=...)`.
2. **`user_id`** is only on `places_watchlist` and `chat_messages` (per detailed §9 schema). Events / incidents / ingest_runs omit it.
3. **Seed is per-table empty**: watchlist, incidents, and events seed independently when that table has zero rows.
4. **Sample crime safety**: CSV/seed incidents always use `source='sample'`; place names include `(DEMO SAMPLE)`. Never labeled as Police.uk.
5. **Upsert keeps existing `id`** on `(source, external_id)` conflict (`ON CONFLICT DO UPDATE`).
6. **No FastAPI / ingest / LLM** in this package — pure SQLite helpers only.
7. Local tooling uses a **venv + pip** under `backend/.venv` (uv not required). Stdlib `sqlite3` only at runtime; `pytest` is a `dev` extra.
