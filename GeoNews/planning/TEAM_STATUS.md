# GeoNews Agent Team — Status

**Lead:** Auto (orchestration only — no app code)  
**Spec:** `plan.md`  
**Updated:** 2026-08-17 (place ingest + chat UX)

## Roster

| Teammate | Owns | Status |
|---|---|---|
| Database Engineer | `backend/db/*` | **DONE** |
| Backend API Engineer | FastAPI, ingest, SSE, health | **DONE** — `POST /api/ingest/place` (`planning/PLACE_INGEST_HANDOFF.md`) |
| LLM Engineer | `backend/llm/*` | **DONE** |
| Frontend Engineer | `frontend/*` | **DONE** — place ingest on select + chat mock/errors (`planning/FRONTEND_PLACE_CHAT_HANDOFF.md`) |
| DevOps Engineer | Docker, scripts | **DONE** |
| Integration Tester | `test/*` | **RETEST** after rebuild |

## User-reported fixes

- **Chattogram / place search:** selecting a place triggers scoped live ingest + status line (not watchlist-only ingest).
- **Chat:** mock mode labeled; errors visible with retry. Live AI needs `OPENROUTER_API_KEY` + `LLM_MOCK=false`.

## Stack

Rebuild required after frontend/backend changes: `docker compose up -d --build` → `http://localhost:8000`
