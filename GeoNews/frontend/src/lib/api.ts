import {
  FIXTURE_EVENTS,
  FIXTURE_HEALTH,
  FIXTURE_HEAT,
  FIXTURE_HOTSPOTS,
  FIXTURE_PLACES,
  FIXTURE_WATCHLIST,
} from "./fixtures";
import type {
  BriefPayload,
  ChatResponse,
  GeoEvent,
  HealthStatus,
  HeatPoint,
  Hotspot,
  IngestPlaceBody,
  IngestPlaceResult,
  IngestSourceEntry,
  MapBBox,
  PlaceResult,
  TimeWindow,
  WatchPlace,
} from "./types";
import { sinceIso } from "./categories";

export type ApiMode = "live" | "fixture";

/**
 * Backend failure the UI must surface. `status === null` means the request
 * never reached the API (offline / wrong origin) rather than a rejected call.
 */
export class ApiError extends Error {
  readonly code: string;
  readonly status: number | null;

  constructor(message: string, code: string, status: number | null = null) {
    super(message);
    this.name = "ApiError";
    this.code = code;
    this.status = status;
  }

  get unreachable(): boolean {
    return this.status === null;
  }
}

/** Human-readable text for the chat / ingest error banners. */
export function describeApiError(err: unknown, fallback: string): string {
  if (err instanceof ApiError) {
    if (err.unreachable) {
      return "Backend unreachable — the GeoNews API did not respond on this origin.";
    }
    return err.message;
  }
  if (err instanceof Error && err.message) return err.message;
  return fallback;
}

let fixtureWatchlist: WatchPlace[] = [...FIXTURE_WATCHLIST];

export function resetFixtureState(): void {
  fixtureWatchlist = [...FIXTURE_WATCHLIST];
}

async function readErrorBody(res: Response): Promise<{ code: string; message: string }> {
  const fallback = {
    code: `http_${res.status}`,
    message: `Request failed with HTTP ${res.status}.`,
  };
  try {
    const body = (await res.json()) as { error?: { code?: string; message?: string } };
    const code = body?.error?.code;
    const message = body?.error?.message;
    return {
      code: typeof code === "string" && code ? code : fallback.code,
      message: typeof message === "string" && message ? message : fallback.message,
    };
  } catch {
    return fallback;
  }
}

async function fetchJson<T>(
  path: string,
  init?: RequestInit,
): Promise<{ data: T; mode: ApiMode }> {
  let res: Response;
  try {
    res = await fetch(path, {
      ...init,
      headers: {
        Accept: "application/json",
        ...(init?.headers ?? {}),
      },
    });
  } catch {
    throw new ApiError("Could not reach the GeoNews API.", "network", null);
  }

  if (!res.ok) {
    const { code, message } = await readErrorBody(res);
    throw new ApiError(message, code, res.status);
  }

  try {
    const data = (await res.json()) as T;
    return { data, mode: "live" };
  } catch {
    throw new ApiError("The API returned a malformed response.", "bad_json", res.status);
  }
}

function filterEvents(
  events: GeoEvent[],
  opts: {
    category?: string | null;
    since?: string;
    bbox?: MapBBox | null;
  },
): GeoEvent[] {
  return events.filter((e) => {
    if (opts.category && e.category !== opts.category) return false;
    if (opts.since && new Date(e.occurred_at) < new Date(opts.since)) return false;
    if (opts.bbox) {
      const { min_lat, min_lon, max_lat, max_lon } = opts.bbox;
      if (e.lat < min_lat || e.lat > max_lat || e.lon < min_lon || e.lon > max_lon) {
        return false;
      }
    }
    return true;
  });
}

export async function getHealth(): Promise<{ data: HealthStatus; mode: ApiMode }> {
  try {
    return await fetchJson<HealthStatus>("/api/health");
  } catch {
    return { data: FIXTURE_HEALTH, mode: "fixture" };
  }
}

export async function getEvents(params: {
  bbox?: MapBBox | null;
  category?: string | null;
  window: TimeWindow;
  limit?: number;
}): Promise<{ data: GeoEvent[]; mode: ApiMode }> {
  const since = sinceIso(params.window);
  const q = new URLSearchParams();
  if (params.bbox) {
    q.set("min_lat", String(params.bbox.min_lat));
    q.set("min_lon", String(params.bbox.min_lon));
    q.set("max_lat", String(params.bbox.max_lat));
    q.set("max_lon", String(params.bbox.max_lon));
  }
  q.set("since", since);
  if (params.category) q.set("category", params.category);
  q.set("limit", String(params.limit ?? 200));

  try {
    const { data, mode } = await fetchJson<{ events: GeoEvent[] }>(
      `/api/events?${q.toString()}`,
    );
    return { data: data.events ?? [], mode };
  } catch {
    return {
      data: filterEvents(FIXTURE_EVENTS, {
        category: params.category,
        since,
        bbox: params.bbox,
      }),
      mode: "fixture",
    };
  }
}

export async function getWatchlist(): Promise<{ data: WatchPlace[]; mode: ApiMode }> {
  try {
    const { data, mode } = await fetchJson<{ places: WatchPlace[] }>("/api/watchlist");
    return { data: data.places ?? [], mode };
  } catch {
    return { data: [...fixtureWatchlist], mode: "fixture" };
  }
}

