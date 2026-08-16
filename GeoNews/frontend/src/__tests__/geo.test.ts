import { describe, expect, it } from "vitest";
import { boundsFromPlaceBBox, hotspotLabel } from "@/lib/geo";
import { FIXTURE_PLACES } from "@/lib/fixtures";

describe("boundsFromPlaceBBox", () => {
  it("reads API bbox as [west, south, east, north]", () => {
    expect(boundsFromPlaceBBox([-0.51, 51.28, 0.33, 51.69])).toEqual([
      [51.28, -0.51],
      [51.69, 0.33],
    ]);
  });

  it("keeps the London fixture inside the UK", () => {
    const london = FIXTURE_PLACES.find((p) => p.name.startsWith("London"));
    const bounds = boundsFromPlaceBBox(london?.bbox);
    expect(bounds).not.toBeNull();
    const [[south, west], [north, east]] = bounds!;
    expect(south).toBeGreaterThan(50);
    expect(north).toBeLessThan(53);
    expect(west).toBeLessThan(0);
    expect(east).toBeGreaterThan(0);
    expect(london!.lat).toBeGreaterThanOrEqual(south);
    expect(london!.lat).toBeLessThanOrEqual(north);
    expect(london!.lon).toBeGreaterThanOrEqual(west);
    expect(london!.lon).toBeLessThanOrEqual(east);
  });

  it("contains the place centre for every fixture place", () => {
    for (const place of FIXTURE_PLACES) {
      const bounds = boundsFromPlaceBBox(place.bbox);
      expect(bounds, place.name).not.toBeNull();
      const [[south, west], [north, east]] = bounds!;
      expect(place.lat >= south && place.lat <= north, place.name).toBe(true);
      expect(place.lon >= west && place.lon <= east, place.name).toBe(true);
    }
  });

  it("returns null for missing or malformed boxes", () => {
    expect(boundsFromPlaceBBox(undefined)).toBeNull();
    expect(boundsFromPlaceBBox([1, 2, 3])).toBeNull();
    expect(boundsFromPlaceBBox([0, Number.NaN, 1, 1])).toBeNull();
    expect(boundsFromPlaceBBox([0, 51.69, 1, 51.28])).toBeNull();
    expect(boundsFromPlaceBBox([1, 0, -1, 1])).toBeNull();
    expect(boundsFromPlaceBBox([-0.5, -200, 0.5, 200])).toBeNull();
  });
});

describe("hotspotLabel", () => {
  it("uses the name when present", () => {
    expect(hotspotLabel({ name: "Dhanmondi", lat: 23.74, lon: 90.37 })).toBe("Dhanmondi");
  });

  it("falls back to coordinates when the name is blank", () => {
    expect(hotspotLabel({ name: "   ", lat: 51.5074, lon: -0.1278 })).toBe("51.51, -0.13");
  });

  it("falls back to Unknown place without usable coordinates", () => {
    expect(
      hotspotLabel({ name: "", lat: Number.NaN, lon: Number.NaN }),
    ).toBe("Unknown place");
  });
});
