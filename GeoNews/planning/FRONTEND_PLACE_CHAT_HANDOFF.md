# Frontend handoff — scoped place ingest + honest chat UX

Owner: Frontend Engineer. Scope: `frontend/` only. No backend, Docker, or Playwright files were touched.

## Why

Two user-facing confusions were fixed:

1. **Chat looked broken.** `POST /api/chat` returns 200 with `mock: true` when the runtime has
   `LLM_MOCK=true` and no OpenRouter key. The UI rendered that identically to a live answer, and the
   API helper also swallowed real failures by returning a chat fixture — so a dead backend and a
   working mock looked the same.
2. **Selecting a place did nothing.** `onPlaceSelect` only moved the map; it never asked the backend
   for data about that place.

## Backend contract consumed

`POST /api/ingest/place`

- Body: `{ name: string, lat: number, lon: number, country_code?: string }`
- Success: `{ ok: true, place: {...}, rows_upserted: number, sources: array, events: Event[] }`
- Errors: existing shape `{ "error": { "code", "message" } }` with an HTTP status.

Frontend tolerates both source shapes (`["gdelt"]` and `[{ source: "gdelt", status: "ok" }]`) and
treats a missing `events` array as "reload the bbox instead of replacing".

## Files changed

| File | Change |
|---|---|
| `src/lib/types.ts` | Added `IngestPlaceBody`, `IngestPlaceInfo`, `IngestSourceReport`, `IngestSourceEntry`, `IngestPlaceResult`; `PlaceResult.country_code`; `mock?: boolean` on `BriefPayload` and `ChatResponse`. |
| `src/lib/api.ts` | Added `ApiError` (with `code`, `status`, `unreachable`) and `describeApiError`. `fetchJson` now parses the backend error envelope. Added `postIngestPlace`. `postChat` / `getBrief` no longer return fixtures — they throw. |
| `src/lib/usePlaceIngest.ts` | **New.** Runs scoped ingest, owns the loading/success/empty/error state machine, request-sequence guard, and retry. |
| `src/components/PlaceIngestStatus.tsx` | **New.** Status line under the search bar. |
| `src/components/AiPanel.tsx` | Added `mockMode` badge and `error` + `onRetry` UI. Removed the misleading "served from fixtures" note on the brief. |
| `src/components/GeoNewsApp.tsx` | Async place selection, mock-mode derivation, chat/brief try-catch, chat retry that does not duplicate the user message. |

Tests added: `src/__tests__/usePlaceIngest.test.ts`, `PlaceIngestStatus.test.tsx`, `AiPanel.test.tsx`,
`GeoNewsApp.place-chat.test.tsx`. Rewrote `src/__tests__/api.test.ts`.

## User-visible behavior

### Selecting a place

1. The map flies to the place immediately — focus and fly target are set before any network call, and
   the map stays mounted and pannable while ingest runs.
2. A status line appears under the search bar: `Fetching news for Chattogram…`
3. On success: `Fetched 4 events for Chattogram · sources: gdelt, rss`. Map pins and the intel drawer
   are replaced with the returned events. If the response omits `events`, the existing bbox reload is
   triggered instead.
4. On no news: `No recent news found for Chattogram. Try a wider time window or a nearby city`.
5. On failure: `Could not fetch news for Chattogram: <backend message>` plus a **Retry** button. An
   unreachable backend reads `Backend unreachable — the GeoNews API did not respond on this origin.`
   Fixtures are never substituted for a failed ingest.
6. Selecting a place does **not** add it to the watchlist.

Watchlist chips use the same code path, so clicking a saved place also refreshes it.

**Stale-response guard:** each ingest gets an incrementing token. If the user picks another place
before the first response lands, the late response is dropped — it cannot overwrite the newer place's
events or status.

### Chat

- A **Mock AI** badge appears whenever `GET /api/health` reports `llm: mock` or a chat/brief response
  carries `mock: true`. A live `mock` flag overrides health, and health is ignored while the app is on
  offline fixtures. Copy: replies are deterministic fixtures; live AI needs an OpenRouter API key in
  the backend environment and `LLM_MOCK=false`. No key or secret is read or stored in the frontend.
- Mock chat remains fully usable — sending, brief cards, and caveats are unchanged.
- `postChat` and `getBrief` failures render a red `ai-error` banner with a **Retry** button. Retrying a
  chat message re-sends it without duplicating the user bubble.
- Offline fixtures are still used for map data only (events, watchlist, hotspots, heatmap, place
  search). Chat and brief never fake success.

## Selectors

Preserved unchanged: `geonews-map`, `place-search`, `intel-drawer`, `event-card`, `event-link`,
`popup-link`, `source-badge`, `watchlist`, `watchlist-chip-*`, `watchlist-add`, `filter-bar`,
`filter-all`, `filter-*`, `window-*`, `layer-heatmap`, `hotspot-list`, `status-dot`, `ai-panel`,
`ai-brief`, `ai-input`.

Added:

| Selector | Purpose |
|---|---|
| `place-ingest-status` | Status container; also carries `data-state="loading\|success\|empty\|error"`. |
| `place-ingest-error` | Error text for a failed scoped ingest. |
| `place-ingest-retry` | Retry button for a failed scoped ingest. |
| `ai-mock-badge` | Mock-mode label in the AI panel. |
| `ai-error` | Chat / brief error banner. |
| `ai-error-retry` | Retry button for the last chat or brief action. |

## Test results

`npm test` (vitest, jsdom — no real network, no map tiles):

```
Test Files  11 passed (11)
     Tests  52 passed (52)
```

Coverage of the new behavior:

- Selecting a place calls `POST /api/ingest/place` with the correct scoped body.
- Loading, success-with-count, zero-result, and error states.
- Retry after an ingest error succeeds.
- Stale response from an earlier place is discarded (sequence guard).
- Response without `events` triggers the bbox reload path instead.
- Watchlist is not mutated by place selection.
- Mock badge from health and from a `mock: true` response; mock chat still sends.
- `postChat` / `getBrief` rejection renders `ai-error`; retry recovers.
- `postIngestPlace` maps the backend error envelope to `ApiError` and never falls back to fixtures.

`npm run build` (Next.js 15.1.0 static export): compiled successfully, types valid, 5 static pages
exported. Route `/` is 10.6 kB, 117 kB first-load JS.

## Notes for the Backend Engineer

- `sources` is rendered as a comma-separated list of names; either the string or object form works.
- Returning `events` in the response is preferred — the UI swaps the map instantly. Omitting it costs
  one extra `GET /api/events` round trip.
- Error messages from `{ "error": { "message" } }` are shown verbatim to the user, so keep them
  user-safe and free of secrets or stack traces.
