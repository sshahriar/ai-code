# Frontend handoff — GeoNews

Owner: Frontend Engineer. Stack: Next.js 15 (App Router) + TypeScript + Tailwind + Leaflet.

## Commands

```bash
cd frontend
npm install
npm run dev      # http://localhost:3000; /api/* is proxied to NEXT_DEV_API_ORIGIN (default http://127.0.0.1:8000)
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

CSS variables in `src/app/globals.css` (plan §3). **Dark is default** (`html[data-theme="dark"]`); light overrides live under `html[data-theme="light"]`. Fonts: **Sora** (display) + **IBM Plex Sans** (body).

Theme is browser-only (`localStorage` key `geonews.theme`). An inline `beforeInteractive` script in `layout.tsx` applies the saved theme before paint (no FOUC on static export). Header control: `data-testid="theme-toggle"`.

Map tiles (free Carto, no key):

- Dark: `https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png`
- Light: `https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png`

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
| `ai-panel` | Floating analyst overlay (closed by default) |
| `ai-fab` | Map-corner launcher for the AI overlay |
| `ai-input` | Chat textarea |
| `ai-brief` | Structured brief card |
| `status-dot` | Header health/ingest status |
| `theme-toggle` | Header light/dark control |

Aliases mentioned in the FE brief (`map-canvas`, `search-input`, `chat-input`, `heatmap-toggle`, `event-drawer`) map to the Playwright skill names above (`geonews-map`, `place-search`, `ai-input`, `layer-heatmap`, `intel-drawer`).

## Layout

- `src/components/GeoNewsApp.tsx` — page orchestration
- `src/components/MapView.tsx` — Leaflet clusters + heat (client-only)
- `src/components/MapCanvas.tsx` — `dynamic(..., { ssr: false })`
- Drawer / watchlist / filters / header as siblings; AI analyst is a floating overlay on the map column (`ai-fab` + `ai-panel`)

Do not add Playwright under `test/` from this role; Integration Tester owns E2E.
