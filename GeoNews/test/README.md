# GeoNews Playwright E2E

## Prerequisites

Mocks required (no paid keys):

```bash
LLM_MOCK=true
INGEST_MOCK=true
```

App at `http://localhost:8000`.

## Option A — already-running stack (this machine)

```powershell
cd ..
.\scripts\start_windows.ps1
# ensure .env has LLM_MOCK=true INGEST_MOCK=true
cd test
npm install
npx playwright install chromium
npm test
```

## Option B — test compose (forces mocks)

Stop anything bound to port 8000 first (do **not** `docker compose down -v`).

```powershell
cd ..
docker compose -f test/docker-compose.test.yml up -d --build
cd test
npm test
docker compose -f test/docker-compose.test.yml down
```

Production image does not include Playwright browsers (`test/` is dockerignored).
