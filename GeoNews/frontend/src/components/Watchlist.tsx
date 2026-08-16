"use client";

import type { WatchPlace } from "@/lib/types";

interface WatchlistProps {
  places: WatchPlace[];
  onFly: (place: WatchPlace) => void;
  onRemove: (id: string) => void;
  onAddCurrent: () => void;
  busy?: boolean;
}

export function Watchlist({
  places,
  onFly,
  onRemove,
  onAddCurrent,
  busy = false,
}: WatchlistProps) {
  return (
    <div data-testid="watchlist" className="flex flex-wrap items-center gap-1.5">
      <span className="mr-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
        Watch
      </span>
      {places.length === 0 ? (
        <span className="text-[12px] text-[var(--text-muted)]">No saved places yet</span>
      ) : (
        places.map((place) => (
          <span
            key={place.id}
            className="inline-flex items-center gap-1 rounded-md bg-[var(--panel)] ring-1 ring-[var(--border)]"
          >
            <button
              type="button"
              data-testid={`watchlist-chip-${place.id}`}
              onClick={() => onFly(place)}
              className="px-2 py-1 text-[12px] text-[var(--text)] hover:text-[var(--accent)]"
            >
              {place.name}
            </button>
            <button
              type="button"
              aria-label={`Remove ${place.name}`}
              onClick={() => onRemove(place.id)}
              className="pr-2 text-[11px] text-[var(--text-muted)] hover:text-[var(--alert)]"
            >
              ×
            </button>
          </span>
        ))
      )}
      <button
        type="button"
        data-testid="watchlist-add"
        disabled={busy}
        onClick={onAddCurrent}
        className="rounded-md bg-[var(--accent)]/15 px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-[var(--accent)] ring-1 ring-[var(--accent)]/30 hover:bg-[var(--accent)]/25 disabled:opacity-50"
      >
        Add place
      </button>
    </div>
  );
}
