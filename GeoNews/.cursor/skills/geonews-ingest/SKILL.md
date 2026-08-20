---
name: geonews-ingest
description: Fetches and normalizes free GeoNews sources (GDELT, Google News RSS, Guardian, Police.uk) into events and incidents. Use when adding or changing an ingest adapter, ingest scheduler, MCP search_news/lookup_crime, or INGEST_MOCK seed path.
---

# GeoNews ingest (free sources only)

Do not add NewsAPI, Mediastack, Google Maps, or any paid firehose. Prefer the `geonews` MCP tools over raw curl while exploring.

## Live by default, mock on demand

`INGEST_MOCK=false` is the normal setting: real sources only, and `SampleAdapter` is not in the live adapter list. Seeded `sample` rows are purged the first time a live run upserts anything, so demo and real events never mix.

If `INGEST_MOCK=true` or the DB is empty, load `backend/db/seed/sample_events.json` and `sample_incidents.csv`. Do not hit the network in Playwright.

## Adapters

One interface. Each adapter yields normalized rows, then upsert on `(source, external_id)`.

### GDELT (primary, no key)

Use DOC `artlist` — it is the only GDELT mode that returns a real publisher URL per row:

```
https://api.gdeltproject.org/api/v2/doc/doc?query="{place}"&mode=artlist&maxrecords=25&format=json&sort=datedesc&timespan=1d
```

- **One request every 5 s across all GDELT APIs.** A burst gets a `429` (plain text, not JSON) or a dropped connection, then a longer block. Use the shared throttle in `backend/ingest/gdelt.py` (6 s gap + widening backoff) instead of calling `httpx` directly.
- DOC matches full article text, so keep a row only when the headline names the queried place; otherwise the article gets pinned to the wrong coordinates.
- Cap `maxrecords` / timespan. Never download unbounded GDELT dumps.
- `source` = `gdelt`. `external_id` = article URL.
- Map tone / CAMEO / title through the `geonews-classify` skill.
- Raise from `fetch()` when every request failed, so the failure lands in `ingest_runs` instead of looking like "no news".
- The GEO GeoJSON endpoint is not used: it 404s on the documented query form and carries no article URL.

### Google News RSS (no key)

```
https://news.google.com/rss/search?q={place}+when:1d&hl=en-US&gl=US&ceid=US:en
```

- `source` = `rss`. Geocode the **place**, not every headline (Nominatim 1 req/sec).
- One query per watchlist place per ingest run.
- Strip the HTML from `<description>` and use `<source>` as `source_name`, trimming the trailing ` - Publisher` from the title.
- Keep the `news.google.com/rss/articles/...` link as-is; it redirects to the publisher.

### Guardian (optional free key)

Skip if `GUARDIAN_API_KEY` is empty. Free developer tier is 5,000 calls/day, so one search per watchlist place per run stays well inside it.

```
https://content.guardianapis.com/search?q="{place}"&page-size=20&show-fields=trailText&order-by=newest&from-date={iso_date}&api-key={key}
```

- `source` = `guardian`. Never log the key or put it in an error message.
- Guardian carries no coordinates: pin each article to the queried place's centroid and drop rows whose `webTitle` + `trailText` never name that place. Do not invent lat/lon.
- `external_id` = Guardian `id`, `url` = `webUrl`, `occurred_at` = `webPublicationDate`, `source_name` = `The Guardian`.
- Strip HTML from `trailText`; it is a markup snippet, not plain text.

### Police.uk (UK only, no key)

```
https://data.police.uk/api/crimes-street/all-crime?lat={lat}&lng={lon}
```

Call only if the point is inside the UK bbox: lat `49.8–60.9`, lon `-8.7–1.8`.

- `source` = `police_uk`. Write **`incidents`**, not `events`.
- Outside the UK: do not call. UI must say official crime is unavailable.

## Normalize to `events`

Required fields: `source`, `external_id`, `title`, `summary`, `url`, `source_name`, `category`, `severity` (1–5), `lat`, `lon`, `place_name`, `occurred_at`, `ingested_at`.

`url` must be an absolute `http(s)` publisher link — the UI links the card headline and the map popup to it, so never emit `example.local` or relative placeholders outside the seed data.

## Rate limits and hosts

Allowlisted hosts only: `api.gdeltproject.org`, `data.police.uk`, `nominatim.openstreetmap.org`, `content.guardianapis.com`, `news.google.com`, `earthquake.usgs.gov`, `eonet.gsfc.nasa.gov`.

Nominatim: see `nominatim-geocode`. Run ingest off the API event loop. Record every run in `ingest_runs`.
