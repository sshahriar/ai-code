# GeoNews — AI GeoNews Intelligence Platform

## Project Specification

This is the source-of-truth plan for the **AI GeoNews Intelligence** build. Agents must treat this file as the contract. Do not invent paid APIs, extra auth, or extra services unless this document says so.

---

## 1. Vision

GeoNews is a map-first news intelligence workstation. The user opens a world (or city) map, clicks a place, and immediately sees:

- Recent news geolocated to that area
- Crime / incident reports (or a clear "no official crime feed" fallback)
- An AI briefing: what happened, how serious it is, and what to watch

It should feel like a lightweight **OSINT / situation room** — dark, data-dense, desktop-first — not a generic news homepage.

This project is also a **practice arena** for agentic coding techniques:

| Technique | How GeoNews uses it |
|---|---|
| **MCP server** | Custom `geonews` MCP wraps free news, geocode, and crime tools |
| **Skills** | Project skills teach agents how to call GDELT, Nominatim, LiteLLM, Leaflet |
| **Hooks** | Sandbox outbound HTTP, block secret leaks, format after edits |
| **Sub-agents** | Focused workers: geocode one article, classify one event, write one test |
| **Multi-agents / Agent team** | Frontend, Backend, Database, LLM, Integration Tester, DevOps |
| **Swarm & orchestration** | Ingest swarm over regions; team lead sequences DB → API → LLM → UI → E2E |
| **Plugins** | Context7, frontend-design, Playwright (no plugins that spawn extra sub-agents) |
| **Sandboxing** | Docker + hook-gated shell/MCP; agents never hit paid APIs |

Built entirely by an orchestrated agent team, using **only free resources**.

---

## 2. Why this project (and other ideas)

### Why GeoNews is the right practice project

- **Clear module boundaries** so teammates do not collide (map UI vs ingest API vs schema vs LLM vs Docker vs Playwright).
- **Real external tools** so a custom MCP server is justified (news search, geocode, crime lookup).
- **LLM work that is more than a chatbot** (classify, geocode-from-text, brief, hotspot summary).
- **Free data is good enough** for a convincing demo (GDELT + RSS + OSM + optional UK crime).
- **Same stack pattern as FinAlly** so the course agent-team workflow transfers: FastAPI + static frontend + SQLite + one Docker port.

**Rule:** Leaflet + OSM tiles, SQLite, FastAPI, OpenRouter free/cheap models or `LLM_MOCK=true`. no paid news firehose, no paid geocoder.

---

## 3. User Experience

### First launch

The user runs one start script (or Docker). Browser opens `http://localhost:8000`. No login.

They immediately see:

- A full-bleed **Leaflet map** (OpenStreetMap tiles)
- Default view: **Dhaka, Bangladesh** (user locale), with a world jump control
- Clustered pins for recent events (last 24–72 hours)
- A left **place search** + region chips (Dhaka, London, New York, Tokyo, Nairobi)
- A right **intel drawer**: headlines, crime/incident summary, AI brief
- A dark situation-room aesthetic

### What the user can do

- **Pan / zoom the map** — events load for the visible bounding box
- **Click a pin** — article/event card: title, source, time, category, severity, link
- **Click the map / search a place** — geocode via Nominatim, then load news + crime for that point
- **Filter** — category chips: `crime`, `conflict`, `disaster`, `politics`, `health`, `economy`, `other`
- **Toggle layers** — news pins, crime/incident heatmap, disaster markers
- **Time window** — 24h / 72h / 7d
- **Ask the AI analyst** — "What is happening in Dhanmondi?" / "Summarize violent crime in London this week" / "Is this earthquake news or rumor?"
- **Save a watchlist of places** — Dhaka, London, … persist in SQLite
- **See hotspots** — AI-ranked list of places with unusual event density

### Visual design

- Dark theme: background `#0b1220`, panels `#121a2b`, borders `#243049`
- Accent cyan `#22d3ee`, alert red `#f43f5e`, warning amber `#f59e0b`, safe green `#34d399`
- Map: dark Carto / OSM tiles (free). Pins colored by category. Clusters for density.
- Connection / ingest status dot in the header (green = live, yellow = ingesting, red = source down)
- Desktop-first, functional on tablet

### Color by category

