import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { Header } from "@/components/Header";
import { STORAGE_KEY } from "@/lib/theme";

afterEach(() => {
  localStorage.removeItem(STORAGE_KEY);
  document.documentElement.setAttribute("data-theme", "dark");
  document.documentElement.style.colorScheme = "dark";
});

describe("Header theme toggle", () => {
  it("flips data-theme and localStorage from dark to light", async () => {
    document.documentElement.setAttribute("data-theme", "dark");
    render(
      <Header health={{ ok: true, sources: { llm: "ok" } }} apiMode="live" />,
    );

    const toggle = screen.getByTestId("theme-toggle");
    expect(toggle).toHaveAccessibleName(/switch to light mode/i);

    await userEvent.click(toggle);

    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
    expect(localStorage.getItem(STORAGE_KEY)).toBe("light");
    expect(document.documentElement.style.colorScheme).toBe("light");
    expect(toggle).toHaveAccessibleName(/switch to dark mode/i);
    expect(toggle).toHaveAttribute("aria-pressed", "true");
  });
});
