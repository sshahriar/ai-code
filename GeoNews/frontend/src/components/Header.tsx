"use client";

import { useEffect, useState } from "react";
import type { HealthStatus } from "@/lib/types";
import type { ApiMode } from "@/lib/api";
import {
  readDomTheme,
  subscribeTheme,
  toggleTheme,
  type Theme,
} from "@/lib/theme";

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

function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    setTheme(readDomTheme());
    return subscribeTheme(setTheme);
  }, []);

  const next = theme === "dark" ? "light" : "dark";
  const label = `Switch to ${next} mode`;

  return (
    <button
      type="button"
      data-testid="theme-toggle"
      aria-label={label}
      aria-pressed={theme === "light"}
      title={label}
      onClick={() => setTheme(toggleTheme())}
      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg)]/60 text-[var(--text)] outline-none hover:bg-[var(--panel-2)] focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
    >
      {theme === "dark" ? (
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12Zm0 4a1 1 0 0 1-1-1v-1a1 1 0 1 1 2 0v1a1 1 0 0 1-1 1ZM12 4a1 1 0 0 1-1-1V2a1 1 0 1 1 2 0v1a1 1 0 0 1-1 1Zm8 9a1 1 0 0 1-1-1 1 1 0 1 1 2 0 1 1 0 0 1-1 1ZM5 13a1 1 0 0 1-1-1 1 1 0 1 1 2 0 1 1 0 0 1-1 1Zm12.95 5.66a1 1 0 0 1-1.41 0l-.71-.7a1 1 0 0 1 1.41-1.42l.71.71a1 1 0 0 1 0 1.41ZM8.17 7.46a1 1 0 0 1-1.41 0l-.71-.71A1 1 0 0 1 7.46 5.34l.71.71a1 1 0 0 1 0 1.41Zm10.67-2.12a1 1 0 0 1 0 1.41l-.71.71A1 1 0 1 1 16.72 6l.71-.71a1 1 0 0 1 1.41 0ZM7.46 16.54a1 1 0 0 1 0 1.41l-.71.71A1 1 0 1 1 5.34 17.24l.71-.7a1 1 0 0 1 1.41 0Z"
          />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
          <path
            fill="currentColor"
            d="M21 14.3A9 9 0 1 1 9.7 3a7 7 0 1 0 11.3 11.3Z"
          />
        </svg>
      )}
    </button>
  );
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
        <ThemeToggle />
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