| Category | Pin / chip |
|---|---|
| crime | `#f43f5e` |
| conflict | `#fb7185` |
| disaster | `#f59e0b` |
| politics | `#818cf8` |
| health | `#34d399` |
| economy | `#22d3ee` |
| other | `#94a3b8` |

---

## 4. Architecture Overview

### Single container, single port

```
┌─────────────────────────────────────────────────────────────┐
│  Docker Container (port 8000)                               │
│                                                             │
│  FastAPI (Python / uv)                                      │
│  ├── /api/*            REST                                 │
│  ├── /api/stream/*     SSE (ingest progress + new events)   │
│  └── /*                Static frontend (Next.js export)     │
│                                                             │
│  SQLite  db/geonews.db  (volume-mounted)                    │
│  Background: ingest scheduler (GDELT / RSS / crime)         │
│  LLM: LiteLLM → OpenRouter (Cerebras) or LLM_MOCK           │
└─────────────────────────────────────────────────────────────┘
```

- **Frontend**: React + TypeScript, `output: 'export'`, Leaflet map, Tailwind
- **Backend**: FastAPI, `uv` project
- **Database**: SQLite at `db/geonews.db`
- **Realtime**: SSE for ingest ticks and newly inserted events (not WebSockets)
- **AI**: LiteLLM → OpenRouter, structured outputs, Cerebras provider (same as FinAlly)
- **Maps**: Leaflet + free OSM / Carto dark tiles — **no Google Maps key**
- **Geocoding**: Nominatim (OSM), polite User-Agent, 1 req/sec cache

### Why these choices

| Decision | Rationale |
|---|---|
| Leaflet + OSM | Free, no billing surprise, good enough for a demo |
| GDELT as primary news | Free, global, already geolocated, no API key |
| Guardian + RSS as secondary | Readable articles when GDELT is sparse or noisy |
| Police.uk as optional crime | Real official crime, free, no key — UK only |
| SQLite | Single user, zero ops |
| SSE | One-way "new events arrived" is enough |
| Static Next export + FastAPI | One origin, one port, one container |
| LLM_MOCK | Free E2E and offline demos |

---

## 5. Free data sources (no paid keys)

Use only these. If a source is down, degrade gracefully and show it in the status bar.

### News / events

| Source | Cost | What we take | Notes |
|---|---|---|---|
| **GDELT GEO / DOC 2.0** | Free, no key | Events with lat/lon, tone, source URL | Primary firehose. Cap pages. Cache 15 min. |
| **The Guardian Open Platform** | Free key (optional) | Headlines + trail text | If `GUARDIAN_API_KEY` empty, skip |
| **Google News RSS** | Free, no key | `https://news.google.com/rss/search?q={place}+when:1d` | Fallback per place |
| **ReliefWeb API** | Free, no key | Disasters / humanitarian | Optional layer |
| **Wikipedia Current Events** | Free | Daily digest | Optional seed / fallback |

### Crime / incidents

| Source | Cost | Coverage | Notes |
|---|---|---|---|
| **Police.uk** | Free, no key | England & Wales | Street-level crime by lat/lon |
| **GDELT CAMEO** (assault, kidnap, protest) | Free | Global | Proxy "incident" layer when no official crime API |
| **Local open CSV** (optional) | Free | Whatever we seed | `backend/db/seed/sample_incidents.csv` for Dhaka demo |

**Honest UX:** if the user clicks Dhaka, do **not** pretend Police.uk data exists. Show:

1. GDELT + RSS news tagged `crime` / `conflict`
2. Seeded sample incidents (clearly labeled **Demo / sample**)
3. AI brief that says official crime feeds are unavailable for this country

### Geo / map

| Source | Cost | Use |
|---|---|---|
| **Nominatim** | Free | Place search + reverse geocode |
| **OSM tiles / Carto Dark** | Free | Basemap |
| **Leaflet.markercluster** | Free | Pin clustering |
| **Leaflet.heat** | Free | Crime / incident heatmap |

### LLM

| Source | Cost | Use |
|---|---|---|
| **OpenRouter + Cerebras** | Free/cheap tier | Briefings + classification |
| **`LLM_MOCK=true`** | Free | Tests + no-key demo |

Never call paid geocoders (Google, Mapbox) or paid news APIs (NewsAPI paid, Mediastack, etc.).

---

## 6. Directory structure

