import { afterEach, describe, expect, it, vi } from "vitest";
import { getEvents, resetFixtureState } from "@/lib/api";
import { sinceIso } from "@/lib/categories";

afterEach(() => {
  resetFixtureState();
  vi.unstubAllGlobals();
});

describe("api client fixtures", () => {
  it("falls back to sample events when fetch fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new Error("network")),
    );

    const { data, mode } = await getEvents({
      window: "7d",
      category: "crime",
    });

    expect(mode).toBe("fixture");
    expect(data.length).toBeGreaterThan(0);
    expect(data.every((e) => e.category === "crime")).toBe(true);
  });

  it("sinceIso matches window lengths", () => {
    const now = Date.parse("2026-08-16T12:00:00Z");
    expect(sinceIso("24h", now)).toBe("2026-08-15T12:00:00.000Z");
    expect(sinceIso("72h", now)).toBe("2026-08-13T12:00:00.000Z");
  });
});
