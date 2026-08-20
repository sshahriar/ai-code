import { act, renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi, type Mock } from "vitest";
import { ApiError, postIngestPlace } from "@/lib/api";
import { usePlaceIngest, type PlaceIngestTarget } from "@/lib/usePlaceIngest";
import type { GeoEvent, IngestPlaceResult } from "@/lib/types";

vi.mock("@/lib/api", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/api")>();
  return { ...actual, postIngestPlace: vi.fn() };
});

const ingestMock = postIngestPlace as unknown as Mock;

const CHATTOGRAM: PlaceIngestTarget = {
  name: "Chattogram",
  lat: 22.3569,
  lon: 91.7832,
  country_code: "bd",
};

function makeEvent(id: string): GeoEvent {
  return {
    id,
    source: "gdelt",
    title: `Headline ${id}`,
    summary: "",
    url: "https://example.local/a",
    source_name: "Wire",
    category: "other",
    severity: 1,
    lat: 22.3569,
    lon: 91.7832,
    place_name: "Chattogram",
    occurred_at: "2026-08-16T00:00:00Z",
  };
}

function makeResult(overrides: Partial<IngestPlaceResult> = {}): IngestPlaceResult {
  return {
    ok: true,
    place: { name: "Chattogram", lat: 22.3569, lon: 91.7832 },
    rows_upserted: 0,
    sources: [],
    events: [],
    ...overrides,
  };
}

function setup() {
  const onEvents = vi.fn();
  const onReload = vi.fn();
  const hook = renderHook(() => usePlaceIngest({ onEvents, onReload }));
  return { ...hook, onEvents, onReload };
}

beforeEach(() => {
  ingestMock.mockReset();
});

describe("usePlaceIngest", () => {
  it("reports loading then success with the fetched count", async () => {
    let release: (value: IngestPlaceResult) => void = () => undefined;
    ingestMock.mockReturnValueOnce(
      new Promise<IngestPlaceResult>((resolve) => {
        release = resolve;
      }),
    );

    const { result, onEvents } = setup();

    act(() => {
      void result.current.start(CHATTOGRAM);
    });
    expect(result.current.state).toEqual({ status: "loading", place: "Chattogram" });

    await act(async () => {
      release(
        makeResult({
          rows_upserted: 2,
          sources: ["gdelt", { source: "rss", status: "ok" }],
          events: [makeEvent("a"), makeEvent("b")],
        }),
      );
    });

    expect(ingestMock).toHaveBeenCalledWith(CHATTOGRAM);
    expect(onEvents).toHaveBeenCalledWith([
      expect.objectContaining({ id: "a" }),
      expect.objectContaining({ id: "b" }),
    ]);
    expect(result.current.state).toEqual({
      status: "success",
      place: "Chattogram",
      count: 2,
      rows_upserted: 2,
      sources: ["gdelt", "rss"],
    });
  });

  it("reports an empty state when the place has no news", async () => {
    ingestMock.mockResolvedValueOnce(makeResult({ sources: ["gdelt"] }));
    const { result, onEvents } = setup();

    await act(async () => {
      await result.current.start(CHATTOGRAM);
    });

    expect(onEvents).toHaveBeenCalledWith([]);
    expect(result.current.state).toEqual({
      status: "empty",
      place: "Chattogram",
      sources: ["gdelt"],
    });
  });

  it("falls back to a bbox reload when the response omits events", async () => {
    ingestMock.mockResolvedValueOnce(makeResult({ rows_upserted: 3, events: null }));
    const { result, onEvents, onReload } = setup();

    await act(async () => {
      await result.current.start(CHATTOGRAM);
    });

    expect(onEvents).not.toHaveBeenCalled();
    expect(onReload).toHaveBeenCalledTimes(1);
    expect(result.current.state).toMatchObject({ status: "success", count: 3 });
  });

  it("surfaces ingest failures instead of fixtures, and retries", async () => {
    ingestMock
      .mockRejectedValueOnce(new ApiError("GDELT refused the request", "gdelt_down", 502))
      .mockResolvedValueOnce(makeResult({ rows_upserted: 1, events: [makeEvent("a")] }));

    const { result } = setup();

    await act(async () => {
      await result.current.start(CHATTOGRAM);
    });
    expect(result.current.state).toEqual({
      status: "error",
      place: "Chattogram",
      message: "GDELT refused the request",
    });

    await act(async () => {
      result.current.retry();
    });
    await waitFor(() =>
      expect(result.current.state).toMatchObject({ status: "success", count: 1 }),
    );
    expect(ingestMock).toHaveBeenCalledTimes(2);
  });

  it("names an unreachable backend distinctly from a rejected request", async () => {
    ingestMock.mockRejectedValueOnce(new ApiError("Could not reach", "network", null));
    const { result } = setup();

    await act(async () => {
      await result.current.start(CHATTOGRAM);
    });

    expect(result.current.state).toMatchObject({
      status: "error",
      message: expect.stringContaining("Backend unreachable"),
    });
  });

  it("ignores a stale response when another place was selected first", async () => {
    let releaseSlow: (value: IngestPlaceResult) => void = () => undefined;
    const slow = new Promise<IngestPlaceResult>((resolve) => {
      releaseSlow = resolve;
    });
    ingestMock.mockReturnValueOnce(slow).mockResolvedValueOnce(
      makeResult({
        place: { name: "London", lat: 51.5074, lon: -0.1278 },
        rows_upserted: 1,
        events: [makeEvent("london-1")],
      }),
    );

    const { result, onEvents } = setup();

    act(() => {
      void result.current.start(CHATTOGRAM);
    });
    await act(async () => {
      await result.current.start({ name: "London", lat: 51.5074, lon: -0.1278 });
    });

    expect(result.current.state).toMatchObject({ status: "success", place: "London" });

    await act(async () => {
      releaseSlow(
        makeResult({ rows_upserted: 99, events: [makeEvent("stale-1"), makeEvent("stale-2")] }),
      );
      await slow;
    });

    expect(result.current.state).toMatchObject({ status: "success", place: "London", count: 1 });
    expect(onEvents).toHaveBeenCalledTimes(1);
    expect(onEvents).toHaveBeenCalledWith([expect.objectContaining({ id: "london-1" })]);
  });
});