```
GeoNews/
├── plan.md                      # This document (source of truth)
├── AGENTS.md                    # Team roles + file ownership
├── frontend/                    # Next.js TypeScript (static export)
├── backend/                     # FastAPI uv project
│   └── db/                      # Schema SQL, seed CSV, init logic
├── mcp/geonews/                 # Custom MCP server (stdio)
│   ├── server.mjs
│   ├── package.json
│   └── README.md
├── .cursor/
│   ├── skills/                  # Cursor project skills
│   ├── mcp.json                 # geonews + Context7 + Playwright
│   ├── hooks.json
│   └── hooks/                   # Sandbox / secret / format / prompt-review hooks
├── planning/                    # Extra agent notes (API contract, reviews)
├── scripts/
│   ├── start_mac.sh
│   ├── stop_mac.sh
│   ├── start_windows.ps1
│   └── stop_windows.ps1
├── test/                        # Playwright E2E + docker-compose.test.yml
├── db/                          # Runtime volume (geonews.db gitignored)
├── Dockerfile
├── docker-compose.yml
├── .env.example
└── .gitignore
```

### Key boundaries (do not cross)

- **`frontend/`** — React only. Talks to `/api/*` and `/api/stream/*`. Owns Leaflet, filters, chat UI.
- **`backend/`** — FastAPI, ingest, schema, LLM, SSE. Does not import frontend code.
- **`backend/db/`** — SQL + seed only. Database Engineer owns this.
- **`mcp/geonews/`** — MCP tools for **agents** (and optional backend reuse). Must not start the web app.
- **`test/`** — Playwright only. Integration Tester owns this.
- **`scripts/` + Dockerfile** — DevOps owns this.
- **`planning/`** — shared contract notes. Team lead writes status here.

---

## 7. Environment variables

```bash
# Optional: OpenRouter for live AI briefings
OPENROUTER_API_KEY=

# Optional: Guardian Open Platform (free key from open-platform.theguardian.com)
GUARDIAN_API_KEY=

# Required for Nominatim politeness (do not use a generic curl UA)
NOMINATIM_USER_AGENT=GeoNews/0.1 (student-project; contact: local)

# Testing / offline
LLM_MOCK=false
INGEST_MOCK=false

# Optional tuning
INGEST_INTERVAL_SECONDS=900
DEFAULT_LAT=23.8103
DEFAULT_LON=90.4125
DEFAULT_PLACE=Dhaka
```

### Behavior

- No `OPENROUTER_API_KEY` or `LLM_MOCK=true` → deterministic mock briefs
- `INGEST_MOCK=true` → load seed events only (Playwright + first-run demo)
- Empty `GUARDIAN_API_KEY` → skip Guardian, use GDELT + RSS
- Backend reads `.env` from project root

---

## 8. Product ideas on the map (v1 scope)

Ship **v1** only. Everything else is stretch.

### v1 (must)

1. Map + place search + default Dhaka
2. Event pins from ingest (GDELT and/or seed)
3. Click pin → article card
4. Click place → news list for bbox / radius
5. Category filters + 24h/72h/7d
6. Crime layer: Police.uk when in UK, else GDELT-crime + sample CSV
7. Heatmap toggle for incidents
8. Place watchlist (SQLite)
9. AI analyst chat with structured actions (`brief_place`, `classify_event`, `list_hotspots`)
10. SSE: "N new events in view"
11. Health endpoint + Docker + start scripts
12. Unit tests + Playwright smoke

### Stretch (only if v1 is green)

- Time slider animation
- Compare two cities
- User-submitted incident (no auth, local only, marked unverified)
- Overpass POIs (hospitals / police stations) near a hotspot
- Daily email-less "morning brief" page for watchlist places
- Bangladesh-specific: seed thana boundaries as GeoJSON if a free file is added under `backend/db/seed/`

### Ideas the map should make obvious

- **Hotspot pulses** — places with event count >> 7-day baseline
- **Severity rings** — disaster / violent crime get a larger halo
- **Source honesty** — each card shows `gdelt` | `guardian` | `rss` | `police_uk` | `sample`
- **Empty states** — ocean clicks and tiny villages say "no geolocated events; try a city"

---

## 9. Database

### SQLite, lazy init

On startup / first request: create tables if missing, seed default watchlist + sample events if empty.

