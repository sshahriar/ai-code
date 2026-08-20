---
name: geonews-workflow
description: >-
  Essential developer workflow runbook for GeoNews. Use when running backend,
  frontend, executing test suites (Vitest, Pytest, Playwright), ingesting live news feeds,
  or verifying API contracts.
---

# GeoNews Developer Workflow & Runbook

This skill provides step-by-step instructions for operating, developing, and testing the GeoNews intelligence workstation.

---

## 1. Project Architecture Overview

* **Backend**: Python 3.11+ / FastAPI located in `backend/` with SQLite database (`db/geonews.db`).
* **Frontend**: Next.js 15 (React 18/19) / TailwindCSS located in `frontend/`.
* **Intelligence Pipeline**: GDELT 2.0 Doc API, RSS feeds, Guardian API, Police UK API, Nominatim geocoder, and LLM classification/briefing.
* **Mock Mode Support**: Zero-cost operation via `LLM_MOCK=true` and offline sample data (`backend/ingest/sample.py`).

---

## 2. Running the Development Services

### Backend (FastAPI)
```powershell
# Windows PowerShell
cd backend
python -m uvicorn main:app --reload --port 8000
```

### Frontend (Next.js)
```powershell
cd frontend
npm.cmd run dev
```
Access the application at `http://localhost:3000` (or `http://localhost:8000` when served through reverse proxy/static build).

---

## 3. Running Automated Test Suites

### Frontend Unit Tests (Vitest)
```powershell
cd frontend
npm.cmd run test:unit
```
*Key test files:*
* `src/__tests__/AiPanel.test.tsx`
* `src/__tests__/GeoNewsApp.place-chat.test.tsx`
* `src/__tests__/EventDrawer.test.tsx`

### Backend Unit Tests (Pytest)
```powershell
cd backend
python -m pytest tests/
```

### End-to-End Tests (Playwright)
```powershell
npm.cmd run test:e2e
```

---

## 4. Triggering Ingestion & Verification

* **Live Ingest Check**:
  ```powershell
  python scripts/check_live_ingest.py
  ```
* **API Events Check**:
  ```powershell
  python scripts/check_api_events.py
  ```

---

## 5. Non-Negotiable Project Constraints

1. **Free Tier / Zero-Cost Contract**: Never add paid external services or require mandatory paid API keys.
2. **Preserve Test IDs**: Always keep `data-testid` attributes (`ai-panel`, `ai-input`, `ai-fab`, `ai-brief`, `ai-mock-badge`, `ai-error`, `ai-error-retry`).
3. **CSS Variable Theming**: Style surfaces using CSS tokens (`--bg`, `--panel`, `--panel-2`, `--border`, `--text`, `--accent`, `--alert`, `--warning`).
