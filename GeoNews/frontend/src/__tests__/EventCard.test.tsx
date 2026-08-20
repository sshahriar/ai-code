import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { EventCard } from "@/components/EventCard";
import { FIXTURE_EVENTS } from "@/lib/fixtures";

describe("EventCard", () => {
  it("renders title, sample demo badge, and category", () => {
    const event = FIXTURE_EVENTS[1];
    render(<EventCard event={event} />);

    expect(screen.getByTestId("event-card")).toHaveAttribute(
      "data-event-id",
      event.id,
    );
    expect(screen.getByText(event.title)).toBeInTheDocument();
    expect(screen.getByTestId("source-badge")).toHaveTextContent(/DEMO/i);
    expect(screen.getByTestId("source-badge")).toHaveAttribute(
      "data-source",
      "sample",
    );
  });

  it("links the headline to the source article without selecting the card", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    const event = { ...FIXTURE_EVENTS[0], url: "https://example.org/story" };
    render(<EventCard event={event} onSelect={onSelect} />);

    const link = screen.getByTestId("event-link");
    expect(link).toHaveAttribute("href", event.url);
    expect(link).toHaveAttribute("target", "_blank");
    expect(screen.getByText(/read full article/i)).toHaveAttribute(
      "href",
      event.url,
    );

    await user.click(link);
    expect(onSelect).not.toHaveBeenCalled();
  });

  it("renders a plain headline when the event has no url", () => {
    const event = { ...FIXTURE_EVENTS[0], url: null };
    render(<EventCard event={event} />);

    expect(screen.queryByTestId("event-link")).toBeNull();
    expect(screen.getByText(event.title)).toBeInTheDocument();
  });

  it("invokes onSelect when clicked", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    const event = FIXTURE_EVENTS[0];
    render(<EventCard event={event} onSelect={onSelect} />);

    await user.click(screen.getByTestId("event-card"));
    expect(onSelect).toHaveBeenCalledWith(event);
  });
});
