import { describe, expect, it } from "vitest";
import type { MapViewProps } from "@/components/MapView";
import { FIXTURE_EVENTS, FIXTURE_HEAT } from "@/lib/fixtures";

/** Prop contract for MapView — unit-tested without mounting Leaflet / tiles. */
function assertMapProps(props: MapViewProps): string[] {
  const errors: string[] = [];
  if (!Array.isArray(props.events)) errors.push("events must be array");
  if (!Array.isArray(props.heatPoints)) errors.push("heatPoints must be array");
  if (typeof props.heatmap !== "boolean") errors.push("heatmap must be boolean");
  if (typeof props.onBoundsChange !== "function") errors.push("onBoundsChange");
  if (typeof props.onSelectEvent !== "function") errors.push("onSelectEvent");
  for (const e of props.events) {
    if (typeof e.lat !== "number" || typeof e.lon !== "number") {
      errors.push(`event ${e.id} missing coords`);
    }
  }
  return errors;
}

describe("MapView props contract", () => {
  it("accepts fixture events and heat points without tiles", () => {
    const props: MapViewProps = {
      events: FIXTURE_EVENTS,
      heatPoints: FIXTURE_HEAT,
      heatmap: true,
      selectedId: FIXTURE_EVENTS[0].id,
      flyTarget: { lat: 23.8103, lon: 90.4125, zoom: 11 },
      onBoundsChange: () => undefined,
      onSelectEvent: () => undefined,
    };

    expect(assertMapProps(props)).toEqual([]);
    expect(props.events.every((e) => e.source === "sample")).toBe(true);
    expect(props.flyTarget?.lat).toBeCloseTo(23.8103);
  });

  it("allows empty events for honest empty map state", () => {
    const props: MapViewProps = {
      events: [],
      heatPoints: [],
      heatmap: false,
      selectedId: null,
      flyTarget: null,
      onBoundsChange: () => undefined,
      onSelectEvent: () => undefined,
    };
    expect(assertMapProps(props)).toEqual([]);
  });
});