All tables include `user_id TEXT DEFAULT 'default'` for a future multi-user path. v1 is single-user.

### Schema

**places_watchlist**
- `id` TEXT PK (UUID)
- `user_id` TEXT DEFAULT `'default'`
- `name` TEXT
- `lat` REAL, `lon` REAL
- `radius_km` REAL DEFAULT `25`
- `added_at` TEXT
- UNIQUE `(user_id, name)`

**events**
- `id` TEXT PK
- `source` TEXT (`gdelt`, `guardian`, `rss`, `police_uk`, `reliefweb`, `sample`)
- `external_id` TEXT
- `title` TEXT
- `summary` TEXT
- `url` TEXT
- `source_name` TEXT
- `category` TEXT (`crime`, `conflict`, `disaster`, `politics`, `health`, `economy`, `other`)
- `severity` INTEGER `1–5`
- `lat` REAL, `lon` REAL
- `place_name` TEXT
- `country_code` TEXT
- `occurred_at` TEXT
- `ingested_at` TEXT
- `raw_json` TEXT
- UNIQUE `(source, external_id)`
- Indexes: `(lat, lon)`, `occurred_at`, `category`

**incidents** (crime / official or sample)
- `id` TEXT PK
- `source` TEXT (`police_uk`, `sample`)
- `external_id` TEXT
- `category` TEXT
- `lat` REAL, `lon` REAL
- `place_name` TEXT
- `occurred_at` TEXT
- `raw_json` TEXT
- UNIQUE `(source, external_id)`

**chat_messages**
- `id` TEXT PK
- `user_id` TEXT DEFAULT `'default'`
- `role` TEXT (`user` | `assistant`)
- `content` TEXT
- `actions` TEXT (JSON)
- `created_at` TEXT

**ingest_runs**
- `id` TEXT PK
- `source` TEXT
- `started_at` TEXT
- `finished_at` TEXT
- `status` TEXT (`ok`, `error`, `skipped`)
- `rows_upserted` INTEGER
- `error` TEXT

### Seed

- Watchlist: Dhaka, London, New York, Tokyo
- `sample_incidents.csv`: ~20 demo points around Dhaka (labeled sample)
- `sample_events.json`: ~30 mixed-category headlines with real-looking coords (for `INGEST_MOCK`)

---

## 10. API endpoints

### Map / events
| Method | Path | Description |
|---|---|---|
| GET | `/api/events` | Query: `min_lat,min_lon,max_lat,max_lon,since,category,limit` |
| GET | `/api/events/{id}` | One event |
| GET | `/api/hotspots` | Query: `bbox` or `place`, `window` → clustered counts + score |
| GET | `/api/stream/events` | SSE: ingest progress + new event ids |

### Places
| Method | Path | Description |
|---|---|---|
| GET | `/api/places/search?q=` | Nominatim wrapper (cached) |
| GET | `/api/places/reverse?lat=&lon=` | Reverse geocode (cached) |
| GET | `/api/watchlist` | Saved places |
| POST | `/api/watchlist` | `{name, lat, lon, radius_km}` |
| DELETE | `/api/watchlist/{id}` | Remove place |

### Crime / incidents
| Method | Path | Description |
|---|---|---|
| GET | `/api/incidents` | Same bbox filters; `source=police_uk\|sample\|all` |
| GET | `/api/incidents/heatmap` | `{points: [{lat,lon,weight}]}` for Leaflet.heat |

### Intel / chat
| Method | Path | Description |
|---|---|---|
| GET | `/api/brief?lat=&lon=&radius_km=&window=` | One-shot AI place brief (no chat history) |
| POST | `/api/chat` | `{message, lat?, lon?, place_name?}` → structured JSON |

### System
| Method | Path | Description |
|---|---|---|
| GET | `/api/health` | `{ok, sources: {gdelt, nominatim, llm, police_uk}}` |
| POST | `/api/ingest/run` | Manual ingest (dev / tester). Rate-limited. |

### Response shapes (contract)

`GET /api/events` returns:

```json
{
  "events": [
    {
      "id": "uuid",
      "source": "gdelt",
      "title": "…",
      "summary": "…",
      "url": "https://…",
      "source_name": "Reuters",
      "category": "crime",
      "severity": 3,
      "lat": 23.81,
      "lon": 90.41,
      "place_name": "Dhaka",
      "occurred_at": "2026-08-16T01:00:00Z"
    }
  ]
}
```

