---
name: nominatim-geocode
description: Forward and reverse geocodes places with OpenStreetMap Nominatim, including User-Agent, 1 req/sec, and cache keys. Use when implementing place search, reverse geocode, RSS-without-coords, watchlist add-by-name, or MCP geocode_place/reverse_geocode.
---

# Nominatim geocoding

Use **only** Nominatim. Never add Google, Mapbox, Here, or paid geocoders.

## Policy (required)

- User-Agent: `NOMINATIM_USER_AGENT` from `.env`, default `GeoNews/0.1 (student-project; contact: local)`.
- Max **1 request per second** (process-wide lock).
- Cache hits must not wait on the lock.
- On 429 / 5xx: return a clear error; do not retry-storm.

## Cache keys

- Forward: `norm(q)` = lowercase, strip, collapse whitespace.
- Reverse: `round(lat, 4),round(lon, 4)`.
- Store in memory + SQLite if the backend is up. TTL 7 days.

## Forward

```
GET https://nominatim.openstreetmap.org/search?q={q}&format=jsonv2&limit=5&addressdetails=1
```

Headers: `User-Agent: {NOMINATIM_USER_AGENT}`, `Accept-Language: en`.

Map the first useful hit to:

```json
{
  "name": "Dhaka, Bangladesh",
  "lat": 23.8103,
  "lon": 90.4125,
  "bbox": [90.0, 23.6, 90.6, 23.95],
  "country_code": "bd"
}
```

`bbox` from Nominatim is `[min_lon, min_lat, max_lon, max_lat]` (west, south, east, north).

## Reverse

```
GET https://nominatim.openstreetmap.org/reverse?lat={lat}&lon={lon}&format=jsonv2
```

Return `{ "name", "country_code" }`. Ocean / empty → `{ "name": "Unknown", "country_code": null }`.

## Backend routes

- `GET /api/places/search?q=`
- `GET /api/places/reverse?lat=&lon=`

Both wrap this skill. MCP tools `geocode_place` and `reverse_geocode` must share the same cache and rate limiter — do not fork a second client.
