import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi, type Mock } from "vitest";
import { GeoNewsApp } from "@/components/GeoNewsApp";
import {
  addWatchlist,
  getBrief,
  getEvents,
  getHealth,
  getHeatmap,
  getHotspots,
  getWatchlist,
  postChat,
  postIngestPlace,
  searchPlaces,
  subscribeEventStream,
  ApiError,
} from "@/lib/api";
import type { GeoEvent, IngestPlaceResult } from "@/lib/types";

vi.mock("@/components/MapCanvas", () => ({
  MapCanvas: () => <div data-testid="geonews-map" />,
}));

vi.mock("@/lib/api", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/api")>();
  return {
    ...actual,
    getHealth: vi.fn(),
    getEvents: vi.fn(),
    getWatchlist: vi.fn(),
    getHeatmap: vi.fn(),
    getHotspots: vi.fn(),
    searchPlaces: vi.fn(),
    addWatchlist: vi.fn(),
    postIngestPlace: vi.fn(),
    postChat: vi.fn(),
    getBrief: vi.fn(),
    subscribeEventStream: vi.fn(),
  };
});

const mocks = {
  getHealth: getHealth as unknown as Mock,
  getEvents: getEvents as unknown as Mock,
  getWatchlist: getWatchlist as unknown as Mock,
  getHeatmap: getHeatmap as unknown as Mock,
  getHotspots: getHotspots as unknown as Mock,
  searchPlaces: searchPlaces as unknown as Mock,
  addWatchlist: addWatchlist as unknown as Mock,
  postIngestPlace: postIngestPlace as unknown as Mock,
  postChat: postChat as unknown as Mock,
  getBrief: getBrief as unknown as Mock,
  subscribeEventStream: subscribeEventStream as unknown as Mock,
};

const CHATTOGRAM_EVENT: GeoEvent = {
  id: "ctg-1",
  source: "gdelt",
  title: "Port congestion eases in Chattogram",
  summary: "Container backlog cleared overnight.",
  url: "https://example.local/ctg",
  source_name: "Wire",
  category: "economy",
  severity: 2,
  lat: 22.3569,
  lon: 91.7832,
  place_name: "Chattogram",
  occurred_at: "2026-08-16T02:00:00Z",
};

function ingestResult(overrides: Partial<IngestPlaceResult> = {}): IngestPlaceResult {
  return {
    ok: true,
    place: { name: "Chattogram", lat: 22.3569, lon: 91.7832 },
    rows_upserted: 1,
    sources: ["gdelt"],
    events: [CHATTOGRAM_EVENT],
    ...overrides,
  };
}

async function selectChattogram() {
  await userEvent.type(screen.getByTestId("place-search"), "Chatto");
  const option = await screen.findByRole(
    "option",
    { name: /Chattogram/ },
    { timeout: 3000 },
  );
  await userEvent.click(option);
}

beforeEach(() => {
  for (const mock of Object.values(mocks)) mock.mockReset();

  mocks.getHealth.mockResolvedValue({
    data: { ok: true, sources: { llm: "mock", gdelt: "ok" } },
    mode: "live",
  });
  mocks.getEvents.mockResolvedValue({ data: [], mode: "live" });
  mocks.getWatchlist.mockResolvedValue({ data: [], mode: "live" });
  mocks.getHeatmap.mockResolvedValue({ data: [], mode: "live" });
  mocks.getHotspots.mockResolvedValue({ data: [], mode: "live" });
  mocks.searchPlaces.mockResolvedValue({
    data: [
      {
        name: "Chattogram, Bangladesh",
        lat: 22.3569,
        lon: 91.7832,
        country_code: "bd",
      },
    ],
    mode: "live",
  });
  mocks.postIngestPlace.mockResolvedValue(ingestResult());
  mocks.postChat.mockResolvedValue({ message: "Mock analyst reply", mock: true });
  mocks.getBrief.mockResolvedValue({
    place_name: "Chattogram",
    window: "72h",
    headline: "Quiet",
    risk_level: "low",
    bullets: [],
    caveats: [],
    mock: true,
  });
  mocks.subscribeEventStream.mockReturnValue(() => undefined);
});

