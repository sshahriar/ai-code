import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { PlaceIngestStatus } from "@/components/PlaceIngestStatus";

describe("PlaceIngestStatus", () => {
  it("renders nothing while idle", () => {
    render(<PlaceIngestStatus state={{ status: "idle" }} onRetry={() => undefined} />);
    expect(screen.queryByTestId("place-ingest-status")).toBeNull();
  });

  it("shows the fetching state for the selected place", () => {
    render(
      <PlaceIngestStatus
        state={{ status: "loading", place: "Chattogram" }}
        onRetry={() => undefined}
      />,
    );
    expect(screen.getByTestId("place-ingest-status")).toHaveTextContent(
      "Fetching news for Chattogram…",
    );
  });

  it("shows the fetched count and sources", () => {
    render(
      <PlaceIngestStatus
        state={{
          status: "success",
          place: "Chattogram",
          count: 4,
          rows_upserted: 4,
          sources: ["gdelt", "rss"],
        }}
        onRetry={() => undefined}
      />,
    );
    const status = screen.getByTestId("place-ingest-status");
    expect(status).toHaveTextContent("Fetched 4 events for Chattogram");
    expect(status).toHaveTextContent("sources: gdelt, rss");
  });

  it("shows a clean no-news state", () => {
    render(
      <PlaceIngestStatus
        state={{ status: "empty", place: "Chattogram", sources: [] }}
        onRetry={() => undefined}
      />,
    );
    expect(screen.getByTestId("place-ingest-status")).toHaveTextContent(
      "No recent news found for Chattogram",
    );
  });

  it("shows the error with a retry button", async () => {
    const onRetry = vi.fn();
    render(
      <PlaceIngestStatus
        state={{ status: "error", place: "Chattogram", message: "GDELT refused" }}
        onRetry={onRetry}
      />,
    );

    expect(screen.getByTestId("place-ingest-error")).toHaveTextContent(
      "Could not fetch news for Chattogram: GDELT refused",
    );
    await userEvent.click(screen.getByTestId("place-ingest-retry"));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });
});
