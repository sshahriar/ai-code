export type EventCategory =
  | "crime"
  | "conflict"
  | "disaster"
  | "politics"
  | "health"
  | "economy"
  | "other";

export type EventSource =
  | "gdelt"
  | "guardian"
  | "rss"
  | "police_uk"
  | "reliefweb"
  | "sample";

export type TimeWindow = "24h" | "72h" | "7d";

export interface GeoEvent {
  id: string;
  source: EventSource | string;
  title: string;
  summary: string;
  url: string | null;
  source_name: string;
  category: EventCategory | string;
  severity: number;
  lat: number;
  lon: number;
  place_name: string;
  occurred_at: string;
}

export interface WatchPlace {
  id: string;
  name: string;
  lat: number;
  lon: number;
  radius_km: number;
  added_at: string;
}

export interface HeatPoint {
  lat: number;
  lon: number;
  weight: number;
}

export interface PlaceResult {
  name: string;
  lat: number;
  lon: number;
  country_code?: string;
  /** Nominatim/API order: [west, south, east, north]. */
  bbox?: [number, number, number, number];
}

/** Body for `POST /api/ingest/place` (scoped live ingest for one place). */
export interface IngestPlaceBody {
  name: string;
  lat: number;
  lon: number;
  country_code?: string;
}

export interface IngestPlaceInfo {
  name: string;
  lat: number;
  lon: number;
  country_code?: string | null;
}

export interface IngestSourceReport {
  source: string;
  status?: string;
  rows_upserted?: number;
  error?: string | null;
}

/** Backend may report sources as bare names or per-source objects. */
export type IngestSourceEntry = string | IngestSourceReport;

export interface IngestPlaceResult {
  ok: boolean;
  place: IngestPlaceInfo;
  rows_upserted: number;
  sources: IngestSourceEntry[];
  /** `null` when the response omitted events, so callers can reload instead. */
  events: GeoEvent[] | null;
}

export interface Hotspot {
  id?: string;
  name: string;
  lat: number;
  lon: number;
  count: number;
  score?: number;
  category?: string;
}

export interface HealthStatus {
  ok: boolean;
  sources: {
    gdelt?: string;
    nominatim?: string;
    llm?: string;
    police_uk?: string;
  };
  last_ingest_at?: string | null;
  ingest_status?: string;
}

export interface BriefPayload {
  place_name: string;
  window: string;
  headline: string;
  risk_level: "low" | "moderate" | "high" | "unknown" | string;
  bullets: string[];
  caveats: string[];
  /** Backend sets this when LLM_MOCK is on or no OpenRouter key is configured. */
  mock?: boolean;
}

export interface ChatResponse {
  message: string;
  brief?: BriefPayload | null;
  /** Backend sets this when LLM_MOCK is on or no OpenRouter key is configured. */
  mock?: boolean;
  watchlist_changes?: Array<{
    name: string;
    lat: number;
    lon: number;
    action: string;
  }>;
  highlight_event_ids?: string[];
}

export interface MapBBox {
  min_lat: number;
  min_lon: number;
  max_lat: number;
  max_lon: number;
}

export interface MapFlyTarget {
  lat: number;
  lon: number;
  zoom?: number;
  /** Nominatim/API order: [west, south, east, north]. */
  bbox?: [number, number, number, number];
}
