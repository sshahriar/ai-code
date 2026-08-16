"use client";

import { hotspotLabel } from "@/lib/geo";
import type { Hotspot } from "@/lib/types";

interface HotspotListProps {
  hotspots: Hotspot[];
  onSelect: (hotspot: Hotspot) => void;
}

export function HotspotList({ hotspots, onSelect }: HotspotListProps) {
  if (hotspots.length === 0) {
    return (
      <p className="px-1 text-[11px] text-[var(--text-muted)]">No hotspots in this window.</p>
    );
  }

  return (
    <ul data-testid="hotspot-list" className="flex flex-wrap gap-1.5">
      {hotspots.slice(0, 5).map((h) => {
        const label = hotspotLabel(h);
        return (
          <li key={h.id ?? `${label}-${h.lat}-${h.lon}`}>
            <button
              type="button"
              onClick={() => onSelect(h)}
              className="rounded-md bg-[var(--panel)] px-2 py-1 text-[11px] text-[var(--text)] ring-1 ring-[var(--border)] hover:text-[var(--accent)]"
            >
              {label}
              <span className="ml-1 text-[var(--text-muted)]">×{h.count}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
