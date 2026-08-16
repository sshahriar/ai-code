import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HotspotList } from "@/components/HotspotList";

describe("HotspotList", () => {
  it("never renders a chip without a place label", () => {
    render(
      <HotspotList
        hotspots={[
          { name: "Gulshan", lat: 23.7925, lon: 90.4078, count: 3 },
          { name: "  ", lat: 51.5074, lon: -0.1278, count: 2 },
        ]}
        onSelect={() => undefined}
      />,
    );

    const chips = within(screen.getByTestId("hotspot-list")).getAllByRole("button");
    expect(chips).toHaveLength(2);
    expect(chips[0]).toHaveTextContent("Gulshan×3");
    expect(chips[1]).toHaveTextContent("51.51, -0.13×2");
    for (const chip of chips) {
      expect((chip.textContent ?? "").replace(/×\d+/, "").trim()).not.toBe("");
    }
  });
});
