import type { EventSource } from "./types";

const LABELS: Record<string, string> = {
  gdelt: "GDELT",
  guardian: "Guardian",
  rss: "News RSS",
  police_uk: "Police.uk",
  reliefweb: "ReliefWeb",
  sample: "Sample (demo)",
};

export function sourceLabel(source: string): string {
  return LABELS[source] ?? source;
}

/** Sample / demo sources must not read as official police reports. */
export function isDemoSource(source: string): boolean {
  return source === "sample" || source === "gdelt";
}

export function sourceTone(source: EventSource | string): "demo" | "official" | "news" {
  if (source === "sample") return "demo";
  if (source === "police_uk") return "official";
  return "news";
}