Errors: `{ "error": { "code": "…", "message": "…" } }` with proper HTTP status.

---

## 11. Ingest pipeline (backend)

One interface, several adapters. A background task runs every `INGEST_INTERVAL_SECONDS` (default 15 min). Manual `POST /api/ingest/run` allowed.

```
adapters → normalize → upsert events/incidents → emit SSE
```

**Adapters (v1):**

1. `GdeltAdapter` — last 15 min GEO/DOC export, keep rows with lat/lon, map CAMEO/tone → category + severity
2. `RssAdapter` — Google News RSS for each watchlist place; geocode place centroid if article has no coords
3. `GuardianAdapter` — if key present
4. `PoliceUkAdapter` — only if a watchlist point is inside the UK bbox
5. `SampleAdapter` — always available; only writer when `INGEST_MOCK=true` or DB empty

**Rules:**

- Dedup on `(source, external_id)`
- Nominatim: in-memory + SQLite cache, **max 1 req/sec**, custom User-Agent
- GDELT: do not download unbounded files; cap to latest window
- Never block the API event loop on a full ingest — use a background task / thread
- Record every run in `ingest_runs`

---

## 12. LLM integration

When writing LLM call code, use the **`cerebras-inference`** skill: LiteLLM via OpenRouter, model `openrouter/openai/gpt-oss-120b`, Cerebras provider, structured outputs.

`OPENROUTER_API_KEY` lives in `.env`.

### Flow for `POST /api/chat`

1. Resolve place (from request coords, last watchlist item, or default Dhaka)
2. Load events + incidents in radius / window
3. Load recent `chat_messages`
4. Call LLM with structured output
5. Execute allowed actions (watchlist add/remove only — no destructive DB wipes)
6. Persist messages
7. Return full JSON (no token stream)

### Structured output

```json
{
  "message": "Conversational brief for the user",
  "brief": {
    "place_name": "Dhaka",
    "window": "72h",
    "headline": "…",
    "risk_level": "low|moderate|high|unknown",
    "bullets": ["…"],
    "caveats": ["Official crime feed unavailable for BD; using news + sample."]
  },
  "watchlist_changes": [
    {"name": "London", "lat": 51.5, "lon": -0.12, "action": "add"}
  ],
  "highlight_event_ids": ["uuid"]
}
```

### System prompt

Act as **GeoNews Analyst**. Be concise, sourced, and honest about uncertainty. Never invent coordinates or official crime statistics. If only sample/GDELT proxies exist, say so. Always return valid structured JSON.

### Mock mode

`LLM_MOCK=true` returns a fixture brief for Dhaka / London so Playwright does not need a key.

---

## 13. Frontend design

Single page. Frontend Engineer chooses component split, but the UI must include:

- **Map canvas** — Leaflet, dark tiles, marker clusters, optional heat layer
- **Search bar** — Nominatim via `/api/places/search`
- **Filter chips** — category + time window + layer toggles
- **Intel drawer** — event list, selected event, crime summary counts
- **AI panel** — collapsible chat, loading state, brief card, caveats
- **Watchlist** — chips that fly the map
- **Header** — title, ingest/LLM status, last ingest time
- **Hotspot list** — top 5 from `/api/hotspots`

### Technical notes

- `react-leaflet` + `leaflet.markercluster` + `leaflet.heat`
- `EventSource` on `/api/stream/events`
- Same-origin `/api/*` only
- Tailwind + the color tokens in §3
- Fit bounds when a place is selected
- Do not render 10k raw markers — always cluster; heatmap for incidents

---

## 14. Skills (required)

Create **project** skills (not personal) under `.cursor/skills/<name>/SKILL.md` only.

Keep each `SKILL.md` under 200 lines. Description must include WHAT + WHEN.

### Skill 1 — `cerebras-inference`

LiteLLM + OpenRouter + Cerebras + structured outputs.  
**When:** any new LLM call.

### Skill 2 — `geonews-ingest`

Teaches agents how to pull **free** sources only.

- GDELT last-15-min GEO export URL pattern and row → `events` mapping
- Google News RSS query pattern
- Guardian search endpoint (optional key)
- Police.uk `https://data.police.uk/api/crimes-street/all-crime?lat=&lng=`
- Rate limits, caching, `INGEST_MOCK`
- **When:** adding/changing an ingest adapter

