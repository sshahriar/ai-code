"use client";

import type { PlaceIngestState } from "@/lib/usePlaceIngest";

interface PlaceIngestStatusProps {
  state: PlaceIngestState;
  onRetry: () => void;
}

function sourceSuffix(sources: string[]): string {
  return sources.length > 0 ? ` · sources: ${sources.join(", ")}` : "";
}

export function PlaceIngestStatus({ state, onRetry }: PlaceIngestStatusProps) {
  if (state.status === "idle") return null;

  const tone =
    state.status === "error"
      ? "text-[var(--alert)]"
      : state.status === "empty"
        ? "text-[var(--warning)]"
        : "text-[var(--text-muted)]";

  return (
    <div
      data-testid="place-ingest-status"
      data-state={state.status}
      role="status"
      aria-live="polite"
      className={`flex flex-wrap items-center gap-2 text-[11px] ${tone}`}
    >
      {state.status === "loading" ? (
        <span className="animate-pulse">Fetching news for {state.place}…</span>
      ) : null}

      {state.status === "success" ? (
        <span>
          Fetched {state.count} event{state.count === 1 ? "" : "s"} for {state.place}
          {sourceSuffix(state.sources)}
        </span>
      ) : null}

      {state.status === "empty" ? (
        <span>
          No recent news found for {state.place}. Try a wider time window or a nearby
          city{sourceSuffix(state.sources)}
        </span>
      ) : null}

      {state.status === "error" ? (
        <>
          <span data-testid="place-ingest-error">
            Could not fetch news for {state.place}: {state.message}
          </span>
          <button
            type="button"
            data-testid="place-ingest-retry"
            onClick={onRetry}
            className="rounded-md px-2 py-0.5 font-semibold uppercase tracking-wide text-[var(--accent)] ring-1 ring-[var(--accent)]/30 hover:bg-[var(--accent)]/10"
          >
            Retry
          </button>
        </>
      ) : null}
    </div>
  );
}
