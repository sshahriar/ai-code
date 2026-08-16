# DevOps Handoff — GeoNews

DevOps Engineer deliverable (`plan.md` §§7, 16, 18, 22). Owns Docker, compose, start/stop scripts, `.env.example`, and volume wiring. Does **not** own FastAPI features, React UI, LLM prompts, or DB schema.

## Quick start (this machine — Windows)

```powershell
cd c:\Users\Pavilion\Documents\ai_coder\claude_code\GeoNews
.\scripts\start_windows.ps1
```

- Creates `.env` from `.env.example` if missing
- `docker compose up -d --build`
- Opens `http://localhost:8000` when `/api/health` responds

Stop (keeps SQLite volume):

```powershell
.\scripts\stop_windows.ps1
```

## Quick start (Mac / Linux)

```bash
cd /path/to/GeoNews
chmod +x scripts/start_mac.sh scripts/stop_mac.sh
./scripts/start_mac.sh
./scripts/stop_mac.sh   # does not delete volume
```

## Image build (manual)

```powershell
cd c:\Users\Pavilion\Documents\ai_coder\claude_code\GeoNews
docker build -t geonews:local .
docker run --rm -p 8000:8000 --env-file .env -v geonews-data:/app/db geonews:local
```

Or compose:

```powershell
docker compose up -d --build
```

## Free-resource demo (no API quota)

In `.env` (defaults in `.env.example`):

```bash
LLM_MOCK=true
INGEST_MOCK=true
OPENROUTER_API_KEY=
GUARDIAN_API_KEY=
```

Do **not** put real keys in CI examples. Live OpenRouter/Guardian only when you intentionally set keys and turn mocks off.

## Env notes

| Var | Notes |
|---|---|
| `OPENROUTER_API_KEY` | Empty → LLM mock path |
| `GUARDIAN_API_KEY` | Empty → Guardian skipped |
| `NOMINATIM_USER_AGENT` | Required politeness string |
| `LLM_MOCK` / `INGEST_MOCK` | `true` for offline / Playwright / swarm safety |
| `INGEST_INTERVAL_SECONDS` | Default `900` |
| `DEFAULT_LAT` / `DEFAULT_LON` / `DEFAULT_PLACE` | Dhaka defaults (frontend/backend consumers) |

Backend loads project-root `.env` via `python-dotenv` (`BACKEND_HANDOFF.md`). Compose also injects via `env_file: .env`.

## Volume behavior

| Item | Behavior |
|---|---|
| Named volume | `geonews-data` → `/app/db` in container |
| DB file | `/app/db/geonews.db` (matches `backend/db` `PROJECT_ROOT/db/geonews.db`) |
| `stop_*.` scripts | `docker compose down` **without** `-v` |
| Wipe data | Explicit: `docker volume rm geonews-data` (destructive; not in stop scripts) |

## Container layout

```
/app/backend/     # WORKDIR; uvicorn docker_asgi:app
/app/static/      # Next.js export (frontend/out)
/app/db/          # volume mount
```

Entry: `uvicorn docker_asgi:app --host 0.0.0.0 --port 8000`  
`docker_asgi.py` wraps `main:app` and mounts `/app/static` when `index.html` exists (DevOps glue; not feature routes).

Production image does **not** include Playwright browsers or `test/`.

## Frontend build requirement

Dockerfile stage 1 always runs `npm ci && npm run build` in `frontend/` (host `frontend/out` is dockerignored). Stage 2 copies that export to `/app/static` — **no placeholder HTML**. Aligns with `planning/FRONTEND_HANDOFF.md` (`output: "export"`, empty `basePath` for Docker).

Do not add Playwright to the production Dockerfile (`test/` is dockerignored).

## Coordination

| Teammate | Note |
|---|---|
| Backend | Local venv: `uvicorn main:app` from `backend/`; Docker: `docker_asgi:app` |
| Frontend | Green static export; image rebuilds `out/` in Node stage |
| Integration Tester | Own `test/docker-compose.test.yml` + Playwright; `LLM_MOCK=true` `INGEST_MOCK=true` |
| Agents | Prefer Docker / project venv — do not install packages globally |

## Files owned

```
.env.example
.gitignore          # .env + db/*.db (+ common junk)
.dockerignore
Dockerfile
docker-compose.yml
docker_asgi.py
scripts/start_windows.ps1
scripts/stop_windows.ps1
scripts/start_mac.sh
scripts/stop_mac.sh
planning/DEVOPS_HANDOFF.md
```

## Verification (2026-08-16)

| Check | Result |
|---|---|
| `docker compose up -d --build` | **OK** — Node stage exported real `frontend/out`; image `geonews:local` |
| `GET /api/health` | **OK** — `{ ok: true, sources.llm: "mock", ... }` with `LLM_MOCK`/`INGEST_MOCK` |
| `GET /` | **OK** — real Next export (`GeoNews - Place Intelligence`) |
| Named volume | `geonews-data` → `/app/db` (stop scripts omit `-v`) |
| Playwright in image | **Not included** |

## Health check

`GET http://localhost:8000/api/health` → `{ ok, sources: ... }`