### Skill 3 — `nominatim-geocode`

- Forward + reverse
- Required User-Agent
- 1 req/sec
- Cache key = normalized query or `round(lat,4),round(lon,4)`
- Never use Google/Mapbox
- **When:** place search, RSS without coords, watchlist add-by-name

### Skill 4 — `leaflet-geonews-map`

- `react-leaflet` patterns for Next static export (`dynamic` import, `ssr: false`)
- Cluster group, heat layer, flyTo, fitBounds
- Category color map from this plan
- **When:** any map UI work

### Skill 5 — `geonews-classify`

- Map GDELT CAMEO / tone / keywords → `category` + `severity 1–5`
- LLM fallback only when rules cannot decide
- Never classify as official crime unless `source=police_uk`
- **When:** ingest normalize or LLM classify action

### Skill 6 — `playwright-geonews`

- Selectors and fixtures for map, drawer, chat, watchlist
- `INGEST_MOCK=true` + `LLM_MOCK=true`
- **When:** writing or fixing E2E tests

---

## 15. MCP servers (required)

### A. Custom project MCP — `geonews` (must build)

Path: `mcp/geonews/server.mjs`  
Transport: stdio  
Register in `.cursor/mcp.json`.

This is the main practice MCP. Agents (and later humans) use it instead of inventing curl commands.

| Tool | Args | Returns |
|---|---|---|
| `search_news` | `query, lat?, lon?, radius_km?, since_hours?` | Normalized event list (GDELT/RSS) |
| `geocode_place` | `q` | `{name, lat, lon, bbox}` |
| `reverse_geocode` | `lat, lon` | `{name, country_code}` |
| `lookup_crime` | `lat, lon, months?` | Police.uk rows **or** `{available: false, reason}` |
| `list_hotspots` | `min_lat, min_lon, max_lat, max_lon, window` | Clustered counts |
| `classify_text` | `title, summary` | `{category, severity, rationale}` (rules first; LLM optional) |
| `health_sources` | — | Same shape as `/api/health` |

**Rules for the MCP server:**

- Same adapters as the backend (share code under `backend/` **or** a tiny shared package — do not fork logic)
- Cache + rate-limit Nominatim and GDELT
- No secrets in tool output
- `INGEST_MOCK` respected
- README with example tool calls

### B. Existing MCPs to enable (free)

| MCP | Why | Scope |
|---|---|---|
| **Context7** | Current Leaflet / FastAPI / Playwright / Next docs | Project plugin or MCP |
| **Playwright** | Integration Tester drives the browser | Project plugin |
| **GitHub** (optional) | PRs after the team run | Only if a token already exists |

Do **not** add Jira/Atlassian unless you already use it. Do **not** add paid map MCPs.

### `.cursor/mcp.json` sketch

```json
{
  "mcpServers": {
    "geonews": {
      "command": "node",
      "args": ["mcp/geonews/server.mjs"]
    },
    "context7": {
      "url": "https://mcp.context7.com/mcp"
    },
    "playwright": {
      "command": "npx",
      "args": ["-y", "@playwright/mcp@latest"]
    }
  }
}
```

---

## 16. Hooks, plugins, sandboxing

### Cursor MCP / plugins (project scope only)

Enable only these in `.cursor/mcp.json` — they do not spawn competing swarms:

- `geonews` (project server)
- `context7`
- `playwright`

Do **not** add extra swarm/orchestrator plugins during the agent-team run.

### Hooks (project: `.cursor/hooks.json`)

| Event | Hook | Behavior |
|---|---|---|
| `beforeShellExecution` | `sandbox-shell` | Deny `rm -rf`, force-push, prod deploy, curl to non-allowlisted hosts |
| `beforeMCPExecution` | `sandbox-mcp` | Allow only `geonews`, `context7`, `playwright` |
| `beforeSubmitPrompt` | `no-secrets` | Block if prompt looks like it pastes `.env` keys |
| `afterFileEdit` | `format-hint` | Remind Python (`ruff`) / TS format on `backend/` `frontend/` |

Allowlisted outbound hosts for ingest/MCP: `api.gdeltproject.org`, `data.police.uk`, `nominatim.openstreetmap.org`, `content.guardianapis.com`, `news.google.com`, `openrouter.ai`, `earthquake.usgs.gov`, `eonet.gsfc.nasa.gov`.

