# Frontend handoff — GeoNews

Owner: Frontend Engineer. Stack: Next.js 15 (App Router) + TypeScript + Tailwind + Leaflet.

## Commands

```bash
cd frontend
npm install
npm run dev      # http://localhost:3000 (API still expected at /api/* — proxy via Docker/FastAPI in prod)
npm test         # Vitest + jsdom
npm run build    # static export → frontend/out/
```

## Static export & basePath

`next.config.ts` uses:

- `output: 'export'`
- `images.unoptimized: true`
- `trailingSlash: true`
- `basePath` / `assetPrefix` from `NEXT_PUBLIC_BASE_PATH` (default **empty** for local Docker / FastAPI serving `/`)

GitHub Pages later:

```bash
set NEXT_PUBLIC_BASE_PATH=/ai-code/GeoNews
npm run build
```

(Unix: `export NEXT_PUBLIC_BASE_PATH=/ai-code/GeoNews`)

DevOps should copy `frontend/out/` into the image (or mount) so FastAPI serves the SPA and `/api/*` same-origin.

## API client

`src/lib/api.ts` calls relative `/api/*` only. On network/HTTP failure it falls back to fixtures in `src/lib/fixtures.ts` (sample wire — badges say **DEMO**, not police reports).

Key endpoints used: events, watchlist CRUD, places/search, incidents/heatmap, hotspots, health, brief, chat, SSE `stream/events`.

## Design tokens

CSS variables in `src/app/globals.css` (plan §3 dark intel theme). Fonts: **Sora** (display) + **IBM Plex Sans** (body). Map: Carto Dark tiles, category colors from leaflet skill.

## Unit tests (2026-08-16)

```
npm test
# Test Files  5 passed (5)
# Tests  11 passed (11)
```

Coverage: FilterChips, EventCard, SourceBadge, MapView props contract (no tiles), API fixture fallback.

## Build (2026-08-16)

```
npm run build
# ✓ Compiled successfully
# ✓ static export (out/)
```

If Windows intermittently errors with `ENOENT` under `.next/`, delete `.next` and rebuild (antivirus/sync race).

## Playwright `data-testid` list

| testid | Where |
|---|---|
| `geonews-map` | Leaflet map container (`MapView` / loading shell) |
| `place-search` | Place search input |
| `filter-bar` | Filter chip row |
| `filter-all` | Clear category |
| `filter-{category}` | e.g. `filter-crime` |
| `window-24h` / `window-72h` / `window-7d` | Time window |
| `layer-heatmap` | Heatmap toggle |
| `intel-drawer` | Event/crime drawer |
| `event-card` | Event list/detail card (`data-event-id`, `data-category`) |
| `source-badge` | Source badge (`data-source`) |
| `watchlist` | Watchlist chip row |
| `watchlist-add` | Add current place |
| `watchlist-chip-{id}` | Individual chip |
| `hotspot-list` | Top hotspots |
| `ai-panel` | Chat / brief panel |
| `ai-input` | Chat textarea |
| `ai-brief` | Structured brief card |
| `status-dot` | Header health/ingest status |

Aliases mentioned in the FE brief (`map-canvas`, `search-input`, `chat-input`, `heatmap-toggle`, `event-drawer`) map to the Playwright skill names above (`geonews-map`, `place-search`, `ai-input`, `layer-heatmap`, `intel-drawer`).

## Layout

- `src/components/GeoNewsApp.tsx` — page orchestration
- `src/components/MapView.tsx` — Leaflet clusters + heat (client-only)
- `src/components/MapCanvas.tsx` — `dynamic(..., { ssr: false })`
- Drawer / watchlist / AI / filters / header as siblings

Do not add Playwright under `test/` from this role; Integration Tester owns E2E.
