import {
  FIXTURE_BRIEF,
  FIXTURE_CHAT,
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
  MapBBox,
  PlaceResult,
  TimeWindow,
  WatchPlace,
} from "./types";
import { sinceIso } from "./categories";

export type ApiMode = "live" | "fixture";

let fixtureWatchlist: WatchPlace[] = [...FIXTURE_WATCHLIST];

export function resetFixtureState(): void {
  fixtureWatchlist = [...FIXTURE_WATCHLIST];
}

async function fetchJson<T>(
  path: string,
  init?: RequestInit,
): Promise<{ data: T; mode: ApiMode }> {
  try {
    const res = await fetch(path, {
      ...init,
      headers: {
        Accept: "application/json",
        ...(init?.headers ?? {}),
      },
    });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    const data = (await res.json()) as T;
    return { data, mode: "live" };
  } catch {
    throw new Error("offline");
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

export async function getBrief(params: {
  lat: number;
  lon: number;
  radius_km?: number;
  window: TimeWindow;
}): Promise<{ data: BriefPayload; mode: ApiMode }> {
  const q = new URLSearchParams({
    lat: String(params.lat),
    lon: String(params.lon),
    radius_km: String(params.radius_km ?? 25),
    window: params.window,
  });
  try {
    const { data, mode } = await fetchJson<BriefPayload>(`/api/brief?${q}`);
    return { data, mode };
  } catch {
    return { data: FIXTURE_BRIEF, mode: "fixture" };
  }
}

export async function postChat(body: {
  message: string;
  lat?: number;
  lon?: number;
  place_name?: string;
}): Promise<{ data: ChatResponse; mode: ApiMode }> {
  try {
    const { data, mode } = await fetchJson<ChatResponse>("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return { data, mode };
  } catch {
    return { data: { ...FIXTURE_CHAT, message: FIXTURE_CHAT.message }, mode: "fixture" };
  }
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
