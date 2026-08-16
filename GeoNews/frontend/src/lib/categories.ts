import type { EventCategory } from "./types";

export const CATEGORIES: EventCategory[] = [
  "crime",
  "conflict",
  "disaster",
  "politics",
  "health",
  "economy",
  "other",
];

/** Category pin / chip colors from plan.md §3 and leaflet skill */
export const CATEGORY_COLORS: Record<EventCategory, string> = {
  crime: "#f43f5e",
  conflict: "#fb7185",
  disaster: "#f59e0b",
  politics: "#818cf8",
  health: "#34d399",
  economy: "#22d3ee",
  other: "#94a3b8",
};

export function categoryColor(category: string): string {
  return CATEGORY_COLORS[category as EventCategory] ?? CATEGORY_COLORS.other;
}

export const TIME_WINDOWS = [
  { id: "24h" as const, label: "24h" },
  { id: "72h" as const, label: "72h" },
  { id: "7d" as const, label: "7d" },
];

export function sinceIso(window: "24h" | "72h" | "7d", now = Date.now()): string {
  const hours = window === "24h" ? 24 : window === "72h" ? 72 : 168;
  return new Date(now - hours * 60 * 60 * 1000).toISOString();
}
