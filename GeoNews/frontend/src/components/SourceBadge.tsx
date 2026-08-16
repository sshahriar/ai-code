"use client";

import { sourceLabel, sourceTone } from "@/lib/source";

interface SourceBadgeProps {
  source: string;
  sourceName?: string;
}

export function SourceBadge({ source, sourceName }: SourceBadgeProps) {
  const tone = sourceTone(source);
  const label = sourceName?.trim() || sourceLabel(source);

  return (
    <span
      data-testid="source-badge"
      data-source={source}
      className={[
        "inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[11px] font-medium tracking-wide",
        tone === "demo" &&
          "border border-dashed border-[var(--warning)]/50 bg-[var(--warning)]/10 text-[var(--warning)]",
        tone === "official" &&
          "border border-[var(--border)] bg-[var(--panel-2)] text-[var(--text-muted)]",
        tone === "news" &&
          "border border-[var(--accent)]/30 bg-[var(--accent)]/10 text-[var(--accent)]",
      ]
        .filter(Boolean)
        .join(" ")}
      title={
        tone === "demo"
          ? "Demo / sample data — not an official police report"
          : undefined
      }
    >
      {tone === "demo" ? "DEMO" : null}
      <span>{label}</span>
    </span>
  );
}
