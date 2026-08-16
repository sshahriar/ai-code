import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SourceBadge } from "@/components/SourceBadge";

describe("SourceBadge", () => {
  it("marks sample sources as DEMO so they do not look like police reports", () => {
    render(<SourceBadge source="sample" sourceName="GeoNews Sample Wire" />);
    const badge = screen.getByTestId("source-badge");
    expect(badge).toHaveTextContent("DEMO");
    expect(badge).toHaveTextContent("GeoNews Sample Wire");
    expect(badge.getAttribute("title") ?? "").toMatch(/not an official police/i);
  });

  it("renders police_uk without DEMO label", () => {
    render(<SourceBadge source="police_uk" sourceName="Police.uk" />);
    expect(screen.getByTestId("source-badge")).not.toHaveTextContent("DEMO");
    expect(screen.getByTestId("source-badge")).toHaveTextContent("Police.uk");
  });
});
