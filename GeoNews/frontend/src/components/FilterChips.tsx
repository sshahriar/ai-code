"use client";

import { CATEGORIES, TIME_WINDOWS, categoryColor } from "@/lib/categories";
import type { EventCategory, TimeWindow } from "@/lib/types";

interface FilterChipsProps {
  category: EventCategory | null;
  window: TimeWindow;
  heatmap: boolean;
  onCategory: (category: EventCategory | null) => void;
  onWindow: (window: TimeWindow) => void;
  onHeatmap: (on: boolean) => void;
}

export function FilterChips({
  category,
  window,
  heatmap,
  onCategory,
  onWindow,
  onHeatmap,
}: FilterChipsProps) {
  return (
    <div
      data-testid="filter-bar"
      className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3"
    >
      <div className="flex flex-wrap gap-1.5" role="group" aria-label="Category filters">
        <button
          type="button"
          data-testid="filter-all"
          onClick={() => onCategory(null)}
          className={[
            "rounded-md px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide transition",
            category === null
              ? "bg-[var(--accent)] text-[var(--bg)]"
              : "bg-[var(--panel)] text-[var(--text-muted)] ring-1 ring-[var(--border)] hover:text-[var(--text)]",
          ].join(" ")}
        >
          All
        </button>
        {CATEGORIES.map((cat) => {
          const active = category === cat;
          const color = categoryColor(cat);
          return (
            <button
              key={cat}
              type="button"
              data-testid={`filter-${cat}`}
              onClick={() => onCategory(active ? null : cat)}
              className={[
                "rounded-md px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide transition",
                active
                  ? "text-[var(--bg)]"
                  : "bg-[var(--panel)] text-[var(--text-muted)] ring-1 ring-[var(--border)] hover:text-[var(--text)]",
              ].join(" ")}
              style={active ? { backgroundColor: color } : undefined}
            >
              {cat}
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        <div className="flex rounded-md ring-1 ring-[var(--border)]" role="group" aria-label="Time window">
          {TIME_WINDOWS.map((w) => (
            <button
              key={w.id}
              type="button"
              data-testid={`window-${w.id}`}
              onClick={() => onWindow(w.id)}
              className={[
                "px-2.5 py-1 text-[11px] font-semibold transition",
                window === w.id
                  ? "bg-[var(--panel-2)] text-[var(--accent)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text)]",
              ].join(" ")}
            >
              {w.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          data-testid="layer-heatmap"
          aria-pressed={heatmap}
          onClick={() => onHeatmap(!heatmap)}
          className={[
            "rounded-md px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ring-1 transition",
            heatmap
              ? "bg-[var(--alert)]/20 text-[var(--alert)] ring-[var(--alert)]/40"
              : "bg-[var(--panel)] text-[var(--text-muted)] ring-[var(--border)] hover:text-[var(--text)]",
          ].join(" ")}
        >
          Heatmap
        </button>
      </div>
    </div>
  );
}
