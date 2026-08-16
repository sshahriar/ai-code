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

  it("invokes onSelect when clicked", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    const event = FIXTURE_EVENTS[0];
    render(<EventCard event={event} onSelect={onSelect} />);

    await user.click(screen.getByTestId("event-card"));
    expect(onSelect).toHaveBeenCalledWith(event);
  });
});
