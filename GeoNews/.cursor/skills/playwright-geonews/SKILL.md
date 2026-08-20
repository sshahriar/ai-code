---
name: playwright-geonews
description: Writes and runs GeoNews Playwright E2E tests with mock ingest/LLM and stable data-testid selectors. Use when adding, fixing, or running end-to-end tests in test/.
---

# Playwright for GeoNews

E2E lives in `test/`. Run against Docker or local `:8000` with mocks. Do not put Playwright browsers in the production image.

## Required env

```bash
LLM_MOCK=true
INGEST_MOCK=true
```

Use `test/docker-compose.test.yml`. Never require `OPENROUTER_API_KEY` or live GDELT for CI.

## Stable selectors

Frontend must expose these `data-testid` values:

| id | element |
|---|---|
| `geonews-map` | Leaflet container |
| `place-search` | Place search input |
| `intel-drawer` | Right-hand event/crime drawer |
| `event-card` | Selected or listed event card |
| `filter-crime` | Category chip (pattern `filter-{category}`) |
| `layer-heatmap` | Heatmap toggle |
| `watchlist` | Watchlist chip row |
| `watchlist-add` | Add-current-place control |
| `ai-panel` | Chat / brief overlay (open via `ai-fab`) |
| `ai-fab` | Floating analyst launcher |
| `ai-input` | Chat textarea |
| `ai-brief` | Structured brief card |
| `status-dot` | Ingest/LLM status |
| `theme-toggle` | Header light/dark control |

Prefer `getByTestId`. Do not rely on pin pixel clicks unless a test helper exposes `data-event-id`.

## Scenarios (plan.md §17)

1. Fresh start: map visible, Dhaka default, sample pins or event list non-empty
2. Search `London` → map moves; events or empty-state in drawer
3. Filter `crime` → non-crime cards hidden
4. Open an event → drawer shows title + source badge (`gdelt`/`rss`/`sample`/`police_uk`)
5. Watchlist add → reload → chip remains
6. AI mock: type `Brief this place` → `#ai-brief` + caveat text
7. `GET /api/health` → `ok`
8. Heatmap toggle does not crash

## Conventions

- `baseURL`: `http://localhost:8000`
- Timeout 30s for first map tile / API
- If a test fails, file the bug for the **owning engineer** (frontend / backend / LLM). Do not silently rewrite product code in `test/`.
