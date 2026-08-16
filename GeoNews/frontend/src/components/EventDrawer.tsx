"use client";

import type { GeoEvent } from "@/lib/types";
import { EventCard } from "./EventCard";

interface EventDrawerProps {
  events: GeoEvent[];
  selected: GeoEvent | null;
  onSelect: (event: GeoEvent) => void;
  onClose: () => void;
  emptyHint?: string;
  usingFixtures?: boolean;
}

export function EventDrawer({
  events,
  selected,
  onSelect,
  onClose,
  emptyHint,
  usingFixtures = false,
}: EventDrawerProps) {
  return (
    <aside
      data-testid="intel-drawer"
      className="flex h-full min-h-0 w-full flex-col border-l border-[var(--border)] bg-[var(--panel)]/95 backdrop-blur-md"
    >
      <div className="flex items-center justify-between border-b border-[var(--border)] px-3 py-2.5">
        <div>
          <h2 className="font-display text-sm font-semibold text-[var(--text)]">Intel drawer</h2>
          <p className="text-[11px] text-[var(--text-muted)]">
            {events.length} event{events.length === 1 ? "" : "s"}
            {usingFixtures ? " · offline sample" : ""}
          </p>
        </div>
        {selected ? (
          <button
            type="button"
            onClick={onClose}
            className="text-[11px] text-[var(--text-muted)] hover:text-[var(--text)]"
          >
            Clear
          </button>
        ) : null}
      </div>

      {selected ? (
        <div className="border-b border-[var(--border)] bg-[var(--bg)]/40">
          <EventCard event={selected} selected />
        </div>
      ) : null}

      <div className="min-h-0 flex-1 overflow-y-auto">
        {events.length === 0 ? (
          <div className="px-4 py-8 text-center text-sm text-[var(--text-muted)]">
            <p className="font-medium text-[var(--text)]">No events in this view</p>
            <p className="mt-2 text-[12px] leading-relaxed">
              {emptyHint ??
                "Try widening the time window, clearing category filters, or searching another place."}
            </p>
          </div>
        ) : (
          events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              compact
              selected={selected?.id === event.id}
              onSelect={onSelect}
            />
          ))
        )}
      </div>
    </aside>
  );
}
