import { afterEach, describe, expect, it, vi } from "vitest";
import {
  ApiError,
  describeApiError,
  getBrief,
  getEvents,
  postChat,
  postIngestPlace,
  resetFixtureState,
} from "@/lib/api";
import { sinceIso } from "@/lib/categories";

function jsonResponse(body: unknown, status = 200): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  } as unknown as Response;
}

afterEach(() => {
  resetFixtureState();
  vi.unstubAllGlobals();
});

describe("api client fixtures", () => {
  it("falls back to sample events when fetch fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network")));

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

describe("postIngestPlace", () => {
  it("posts the scoped body and normalizes the response", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      jsonResponse({
        ok: true,
        place: { name: "Chattogram", lat: 22.3569, lon: 91.7832, country_code: "bd" },
        rows_upserted: 2,
        sources: ["gdelt", { source: "rss" }],
        events: [{ id: "a" }, { id: "b" }],
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    const result = await postIngestPlace({
      name: "Chattogram",
      lat: 22.3569,
      lon: 91.7832,
      country_code: "bd",
    });

    const [path, init] = fetchMock.mock.calls[0];
    expect(path).toBe("/api/ingest/place");
    expect(init.method).toBe("POST");
    expect(JSON.parse(init.body)).toEqual({
      name: "Chattogram",
      lat: 22.3569,
      lon: 91.7832,
      country_code: "bd",
    });
    expect(result.rows_upserted).toBe(2);
    expect(result.events).toHaveLength(2);
  });

  it("returns null events when the response omits them", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(jsonResponse({ ok: true, rows_upserted: 4 })),
    );

    const result = await postIngestPlace({ name: "Dhaka", lat: 23.8, lon: 90.4 });
    expect(result.events).toBeNull();
    expect(result.rows_upserted).toBe(4);
  });

  it("throws the backend error shape instead of returning fixtures", async () => {
    vi.stubGlobal(
      "fetch",
      vi
        .fn()
        .mockResolvedValue(
          jsonResponse(
            { error: { code: "ingest_failed", message: "GDELT unavailable" } },
            502,
          ),
        ),
    );

    await expect(
      postIngestPlace({ name: "Dhaka", lat: 23.8, lon: 90.4 }),
    ).rejects.toMatchObject({
      name: "ApiError",
      code: "ingest_failed",
      status: 502,
      message: "GDELT unavailable",
    });
  });

  it("throws when the backend reports ok: false", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse({ ok: false })));
    await expect(
      postIngestPlace({ name: "Dhaka", lat: 23.8, lon: 90.4 }),
    ).rejects.toBeInstanceOf(ApiError);
  });
});

describe("chat and brief surface failures", () => {
  it("postChat preserves the backend mock flag", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(jsonResponse({ message: "hi", mock: true })),
    );
    const data = await postChat({ message: "hi" });
    expect(data.mock).toBe(true);
  });

  it("postChat throws instead of returning a fixture when offline", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network")));
    await expect(postChat({ message: "hi" })).rejects.toMatchObject({
      code: "network",
      status: null,
    });
  });

  it("getBrief throws instead of returning a fixture when offline", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network")));
    await expect(getBrief({ lat: 23.8, lon: 90.4, window: "72h" })).rejects.toBeInstanceOf(
      ApiError,
    );
  });

  it("describeApiError distinguishes unreachable from rejected", () => {
    expect(describeApiError(new ApiError("x", "network", null), "fallback")).toContain(
      "Backend unreachable",
    );
    expect(describeApiError(new ApiError("Rate limited", "rate_limit", 429), "fallback")).toBe(
      "Rate limited",
    );
    expect(describeApiError({}, "fallback")).toBe("fallback");
  });
});
