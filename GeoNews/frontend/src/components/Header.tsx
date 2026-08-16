"use client";

import type { HealthStatus } from "@/lib/types";
import type { ApiMode } from "@/lib/api";

interface HeaderProps {
  health: HealthStatus | null;
  apiMode: ApiMode;
}

function statusTone(value?: string): "ok" | "warn" | "bad" {
  if (!value) return "warn";
  if (value === "ok" || value === "mock") return "ok";
  if (value === "degraded" || value === "ingesting") return "warn";
  return "bad";
}

export function Header({ health, apiMode }: HeaderProps) {
  const llm = health?.sources?.llm;
  const ingest = health?.ingest_status;
  const overall =
    !health || !health.ok
      ? "bad"
      : statusTone(ingest === "ingesting" ? "ingesting" : llm);

  const label =
    apiMode === "fixture"
      ? "offline fixtures"
      : ingest === "ingesting"
        ? "ingesting"
        : health?.ok
          ? "live"
          : "degraded";

  const last =
    health?.last_ingest_at != null
      ? new Date(health.last_ingest_at).toLocaleTimeString()
      : null;

  return (
    <header className="flex items-center justify-between gap-3 border-b border-[var(--border)] bg-[var(--panel)]/80 px-3 py-2.5 backdrop-blur-md sm:px-4">
      <div className="min-w-0">
        <p className="font-display text-lg font-semibold tracking-tight text-[var(--text)] sm:text-xl">
          GeoNews
        </p>
        <p className="truncate text-[11px] text-[var(--text-muted)]">
          Place intelligence · free sources only
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-2 text-[11px] text-[var(--text-muted)]">
        {last ? <span className="hidden sm:inline">ingest {last}</span> : null}
        <span
          data-testid="status-dot"
          title={`API ${label}; LLM ${llm ?? "unknown"}`}
          className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--bg)]/60 px-2 py-1"
        >
          <span
            className={[
              "h-2 w-2 rounded-full",
              overall === "ok" && "bg-[var(--safe)]",
              overall === "warn" && "bg-[var(--warning)]",
              overall === "bad" && "bg-[var(--alert)]",
            ]
              .filter(Boolean)
              .join(" ")}
          />
          <span className="capitalize">{label}</span>
        </span>
      </div>
    </header>
  );
}
