import type { Hotspot } from "./types";

/** Leaflet bounds tuple: [[south, west], [north, east]]. */
export type LatLngBoundsTuple = [[number, number], [number, number]];

/**
 * Place bboxes from the API follow the Nominatim order
 * [west, south, east, north] = [min_lon, min_lat, max_lon, max_lat].
 * Returns null for malformed boxes so callers can fall back to a point fly.
 */
export function boundsFromPlaceBBox(
  bbox: readonly number[] | null | undefined,
): LatLngBoundsTuple | null {
  if (!bbox || bbox.length !== 4) return null;
  const [west, south, east, north] = bbox;
  if (![west, south, east, north].every((n) => Number.isFinite(n))) return null;
  if (south < -90 || north > 90 || south > north) return null;
  if (west < -180 || east > 180 || west > east) return null;
  return [
    [south, west],
    [north, east],
  ];
}

export function hotspotLabel(hotspot: Pick<Hotspot, "name" | "lat" | "lon">): string {
  const name = hotspot.name?.trim();
  if (name) return name;
  if (Number.isFinite(hotspot.lat) && Number.isFinite(hotspot.lon)) {
    return `${hotspot.lat.toFixed(2)}, ${hotspot.lon.toFixed(2)}`;
  }
  return "Unknown place";
}
