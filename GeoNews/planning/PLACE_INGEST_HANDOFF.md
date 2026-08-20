# Place ingest handoff

Backend-only: `POST /api/ingest/place` fetches and persists news for an arbitrary geocoded place **without** writing to `places_watchlist`.

## Endpoint

`POST /api/ingest/place`

### Request

```json
{
  "name": "Chattogram",
  "lat": 22.3569,
  "lon": 91.7832,
  "country_code": "bd"
}
```

`country_code` is optional. `name` / `lat` / `lon` are required.

### Success (200)

```json
{
  "ok": true,
  "place": { "name": "Chattogram", "lat": 22.3569, "lon": 91.7832, "country_code": "bd" },
  "rows_upserted": 12,
  "sources": [
    { "source": "gdelt", "status": "ok", "rows": 3 },
    { "source": "rss", "status": "ok", "rows": 9 },
    { "source": "guardian", "status": "ok", "rows": 0 },
    { "source": "police_uk", "status": "ok", "rows": 0 }
  ],
  "events": [
    {
      "id": "uuid",
      "source": "rss",
      "title": "…",
      "summary": "…",
      "url": "https://…",
      "source_name": "…",
      "category": "disaster",
      "severity": 3,
      "lat": 22.3569,
      "lon": 91.7832,
      "place_name": "Chattogram",
      "occurred_at": "2026-08-17T11:00:00Z"
    }
  ],
  "started_at": "…",
  "finished_at": "…",
  "mock": false
}
```

`events` are current rows in a ~0.25° bbox around the place centroid (same field set as `GET /api/events`).

### Failure modes

| Case | Status | Body |
|---|---|---|
| All sources error | 502 | `{ ok: false, error: { code: "ingest_failed", message }, place, sources, events: [] }` |
| Cooldown | 429 | standard `{ error: { code: "rate_limited", message } }` |
| Already running | 409 | `{ error: { code: "busy", message } }` |
| Bad lat/lon / empty name | 400 | `{ error: { code: "bad_request", message } }` |
| Sources ok, zero relevant rows | 200 | `{ ok: true, rows_upserted: 0, sources: [...], events: [] }` |

## Behavior

- Does **not** insert into watchlist.
- Live adapters (`gdelt`, `rss`, `guardian`, `police_uk`) accept an optional explicit `places=` list; global scheduler / `POST /api/ingest/run` still use the DB watchlist.
- RSS queries the selected place (primary toponym before comma) and pins accepted articles to the supplied centroid (no invented coordinates).
- GDELT / Guardian keep `mentions_place` filtering (primary toponym).
- Police.uk only when the point is inside the UK bbox.
- Guardian skipped (empty batch) when `GUARDIAN_API_KEY` is empty.
- Records `ingest_runs`, publishes SSE `ingest_progress` / `new_events`.
- Purges `sample` rows only when live place ingest upserts `rows > 0` (same rule as global runner).
- Shares GDELT throttle + manual ingest busy/cooldown lock. Sync FastAPI route (threadpool).

## Frontend integration

After Nominatim place select / map click, call this endpoint, then refresh `GET /api/events` for the visible bbox (or use returned `events`).

## Tests

```powershell
cd backend
.\.venv\Scripts\python.exe -m pytest db/tests tests llm/tests -v
```

**Result (place ingest):** **42 passed** (4 DB + 10 API + 16 ingest + 12 LLM), including place-scoped upsert, no watchlist side effect, response shape, all-sources-fail 502, zero-rows ok, sample purge gating, and `/api/chat` 200 under `LLM_MOCK`.