export async function addWatchlist(place: {
  name: string;
  lat: number;
  lon: number;
  radius_km?: number;
}): Promise<{ data: WatchPlace; mode: ApiMode }> {
  try {
    const { data, mode } = await fetchJson<WatchPlace>("/api/watchlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: place.name,
        lat: place.lat,
        lon: place.lon,
        radius_km: place.radius_km ?? 25,
      }),
    });
    return { data, mode };
  } catch {
    const created: WatchPlace = {
      id: `wl-local-${Date.now()}`,
      name: place.name,
      lat: place.lat,
      lon: place.lon,
      radius_km: place.radius_km ?? 25,
      added_at: new Date().toISOString(),
    };
    fixtureWatchlist = [...fixtureWatchlist, created];
    return { data: created, mode: "fixture" };
  }
}

export async function removeWatchlist(
  id: string,
): Promise<{ ok: boolean; mode: ApiMode }> {
  try {
    const res = await fetch(`/api/watchlist/${id}`, { method: "DELETE" });
    if (!res.ok && res.status !== 204) throw new Error("fail");
    return { ok: true, mode: "live" };
  } catch {
    fixtureWatchlist = fixtureWatchlist.filter((p) => p.id !== id);
    return { ok: true, mode: "fixture" };
  }
}

export async function searchPlaces(
  q: string,
): Promise<{ data: PlaceResult[]; mode: ApiMode }> {
  const query = q.trim();
  if (!query) return { data: [], mode: "live" };
  try {
    const { data, mode } = await fetchJson<{ places?: PlaceResult[]; results?: PlaceResult[] }>(
      `/api/places/search?q=${encodeURIComponent(query)}`,
    );
    return { data: data.places ?? data.results ?? [], mode };
  } catch {
    const lower = query.toLowerCase();
    return {
      data: FIXTURE_PLACES.filter((p) => p.name.toLowerCase().includes(lower)),
      mode: "fixture",
    };
  }
}

export async function getHeatmap(params?: {
  bbox?: MapBBox | null;
}): Promise<{ data: HeatPoint[]; mode: ApiMode }> {
  const q = new URLSearchParams();
  if (params?.bbox) {
    q.set("min_lat", String(params.bbox.min_lat));
    q.set("min_lon", String(params.bbox.min_lon));
    q.set("max_lat", String(params.bbox.max_lat));
    q.set("max_lon", String(params.bbox.max_lon));
  }
  const suffix = q.toString() ? `?${q}` : "";
  try {
    const { data, mode } = await fetchJson<{ points: HeatPoint[] }>(
      `/api/incidents/heatmap${suffix}`,
    );
    return { data: data.points ?? [], mode };
  } catch {
    return { data: FIXTURE_HEAT, mode: "fixture" };
  }
}

export async function getHotspots(params: {
  window: TimeWindow;
  place?: string;
}): Promise<{ data: Hotspot[]; mode: ApiMode }> {
  const q = new URLSearchParams({ window: params.window });
  if (params.place) q.set("place", params.place);
  try {
    const { data, mode } = await fetchJson<{ hotspots: Hotspot[] }>(
      `/api/hotspots?${q}`,
    );
    return { data: (data.hotspots ?? []).slice(0, 5), mode };
  } catch {
    return { data: FIXTURE_HOTSPOTS, mode: "fixture" };
  }
}

/**
 * Scoped live ingest for one place. Throws {@link ApiError} on failure — an
 * ingest that did not run must never be disguised as fixture success.
 */
export async function postIngestPlace(
  body: IngestPlaceBody,
): Promise<IngestPlaceResult> {
  const { data } = await fetchJson<{
    ok?: boolean;
    place?: IngestPlaceResult["place"];
    rows_upserted?: number;
    sources?: IngestSourceEntry[];
    events?: GeoEvent[];
  }>("/api/ingest/place", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: body.name,
      lat: body.lat,
      lon: body.lon,
      ...(body.country_code ? { country_code: body.country_code } : {}),
    }),
  });

  if (data?.ok === false) {
    throw new ApiError("Scoped ingest did not complete.", "ingest_failed", 200);
  }

  return {
    ok: true,
    place: data?.place ?? { name: body.name, lat: body.lat, lon: body.lon },
    rows_upserted: Number.isFinite(data?.rows_upserted) ? Number(data?.rows_upserted) : 0,
    sources: Array.isArray(data?.sources) ? data.sources : [],
    events: Array.isArray(data?.events) ? data.events : null,
  };
}

/** Throws {@link ApiError}; the AI panel renders the failure instead of a fixture. */
export async function getBrief(params: {
  lat: number;
  lon: number;
  radius_km?: number;
  window: TimeWindow;
  place_name?: string;
}): Promise<BriefPayload> {
  const q = new URLSearchParams({
    lat: String(params.lat),
    lon: String(params.lon),
    radius_km: String(params.radius_km ?? 25),
    window: params.window,
  });
  if (params.place_name) q.set("place_name", params.place_name);
  const { data } = await fetchJson<BriefPayload>(`/api/brief?${q}`);
  return data;
}

/** Throws {@link ApiError}; the AI panel renders the failure instead of a fixture. */
export async function postChat(body: {
  message: string;
  lat?: number;
  lon?: number;
  place_name?: string;
  window?: TimeWindow;
  radius_km?: number;
}): Promise<ChatResponse> {
  const { data } = await fetchJson<ChatResponse>("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return data;
}

/** Subscribe to SSE; no-ops cleanly when backend is down. */
export function subscribeEventStream(
  onMessage: (payload: unknown) => void,
): () => void {
  if (typeof window === "undefined" || typeof EventSource === "undefined") {
    return () => undefined;
  }
  let source: EventSource | null = null;
  try {
    source = new EventSource("/api/stream/events");
    source.onmessage = (ev) => {
      try {
        onMessage(JSON.parse(ev.data));
      } catch {
        onMessage(ev.data);
      }
    };
    source.onerror = () => {
      source?.close();
      source = null;
    };
  } catch {
    source = null;
  }
  return () => source?.close();
}
