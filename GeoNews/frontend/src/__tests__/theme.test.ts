import { afterEach, describe, expect, it } from "vitest";
import {
  STORAGE_KEY,
  applyTheme,
  cartoTileUrl,
  isTheme,
  readDomTheme,
  readTheme,
} from "@/lib/theme";

afterEach(() => {
  localStorage.removeItem(STORAGE_KEY);
  document.documentElement.removeAttribute("data-theme");
  document.documentElement.style.colorScheme = "";
});

describe("theme helpers", () => {
  it("defaults to dark when storage is empty", () => {
    expect(readTheme()).toBe("dark");
  });

  it("ignores garbage stored values", () => {
    localStorage.setItem(STORAGE_KEY, "neon");
    expect(isTheme("neon")).toBe(false);
    expect(readTheme()).toBe("dark");
  });

  it("persists light and sets data-theme plus color-scheme", () => {
    applyTheme("light");
    expect(localStorage.getItem(STORAGE_KEY)).toBe("light");
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
    expect(document.documentElement.style.colorScheme).toBe("light");
    expect(readDomTheme()).toBe("light");
  });

  it("treats unknown apply values as dark", () => {
    applyTheme("dark");
    expect(readDomTheme()).toBe("dark");
    expect(document.documentElement.style.colorScheme).toBe("dark");
  });

  it("maps Carto tile URLs by theme", () => {
    expect(cartoTileUrl("dark")).toContain("dark_all");
    expect(cartoTileUrl("light")).toContain("light_all");
  });
});