### Sandboxing

- App runs in Docker; SQLite on a named volume
- Agent team should use Docker / a local venv, not install packages globally
- Playwright runs in `docker-compose.test.yml`, not in the production image
- `LLM_MOCK` + `INGEST_MOCK` in CI / E2E so the swarm cannot burn API quota
- Nominatim must send a real User-Agent (policy; not optional)

### Cursor agent team

Use Cursor Task / sub-agents from the Team lead.

---

## 17. Agent team (orchestration)

### Roles and ownership

| Teammate | Owns | Must not touch |
|---|---|---|
| **Team lead** | Task list, contracts in `planning/`, unblock order | App code unless a teammate is gone |
| **Database Engineer** | `backend/db/*`, schema, seed, lazy init, DB unit tests | Frontend, Docker, Playwright |
| **Backend API Engineer** | FastAPI routes, ingest adapters, SSE, health | LLM prompt/schema internals, frontend, Dockerfile |
| **LLM Engineer** | Chat/brief, structured output, mock mode, LLM unit tests | Leaflet UI, Docker |
| **Frontend Engineer** | `frontend/*`, map, drawer, chat UI, frontend unit tests | Python, SQL, Playwright folder |
| **DevOps Engineer** | Dockerfile, compose, scripts, `.env.example` | Feature logic |
<!-- | **Integration Tester** | `test/*` Playwright E2E, run them, file bugs | Permanent feature ownership — report back | -->

### Build order (lead enforces this)

1. Database Engineer — schema + seed (unblocks everyone)
2. Backend API Engineer — health, events, places, incidents, ingest mock (can start after schema draft)
3. LLM Engineer — parallel with backend once `/api/events` shape exists
4. Frontend Engineer — parallel with mock API / fixtures after contract is written
5. DevOps Engineer — parallel once backend has a hello-world `uvicorn` entry
<!-- 6. Integration Tester — **only when** `scripts/start_windows.ps1` (or mac) brings up `:8000` -->

If E2E fails, lead **reopens the owning teammate**. Tester does not silently rewrite the product.

### Shared contract

Before parallel UI/API work, Backend + Frontend agree on §10 JSON in `planning/API_CONTRACT.md` (short). Lead writes it if they do not.

### Unit tests (every builder)

- **DB:** init, seed, unique constraints, bbox query
- **Backend:** adapter normalize, bbox filter, ingest mock upsert, health
- **LLM:** parse structured output, mock fixtures, reject invented crime stats in mock
- **Frontend:** filter chips, event card, mock map props (jsdom — no real tiles required)

### Playwright (Integration Tester)

`test/docker-compose.test.yml` with `LLM_MOCK=true` `INGEST_MOCK=true`.

Scenarios:

1. Fresh start: map canvas visible, default place Dhaka, sample pins exist
2. Search "London" → map flies, events or empty-state render
3. Category filter `crime` hides non-crime pins
4. Click a pin → drawer shows title + source badge
5. Watchlist: add place, reload, chip still there
6. AI chat mock: send "Brief this place" → brief card + caveats
7. Health: `/api/health` returns `ok`
8. Heatmap toggle does not crash

---

## 18. Docker & scripts

Multi-stage:

1. Node 20 — `frontend/` `npm ci && npm run build`
2. Python 3.12 + uv — `backend/` `uv sync`, copy static export, expose `8000`

```bash
docker run -v geonews-data:/app/db -p 8000:8000 --env-file .env geonews
```

Scripts (idempotent):

- `scripts/start_windows.ps1` / `stop_windows.ps1` (this machine)
- `scripts/start_mac.sh` / `stop_mac.sh`

Stop does **not** delete the volume.

---

## 19. How techniques map to the build (study checklist)

Use this while the team runs so you can see each practice topic happen.

### MCP server

- [ ] `mcp/geonews` implements the 7 tools
- [ ] Agent uses `search_news` / `geocode_place` instead of raw curl
- [ ] `health_sources` matches `/api/health`

### Skills

- [ ] Six skills exist under `.cursor/skills`
- [ ] LLM Engineer follows `cerebras-inference`
- [ ] Frontend follows `leaflet-geonews-map` (dynamic import, no SSR crash)

