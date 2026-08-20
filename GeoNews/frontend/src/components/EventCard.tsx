"use client";

import { categoryColor } from "@/lib/categories";
import type { GeoEvent } from "@/lib/types";
import { SourceBadge } from "./SourceBadge";

interface EventCardProps {
  event: GeoEvent;
  selected?: boolean;
  onSelect?: (event: GeoEvent) => void;
  compact?: boolean;
}

export function EventCard({
  event,
  selected = false,
  onSelect,
  compact = false,
}: EventCardProps) {
  const color = categoryColor(event.category);
  const when = new Date(event.occurred_at).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <article
      data-testid="event-card"
      data-event-id={event.id}
      data-category={event.category}
      role={onSelect ? "button" : undefined}
      tabIndex={onSelect ? 0 : undefined}
      onClick={() => onSelect?.(event)}
      onKeyDown={(e) => {
        if (!onSelect) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(event);
        }
      }}
      className={[
        "w-full text-left transition-colors",
        "border-b border-[var(--border)]/80 px-3 py-3",
        selected
          ? "bg-[var(--panel-2)]"
          : "hover:bg-[var(--panel-2)]/60",
        onSelect ? "cursor-pointer" : "",
      ].join(" ")}
    >
      <div className="flex items-start gap-2.5">
        <span
          aria-hidden
          className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full"
          style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}66` }}
        />
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex flex-wrap items-center gap-2">
            <SourceBadge source={event.source} sourceName={event.source_name} />
            <span className="text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
              {event.category}
            </span>
            <span className="text-[10px] text-[var(--text-muted)]">sev {event.severity}</span>
          </div>
          <h3 className="font-display text-[15px] font-semibold leading-snug text-[var(--text)]">
            {event.url ? (
              <a
                data-testid="event-link"
                href={event.url}
                target="_blank"
                rel="noreferrer"
                title="Open the original article"
                className="decoration-[var(--accent)]/50 underline-offset-2 hover:text-[var(--accent)] hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                {event.title}
              </a>
            ) : (
              event.title
            )}
          </h3>
          {!compact ? (
            <p className="mt-1 line-clamp-3 text-[13px] leading-relaxed text-[var(--text-muted)]">
              {event.summary}
            </p>
          ) : null}
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-[var(--text-muted)]">
            <span>{event.place_name}</span>
            <span>{when}</span>
            {event.url ? (
              <a
                href={event.url}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-[var(--accent)] hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                Read full article ↗
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
