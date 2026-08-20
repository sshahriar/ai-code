import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { AiPanel } from "@/components/AiPanel";

function renderPanel(overrides: Partial<Parameters<typeof AiPanel>[0]> = {}) {
  const props = {
    brief: null,
    messages: [],
    loading: false,
    onSend: vi.fn().mockResolvedValue(undefined),
    onLoadBrief: vi.fn(),
    ...overrides,
  };
  render(<AiPanel {...props} />);
  return props;
}

async function openAnalyst() {
  const fab = screen.getByTestId("ai-fab");
  if (fab.getAttribute("aria-expanded") !== "true") {
    await userEvent.click(fab);
  }
}

describe("AiPanel floating bubble", () => {
  it("starts closed with a FAB over the map", () => {
    renderPanel();
    const fab = screen.getByTestId("ai-fab");
    expect(fab).toHaveAttribute("aria-expanded", "false");
    expect(fab).toHaveAccessibleName(/open ai analyst/i);
    expect(screen.getByTestId("ai-panel")).toHaveAttribute("aria-hidden", "true");
  });

  it("opens the panel from the FAB and focuses the composer", async () => {
    renderPanel();
    await openAnalyst();
    const fab = screen.getByTestId("ai-fab");
    expect(fab).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByTestId("ai-panel")).toHaveAttribute("aria-hidden", "false");
    await waitFor(() => expect(screen.getByTestId("ai-input")).toHaveFocus());
  });

  it("closes on Escape and restores focus to the FAB", async () => {
    renderPanel();
    await openAnalyst();
    await userEvent.keyboard("{Escape}");
    expect(screen.getByTestId("ai-fab")).toHaveAttribute("aria-expanded", "false");
    await waitFor(() => expect(screen.getByTestId("ai-fab")).toHaveFocus());
  });

  it("sends on Enter and keeps Shift+Enter as a newline", async () => {
    const props = renderPanel();
    await openAnalyst();
    const input = screen.getByTestId("ai-input");
    await userEvent.type(input, "Brief this place");
    await userEvent.keyboard("{Enter}");
    expect(props.onSend).toHaveBeenCalledWith("Brief this place");

    props.onSend.mockClear();
    await userEvent.type(input, "line{Shift>}{Enter}{/Shift}two");
    expect(props.onSend).not.toHaveBeenCalled();
  });

  it("sends a suggestion chip", async () => {
    const props = renderPanel();
    await openAnalyst();
    await userEvent.click(screen.getByRole("button", { name: "Summarize risk" }));
    expect(props.onSend).toHaveBeenCalledWith("Summarize risk");
  });
});

describe("AiPanel mock labeling and errors", () => {
  it("labels mock mode and explains how to enable live AI", async () => {
    renderPanel({ mockMode: true });
    await openAnalyst();
    const badge = screen.getByTestId("ai-mock-badge");
    expect(badge).toHaveTextContent("Mock AI");
    expect(badge).toHaveTextContent("OpenRouter");
    expect(badge).toHaveTextContent("LLM_MOCK=false");
  });

  it("hides the mock badge for live responses", async () => {
    renderPanel({ mockMode: false });
    await openAnalyst();
    expect(screen.queryByTestId("ai-mock-badge")).toBeNull();
  });

  it("keeps deterministic mock chat usable", async () => {
    const props = renderPanel({ mockMode: true });
    await openAnalyst();
    await userEvent.type(screen.getByTestId("ai-input"), "Brief this place");
    await userEvent.click(screen.getByRole("button", { name: "Send" }));
    expect(props.onSend).toHaveBeenCalledWith("Brief this place");
  });

  it("renders a chat error with retry instead of a silent fixture", async () => {
    const onRetry = vi.fn();
    renderPanel({
      error: "Backend unreachable — the GeoNews API did not respond.",
      onRetry,
    });
    await openAnalyst();

    expect(screen.getByTestId("ai-error")).toHaveTextContent("Backend unreachable");
    await userEvent.click(screen.getByTestId("ai-error-retry"));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });
});