### Hooks

- [ ] Shell hook blocks a destructive command in a dry run
- [ ] MCP hook allows `geonews` only
- [ ] Secret hook flags a pasted API key

### Sub-agents

- [ ] Lead (or a teammate) spawns a short-lived geocode / classify / test worker that **returns** a summary

### Multi-agents / team

- [ ] Six named teammates + lead
- [ ] File ownership respected
- [ ] Parallel Task / sub-agents used to inspect teammates

### Swarm & orchestration

- **Swarm (optional stretch):** one ingest fan-out — 4 watchlist cities in parallel adapters, then merge
- **Orchestration (required):** serial DB → parallel API+LLM+Frontend+DevOps → Tester → fix loop

### Plugins

- [ ] Context7 used for Leaflet / FastAPI docs
- [ ] Playwright plugin used by tester
- [ ] frontend-design used by Frontend Engineer

### Sandboxing

- [ ] E2E uses mock flags
- [ ] Nominatim User-Agent set
- [ ] Production image has no Playwright browsers
- [ ] `.env` gitignored

---

## 20. Agent-team kickoff prompt (paste this)

Use after `plan.md`, `.cursor/skills`, `.cursor/mcp.json`, and hooks exist. Team lead uses Cursor Task / sub-agents with these names.

```
Create an Agent Team to complete the project as defined in plan.md.

Team-members:
- a Front-end engineer to work on the frontend
- a Backend API Engineer on the backend
- a Database Engineer on all DB related code
- an LLM Engineer on the LLM calls
While all team-members should work on unit tests, there should be an
Integration Tester team-member that builds and runs end-to-end Playwright
tests when ready, reporting issues back to be fixed by the team-members.
Finally, a Devops engineer for the Docker container and the scripts.

Rules:
- plan.md is the only product spec. Follow free-resource constraints.
- Use project skills (cerebras-inference, geonews-ingest, nominatim-geocode,
  leaflet-geonews-map, geonews-classify, playwright-geonews).
- Use the geonews MCP tools for news/geocode/crime lookups. Do not add paid APIs.
- Database Engineer goes first. Integration Tester goes last.
- Wait for teammates to finish their current task before you personally write app code.
- If Playwright fails, reopen the owning engineer; do not have the tester own the fix.
- LLM_MOCK and INGEST_MOCK must work for a key-free demo.
```

---

## 21. Implementation phases (for the lead)

| Phase | Outcome |
|---|---|
| **0. Scaffold** | This plan, Cursor skills, MCP stub, hooks, `.cursor/mcp.json`, `.env.example` |
| **1. Data** | Schema, seed, bbox queries, tests |
| **2. API + ingest mock** | All routes with sample data, SSE stub, health |
| **3. Live adapters** | GDELT + Nominatim + RSS + Police.uk behind cache |
| **4. LLM** | Brief + chat + mock |
| **5. Map UI** | Leaflet, filters, drawer, watchlist |
| **6. MCP** | Tools wired to the same adapters |
| **7. Docker** | One-command start on Windows + Mac |
| **8. E2E** | Playwright green on mocks |
| **9. Fix loop** | Tester → owners → retest |

Phase 0 can be done by you (human) or a single agent **before** the expensive team run. Phases 1–8 are the team.

---

## 22. Success criteria

The project is done when:

1. `scripts/start_windows.ps1` (or mac) opens `http://localhost:8000`
2. Map shows clustered sample/live events around Dhaka
3. Searching London moves the map and loads events or a clean empty state
4. Crime heatmap works for a UK point; Dhaka shows sample + honest caveat
5. AI brief returns structured JSON (live or mock)
6. Custom `geonews` MCP tools work from the agent
7. Unit tests pass in `frontend/` and `backend/`
8. Playwright mock suite passes
9. No paid API keys are required for the happy path

---

## 23. Out of scope

- User accounts, OAuth, multi-tenant
- Google Maps / Mapbox / paid geocoders
- NewsAPI paid tier, scraping paywalled HTML
- Real-time WebSockets
- Mobile native apps
- Publishing live crime accusations about named people
- Storing full article HTML
- Kubernetes / cloud deploy (stretch only)

**Safety:** treat crime layers as **unverified OSINT / official open data**. UI must show source + caveat. Do not present sample Dhaka points as real police reports.

helo
