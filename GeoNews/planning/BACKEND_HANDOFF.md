# Backend Handoff — Phase 2

Backend API Engineer deliverable for GeoNews (`plan.md` §§10–11). FastAPI + ingest + thin LLM wrappers. Does not own `frontend/`, Docker/scripts, Playwright, or LLM prompt internals.

## How to run

```powershell
cd backend
.\.venv\Scripts\python.exe -m pip install -e ".[dev]"
$env:INGEST_MOCK = "true"
$env:LLM_MOCK = "true"
.\.venv\Scripts\uvicorn.exe main:app --reload --host 0.0.0.0 --port 8000
```

Entry: **`uvicorn main:app`** from `backend/`.

Health check: `GET http://localhost:8000/api/health`

On startup the app calls `init_db()` (schema + seed if empty) and starts a background ingest scheduler (`INGEST_INTERVAL_SECONDS`, default 900).

## Routes

| Method | Path | Notes |
|---|---|---|
| GET | `/api/health` | `{ ok, sources: { gdelt, nominatim, llm, police_uk } }` |
| GET | `/api/events` | bbox + `since`, `category`, `limit` |
| GET | `/api/events/{id}` | 404 → error shape |
| GET | `/api/hotspots` | cluster by rounded lat/lon; `window=24h\|72h\|7d` |
| GET | `/api/stream/events` | SSE heartbeats + ingest progress / new_events |
| GET | `/api/places/search?q=` | Nominatim forward (cached, 1 req/sec) |
| GET | `/api/places/reverse?lat=&lon=` | Nominatim reverse |
| GET | `/api/watchlist` | `{ places: [...] }` |
| POST | `/api/watchlist` | `{ name, lat, lon, radius_km? }` → 201 |
| DELETE | `/api/watchlist/{id}` | `{ ok: true }` |
| GET | `/api/incidents` | bbox + `source=police_uk\|sample\|all` |
| GET | `/api/incidents/heatmap` | `{ points: [{ lat, lon, weight }] }` |
| POST | `/api/ingest/run` | rate-limited background run (cooldown default 30s) |
| POST | `/api/ingest/place` | sync place-scoped live ingest (no watchlist write); see `planning/PLACE_INGEST_HANDOFF.md` |
| GET | `/api/brief` | thin wrapper → `llm.generate_brief` |
| POST | `/api/chat` | thin wrapper → `llm.handle_chat` |

Errors always: `{ "error": { "code", "message" } }`.

## Env vars used

| Var | Default / behavior |
|---|---|
| `INGEST_MOCK` | `false` — when `true`, only `SampleAdapter` (seed JSON/CSV) |
| `LLM_MOCK` | `false` — when `true` (or no OpenRouter key), brief/chat return mock JSON |
| `OPENROUTER_API_KEY` | empty → LLM mock path |
| `GUARDIAN_API_KEY` | empty → Guardian adapter skipped |
| `NOMINATIM_USER_AGENT` | `GeoNews/0.1 (student-project; contact: local)` |
| `INGEST_INTERVAL_SECONDS` | `900` |
| `INGEST_MANUAL_COOLDOWN_SECONDS` | `30` |
| `HOST` / `PORT` | documented for DevOps; uvicorn flags usually set these |

Reads `.env` from **project root** (`GeoNews/.env`) via `python-dotenv`.

## Files created / owned

```
backend/
  main.py                 # FastAPI app + lifespan
  config.py               # env settings
  deps.py / errors.py
  routes/                 # all §10 routers
  ingest/                 # adapters + runner + SSE bus
  geocode/                # Nominatim client (rate limit + memory/SQLite cache)
  classify/               # rule-based category/severity
  llm/                    # generate_brief, handle_chat stubs (LLM Engineer replaces)
  tests/                  # API + ingest unit tests
  db/                     # Phase 1 (do not rewrite schema)
```

**Tiny DB note (handoff):** Nominatim cache creates `geocode_cache` via `CREATE TABLE IF NOT EXISTS` at runtime (not in `schema.sql`). Ingest writes `ingest_runs` with raw SQL in `ingest/runner.py` (table already in schema).

## Import surface

### For LLM Engineer

```python
# Replace bodies; keep signatures stable.
from llm import generate_brief, handle_chat
```

Routes already call these. Live mode without implementation returns **501** with error shape; with `LLM_MOCK=true` returns mock JSON.

### For Frontend

Same-origin `/api/*` and `EventSource('/api/stream/events')`. Contract: `planning/API_CONTRACT.md`.

SSE event names: `heartbeat`, `ingest_progress`, `new_events`.

### For DevOps

- Working directory: `backend/`
- Command: `uvicorn main:app --host 0.0.0.0 --port 8000`
- Mount/persist: project `db/geonews.db`
- Env: see table above; recommend `INGEST_MOCK`/`LLM_MOCK` for CI

### For Database (already consumed)

```python
from db import (
    init_db, connect, get_db_path,
    upsert_event, upsert_incident,
    query_events_bbox, query_incidents_bbox, get_event,
    list_watchlist, add_watchlist_place, delete_watchlist_place, get_watchlist_place,
)
```

## Ingest adapters

| Adapter | When |
|---|---|
| `GdeltAdapter` | Live DOC artlist per watchlist **or** explicit places list |
| `RssAdapter` | Google News RSS per place; pin to supplied centroid |
| `GuardianAdapter` | Key present; mention-filtered; pin to centroid |
| `PoliceUkAdapter` | Point in UK bbox → **incidents** |
| Place ingest | `POST /api/ingest/place` — same adapters, no watchlist write |

Runs off the API event loop (daemon thread). Records each source in `ingest_runs`.

## Tests

```powershell
cd backend
.\.venv\Scripts\python.exe -m pytest db/tests tests llm/tests -v
```

**Result:** **42 passed** (includes place-scoped ingest + LLM mock suite). See `planning/PLACE_INGEST_HANDOFF.md`.
