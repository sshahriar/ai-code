---
name: geonews-intelligence
description: >-
  Rules and procedures for the GeoNews intelligence pipeline: GDELT ingest,
  RSS feeds, Nominatim rate-limited geocoding, incident lookups, and LLM briefing/classification.
---

# GeoNews Intelligence Pipeline

Use this skill when modifying news ingestion, geocoding resolvers, category/severity classification, or LLM briefing logic.

---

## 1. Ingestion Sources & Contracts

1. **GDELT 2.0 Doc API**:
   * Endpoint: `https://api.gdeltproject.org/api/v2/doc/doc`
   * Query syntax: `query=<place_or_keywords> mode=artlist maxrecords=50 format=json`
   * Geo extraction: parsed from `locations` field or fallback geocoding.
2. **RSS Feeds**:
   * Feeds for global and regional news (e.g., BBC World, Al Jazeera, Reuters, local country feeds).
3. **Police UK Data API**:
   * Endpoint: `https://data.police.uk/api/crimes-street/all-crime?lat={lat}&lng={lon}`
   * Graceful fallback when coordinates fall outside the UK coverage area.
4. **Offline Fixtures**:
   * When network is unavailable or under test, load from `backend/ingest/sample.py`.

---

## 2. Geocoding (Nominatim) Rules

* **Base URL**: `https://nominatim.openstreetmap.org`
* **Rate Limit Policy**: Strictly enforce at least **1.0 second delay** between outbound requests (`backend/geocode/__init__.py`).
* **Caching**:
  * Persistent SQLite table: `geocode_cache`
  * In-memory cache for fast hot-lookup during a session.
  * Cache TTL: 7 days default.

---

## 3. Classification & LLM Contract

* **Severity Levels**: `low`, `medium`, `high`, `critical`.
* **Categories**: `crime`, `conflict`, `disaster`, `politics`, `health`, `economy`, `other`.
* **Mock Provider Compatibility**:
  * When `LLM_MOCK=true` or when no API key is supplied, generate deterministic mock intelligence outputs using `backend/llm/fixtures.py`.
  * Return `mock: true` in response payloads so the frontend can properly render the `ai-mock-badge`.
