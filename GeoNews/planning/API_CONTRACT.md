# API Contract (draft — lead)

Source: `plan.md` §10. Backend + Frontend may refine; keep shapes stable.

## Errors

```json
{ "error": { "code": "string", "message": "string" } }
```

Use appropriate HTTP status codes.

## `GET /api/events`

Query: `min_lat,min_lon,max_lat,max_lon,since,category,limit`

```json
{
  "events": [
    {
      "id": "uuid",
      "source": "gdelt|guardian|rss|police_uk|reliefweb|sample",
      "title": "…",
      "summary": "…",
      "url": "https://…",
      "source_name": "Reuters",
      "category": "crime|conflict|disaster|politics|health|economy|other",
      "severity": 3,
      "lat": 23.81,
      "lon": 90.41,
      "place_name": "Dhaka",
      "occurred_at": "2026-08-16T01:00:00Z"
    }
  ]
}
```

## `GET /api/events/{id}`

Single event object (same fields as list item), or 404 error shape.

## `GET /api/watchlist`

```json
{
  "places": [
    {
      "id": "uuid",
      "name": "Dhaka",
      "lat": 23.8103,
      "lon": 90.4125,
      "radius_km": 25,
      "added_at": "2026-08-16T00:00:00Z"
    }
  ]
}
```

## `POST /api/watchlist`

Body: `{ "name", "lat", "lon", "radius_km?" }` → created place object.

## `DELETE /api/watchlist/{id}`

`204` or `{ "ok": true }`.

## `GET /api/incidents`

Same bbox filters as events; query `source=police_uk|sample|all`.

```json
{
  "incidents": [
    {
      "id": "uuid",
      "source": "police_uk|sample",
      "category": "…",
      "lat": 23.81,
      "lon": 90.41,
      "place_name": "Dhaka",
      "occurred_at": "2026-08-16T01:00:00Z"
    }
  ]
}
```

## `GET /api/incidents/heatmap`

```json
{ "points": [{ "lat": 23.81, "lon": 90.41, "weight": 1.0 }] }
```

## `GET /api/health`

```json
{
  "ok": true,
  "sources": {
    "gdelt": "ok|degraded|down",
    "nominatim": "ok|degraded|down",
    "llm": "ok|mock|down",
    "police_uk": "ok|degraded|down"
  }
}
```

## Chat / brief (LLM owns internals)

- `GET /api/brief?lat=&lon=&radius_km=&window=` → structured brief JSON
- `POST /api/chat` body `{ "message", "lat?", "lon?", "place_name?" }` → structured JSON with actions

Exact brief/chat schema to be filled by LLM Engineer against `plan.md` §12; Frontend should treat unknown action types as opaque.
