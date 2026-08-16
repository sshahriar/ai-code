---
name: geonews-ingest
description: Fetches and normalizes free GeoNews sources (GDELT, Google News RSS, Guardian, Police.uk) into events and incidents. Use when adding or changing an ingest adapter, ingest scheduler, MCP search_news/lookup_crime, or INGEST_MOCK seed path.
---

# GeoNews ingest (free sources only)

Do not add NewsAPI, Mediastack, Google Maps, or any paid firehose. Prefer the `geonews` MCP tools over raw curl while exploring.

## Mock first

If `INGEST_MOCK=true` or the DB is empty, load `backend/db/seed/sample_events.json` and `sample_incidents.csv`. Do not hit the network in Playwright.

## Adapters

One interface. Each adapter yields normalized rows, then upsert on `(source, external_id)`.

### GDELT (primary, no key)

DOC (headlines):

```
https://api.gdeltproject.org/api/v2/doc/doc?query={q}&mode=artlist&maxrecords=50&format=json&timespan=1d
```

GEO (already has lat/lon):

```
https://api.gdeltproject.org/api/v2/geo/geo?query={q}&format=geojson&timespan=1d
```

- Cap `maxrecords` / timespan. Never download unbounded GDELT dumps.
- Cache 15 minutes.
- `source` = `gdelt`. `external_id` = URL or GDELT id.
- Map tone / CAMEO / title through the `geonews-classify` skill.
- Drop rows with no lat/lon unless a watchlist centroid can be attached.

### Google News RSS (no key)

```
https://news.google.com/rss/search?q={place}+when:1d&hl=en-US&gl=US&ceid=US:en
```

- `source` = `rss`. Geocode the **place**, not every headline (Nominatim 1 req/sec).
- One query per watchlist place per ingest run.

### Guardian (optional free key)

Skip if `GUARDIAN_API_KEY` is empty.

```
https://content.guardianapis.com/search?q={q}&page-size=20&show-fields=trailText&api-key={key}
```

- `source` = `guardian`. Do not log the key.

### Police.uk (UK only, no key)

```
https://data.police.uk/api/crimes-street/all-crime?lat={lat}&lng={lon}
```

Call only if the point is inside the UK bbox: lat `49.8–60.9`, lon `-8.7–1.8`.

- `source` = `police_uk`. Write **`incidents`**, not `events`.
- Outside the UK: do not call. UI must say official crime is unavailable.

## Normalize to `events`

Required fields: `source`, `external_id`, `title`, `summary`, `url`, `source_name`, `category`, `severity` (1–5), `lat`, `lon`, `place_name`, `occurred_at`, `ingested_at`.

## Rate limits and hosts

Allowlisted hosts only: `api.gdeltproject.org`, `data.police.uk`, `nominatim.openstreetmap.org`, `content.guardianapis.com`, `news.google.com`, `earthquake.usgs.gov`, `eonet.gsfc.nasa.gov`.

Nominatim: see `nominatim-geocode`. Run ingest off the API event loop. Record every run in `ingest_runs`.
