import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { FilterChips } from "@/components/FilterChips";

describe("FilterChips", () => {
  it("toggles crime category via filter-crime", async () => {
    const user = userEvent.setup();
    const onCategory = vi.fn();
    render(
      <FilterChips
        category={null}
        window="72h"
        heatmap={false}
        onCategory={onCategory}
        onWindow={vi.fn()}
        onHeatmap={vi.fn()}
      />,
    );

    await user.click(screen.getByTestId("filter-crime"));
    expect(onCategory).toHaveBeenCalledWith("crime");
  });

  it("toggles heatmap via layer-heatmap", async () => {
    const user = userEvent.setup();
    const onHeatmap = vi.fn();
    render(
      <FilterChips
        category={null}
        window="24h"
        heatmap={false}
        onCategory={vi.fn()}
        onWindow={vi.fn()}
        onHeatmap={onHeatmap}
      />,
    );

    await user.click(screen.getByTestId("layer-heatmap"));
    expect(onHeatmap).toHaveBeenCalledWith(true);
  });

  it("sets 7d time window", async () => {
    const user = userEvent.setup();
    const onWindow = vi.fn();
    render(
      <FilterChips
        category="health"
        window="72h"
        heatmap
        onCategory={vi.fn()}
        onWindow={onWindow}
        onHeatmap={vi.fn()}
      />,
    );

    await user.click(screen.getByTestId("window-7d"));
    expect(onWindow).toHaveBeenCalledWith("7d");
  });
});
