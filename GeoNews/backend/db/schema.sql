-- GeoNews SQLite schema (plan.md §9)
-- Runtime DB path: <project>/db/geonews.db

CREATE TABLE IF NOT EXISTS places_watchlist (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL DEFAULT 'default',
  name TEXT NOT NULL,
  lat REAL NOT NULL,
  lon REAL NOT NULL,
  radius_km REAL NOT NULL DEFAULT 25,
  added_at TEXT NOT NULL,
  UNIQUE (user_id, name)
);

CREATE TABLE IF NOT EXISTS events (
  id TEXT PRIMARY KEY,
  source TEXT NOT NULL,
  external_id TEXT NOT NULL,
  title TEXT,
  summary TEXT,
  url TEXT,
  source_name TEXT,
  category TEXT,
  severity INTEGER CHECK (severity IS NULL OR (severity >= 1 AND severity <= 5)),
  lat REAL,
  lon REAL,
  place_name TEXT,
  country_code TEXT,
  occurred_at TEXT,
  ingested_at TEXT,
  raw_json TEXT,
  UNIQUE (source, external_id)
);

CREATE INDEX IF NOT EXISTS idx_events_lat_lon ON events (lat, lon);
CREATE INDEX IF NOT EXISTS idx_events_occurred_at ON events (occurred_at);
CREATE INDEX IF NOT EXISTS idx_events_category ON events (category);

CREATE TABLE IF NOT EXISTS incidents (
  id TEXT PRIMARY KEY,
  source TEXT NOT NULL CHECK (source IN ('police_uk', 'sample')),
  external_id TEXT NOT NULL,
  category TEXT,
  lat REAL,
  lon REAL,
  place_name TEXT,
  occurred_at TEXT,
  raw_json TEXT,
  UNIQUE (source, external_id)
);

CREATE INDEX IF NOT EXISTS idx_incidents_lat_lon ON incidents (lat, lon);

CREATE TABLE IF NOT EXISTS chat_messages (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL DEFAULT 'default',
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  actions TEXT,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS ingest_runs (
  id TEXT PRIMARY KEY,
  source TEXT NOT NULL,
  started_at TEXT,
  finished_at TEXT,
  status TEXT CHECK (status IS NULL OR status IN ('ok', 'error', 'skipped')),
  rows_upserted INTEGER,
  error TEXT
);