describe("place selection triggers scoped ingest", () => {
  it("flies, shows a fetching state, then reports the fetched count", async () => {
    let release: (value: IngestPlaceResult) => void = () => undefined;
    mocks.postIngestPlace.mockReturnValueOnce(
      new Promise<IngestPlaceResult>((resolve) => {
        release = resolve;
      }),
    );

    render(<GeoNewsApp />);
    await selectChattogram();

    await waitFor(() =>
      expect(screen.getByTestId("place-ingest-status")).toHaveTextContent(
        "Fetching news for Chattogram…",
      ),
    );
    // The map stays mounted and usable while the scoped ingest runs.
    expect(screen.getByTestId("geonews-map")).toBeInTheDocument();

    release(ingestResult());

    await waitFor(() =>
      expect(screen.getByTestId("place-ingest-status")).toHaveTextContent(
        "Fetched 1 event for Chattogram",
      ),
    );
    expect(mocks.postIngestPlace).toHaveBeenCalledWith({
      name: "Chattogram",
      lat: 22.3569,
      lon: 91.7832,
      country_code: "bd",
    });
    expect(screen.getByTestId("intel-drawer")).toHaveTextContent(
      "Port congestion eases in Chattogram",
    );
  });

  it("does not add the selected place to the watchlist", async () => {
    render(<GeoNewsApp />);
    await selectChattogram();

    await waitFor(() =>
      expect(screen.getByTestId("place-ingest-status")).toHaveAttribute(
        "data-state",
        "success",
      ),
    );
    expect(mocks.addWatchlist).not.toHaveBeenCalled();
  });

  it("shows a no-news state when the place has nothing recent", async () => {
    mocks.postIngestPlace.mockResolvedValue(
      ingestResult({ rows_upserted: 0, events: [] }),
    );

    render(<GeoNewsApp />);
    await selectChattogram();

    await waitFor(() =>
      expect(screen.getByTestId("place-ingest-status")).toHaveTextContent(
        "No recent news found for Chattogram",
      ),
    );
  });

  it("surfaces an ingest failure with retry rather than fixtures", async () => {
    mocks.postIngestPlace.mockRejectedValueOnce(
      new ApiError("Ingest source unavailable", "ingest_failed", 502),
    );

    render(<GeoNewsApp />);
    await selectChattogram();

    await waitFor(() =>
      expect(screen.getByTestId("place-ingest-error")).toHaveTextContent(
        "Could not fetch news for Chattogram: Ingest source unavailable",
      ),
    );

    mocks.postIngestPlace.mockResolvedValueOnce(ingestResult());
    await userEvent.click(screen.getByTestId("place-ingest-retry"));

    await waitFor(() =>
      expect(screen.getByTestId("place-ingest-status")).toHaveTextContent(
        "Fetched 1 event for Chattogram",
      ),
    );
  });
});

async function openAnalyst() {
  const fab = screen.getByTestId("ai-fab");
  if (fab.getAttribute("aria-expanded") !== "true") {
    await userEvent.click(fab);
  }
}

describe("chat mock labeling and error handling", () => {
  it("labels mock mode from health before any chat call", async () => {
    render(<GeoNewsApp />);
    await openAnalyst();
    expect(await screen.findByTestId("ai-mock-badge")).toHaveTextContent("Mock AI");
  });

  it("keeps mock chat usable and labels the mock reply", async () => {
    mocks.getHealth.mockResolvedValue({
      data: { ok: true, sources: { llm: "ok" } },
      mode: "live",
    });

    render(<GeoNewsApp />);
    await openAnalyst();
    await userEvent.type(screen.getByTestId("ai-input"), "Brief this place");
    await userEvent.click(screen.getByRole("button", { name: "Send" }));

    expect(await screen.findByText(/Mock analyst reply/)).toBeInTheDocument();
    expect(screen.getByTestId("ai-mock-badge")).toBeInTheDocument();
    expect(screen.queryByTestId("ai-error")).toBeNull();
  });

  it("shows a chat error instead of pretending success", async () => {
    mocks.postChat.mockRejectedValueOnce(new ApiError("Could not reach", "network", null));

    render(<GeoNewsApp />);
    await openAnalyst();
    await userEvent.type(screen.getByTestId("ai-input"), "What happened?");
    await userEvent.click(screen.getByRole("button", { name: "Send" }));

    const error = await screen.findByTestId("ai-error");
    expect(error).toHaveTextContent("Backend unreachable");

    mocks.postChat.mockResolvedValueOnce({ message: "Recovered reply", mock: true });
    await userEvent.click(screen.getByTestId("ai-error-retry"));

    expect(await screen.findByText(/Recovered reply/)).toBeInTheDocument();
    expect(screen.queryByTestId("ai-error")).toBeNull();
  });

  it("sends chat for the selected place after ingest", async () => {
    mocks.getHealth.mockResolvedValue({
      data: { ok: true, sources: { llm: "ok" } },
      mode: "live",
    });
    mocks.postChat.mockResolvedValue({
      message: "Live analyst: port delays around Chattogram are easing.",
      mock: false,
    });

    render(<GeoNewsApp />);
    await selectChattogram();
    await waitFor(() =>
      expect(screen.getByTestId("place-ingest-status")).toHaveAttribute(
        "data-state",
        "success",
      ),
    );

    await openAnalyst();
    await userEvent.type(screen.getByTestId("ai-input"), "Brief this place");
    await userEvent.click(screen.getByRole("button", { name: "Send" }));

    await waitFor(() => expect(mocks.postChat).toHaveBeenCalled());
    expect(mocks.postChat).toHaveBeenCalledWith({
      message: "Brief this place",
      lat: 22.3569,
      lon: 91.7832,
      place_name: "Chattogram",
      window: "72h",
    });
    expect(
      await screen.findByText(/Live analyst: port delays around Chattogram/),
    ).toBeInTheDocument();
    expect(screen.queryByTestId("ai-mock-badge")).toBeNull();
  });

  it("shows a brief error when getBrief fails", async () => {
    mocks.getBrief.mockRejectedValueOnce(
      new ApiError("llm package not installed", "llm_unavailable", 501),
    );

    render(<GeoNewsApp />);
    await openAnalyst();
    await userEvent.click(screen.getByRole("button", { name: "Brief place" }));

    expect(await screen.findByTestId("ai-error")).toHaveTextContent(
      "llm package not installed",
    );
  });
});
