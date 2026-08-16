import type {
  BriefPayload,
  ChatResponse,
  GeoEvent,
  HealthStatus,
  HeatPoint,
  Hotspot,
  PlaceResult,
  WatchPlace,
} from "./types";

export const DHAKA = { lat: 23.8103, lon: 90.4125, zoom: 11 };

export const FIXTURE_EVENTS: GeoEvent[] = [
  {
    id: "evt-sample-001",
    source: "sample",
    title: "Flash flooding closes major roads in Gulshan",
    summary:
      "Heavy overnight rain left several arterial roads under water; traffic diverted near Gulshan Circle.",
    url: "https://example.local/news/dhaka-flood-gulshan",
    source_name: "GeoNews Sample Wire",
    category: "disaster",
    severity: 3,
    lat: 23.7925,
    lon: 90.4078,
    place_name: "Gulshan, Dhaka",
    occurred_at: "2026-08-15T06:30:00Z",
  },
  {
    id: "evt-sample-002",
    source: "sample",
    title: "Police increase patrols after street robbery reports in Dhanmondi",
    summary:
      "Local authorities said extra patrols were deployed after a cluster of evening robbery complaints.",
    url: "https://example.local/news/dhanmondi-patrols",
    source_name: "GeoNews Sample Wire",
    category: "crime",
    severity: 3,
    lat: 23.7461,
    lon: 90.3742,
    place_name: "Dhanmondi, Dhaka",
    occurred_at: "2026-08-15T04:10:00Z",
  },
  {
    id: "evt-sample-003",
    source: "sample",
    title: "Opposition rally draws thousands in Motijheel",
    summary:
      "Organizers claimed a large turnout; transit services ran on a modified schedule downtown.",
    url: "https://example.local/news/motijheel-rally",
    source_name: "GeoNews Sample Wire",
    category: "politics",
    severity: 2,
    lat: 23.733,
    lon: 90.4172,
    place_name: "Motijheel, Dhaka",
    occurred_at: "2026-08-14T12:00:00Z",
  },
  {
    id: "evt-sample-004",
    source: "sample",
    title: "Dengue cases rise at city clinics in Mirpur",
    summary:
      "Hospital administrators reported elevated outpatient volumes linked to mosquito-borne illness.",
    url: "https://example.local/news/mirpur-dengue",
    source_name: "GeoNews Sample Wire",
    category: "health",
    severity: 3,
    lat: 23.8223,
    lon: 90.3654,
    place_name: "Mirpur, Dhaka",
    occurred_at: "2026-08-14T09:45:00Z",
  },
  {
    id: "evt-sample-005",
    source: "sample",
    title: "Garment export orders tick higher despite freight delays",
    summary:
      "Industry groups pointed to stronger demand even as container backlogs persisted at the port.",
    url: "https://example.local/news/export-orders",
    source_name: "GeoNews Sample Wire",
    category: "economy",
    severity: 1,
    lat: 23.8103,
    lon: 90.4125,
    place_name: "Dhaka",
    occurred_at: "2026-08-14T07:20:00Z",
  },
];

export const FIXTURE_WATCHLIST: WatchPlace[] = [
  {
    id: "wl-dhaka",
    name: "Dhaka",
    lat: DHAKA.lat,
    lon: DHAKA.lon,
    radius_km: 25,
    added_at: "2026-08-16T00:00:00Z",
  },
];

export const FIXTURE_HEAT: HeatPoint[] = [
  { lat: 23.7461, lon: 90.3742, weight: 0.8 },
  { lat: 23.7925, lon: 90.4078, weight: 0.5 },
  { lat: 23.8223, lon: 90.3654, weight: 0.4 },
];

export const FIXTURE_HOTSPOTS: Hotspot[] = [
  { name: "Dhanmondi", lat: 23.7461, lon: 90.3742, count: 4, score: 0.72 },
  { name: "Gulshan", lat: 23.7925, lon: 90.4078, count: 3, score: 0.61 },
  { name: "Mirpur", lat: 23.8223, lon: 90.3654, count: 2, score: 0.48 },
];

export const FIXTURE_HEALTH: HealthStatus = {
  ok: true,
  sources: {
    gdelt: "degraded",
    nominatim: "ok",
    llm: "mock",
    police_uk: "down",
  },
  last_ingest_at: "2026-08-16T00:30:00Z",
  ingest_status: "idle",
};

export const FIXTURE_BRIEF: BriefPayload = {
  place_name: "Dhaka",
  window: "72h",
  headline: "Localized flooding and patrol activity dominate the sample feed",
  risk_level: "moderate",
  bullets: [
    "Sample disaster reports cluster around Gulshan road closures.",
    "Crime-category items are sample/news proxies — not official BD crime stats.",
  ],
  caveats: [
    "Official crime feed unavailable for BD; using news + sample.",
    "This brief may be served from offline fixtures when the API is unreachable.",
  ],
};

export const FIXTURE_CHAT: ChatResponse = {
  message:
    "Here is a concise place brief from available sample and news signals. Treat sample badges as demos, not police reports.",
  brief: FIXTURE_BRIEF,
  watchlist_changes: [],
  highlight_event_ids: ["evt-sample-001", "evt-sample-002"],
};

export const FIXTURE_PLACES: PlaceResult[] = [
  {
    name: "Dhaka, Bangladesh",
    lat: DHAKA.lat,
    lon: DHAKA.lon,
    bbox: [90.25, 23.6, 90.55, 23.95],
  },
  {
    name: "London, United Kingdom",
    lat: 51.5074,
    lon: -0.1278,
    bbox: [-0.51, 51.28, 0.33, 51.69],
  },
];
