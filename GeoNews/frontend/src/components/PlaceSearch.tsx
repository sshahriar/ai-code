"use client";

import { useEffect, useId, useState } from "react";
import { searchPlaces } from "@/lib/api";
import type { PlaceResult } from "@/lib/types";

interface PlaceSearchProps {
  onSelect: (place: PlaceResult) => void;
}

export function PlaceSearch({ onSelect }: PlaceSearchProps) {
  const listId = useId();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PlaceResult[]>([]);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }
    let cancelled = false;
    const t = window.setTimeout(async () => {
      setBusy(true);
      try {
        const { data } = await searchPlaces(query);
        if (!cancelled) {
          setResults(data.slice(0, 6));
          setOpen(true);
        }
      } finally {
        if (!cancelled) setBusy(false);
      }
    }, 280);
    return () => {
      cancelled = true;
      window.clearTimeout(t);
    };
  }, [query]);

  return (
    <div className="relative min-w-0 flex-1">
      <label className="sr-only" htmlFor="place-search">
        Search place
      </label>
      <input
        id="place-search"
        data-testid="place-search"
        type="search"
        role="combobox"
        value={query}
        placeholder="Search a place…"
        autoComplete="off"
        aria-controls={listId}
        aria-expanded={open && results.length > 0}
        aria-autocomplete="list"
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => results.length > 0 && setOpen(true)}
        onBlur={() => window.setTimeout(() => setOpen(false), 150)}
        className="w-full rounded-lg border border-[var(--border)] bg-[var(--panel)]/90 px-3 py-2 text-sm text-[var(--text)] outline-none backdrop-blur placeholder:text-[var(--text-muted)] focus:border-[var(--accent)]/60"
      />
      {busy ? (
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
          …
        </span>
      ) : null}
      {open && results.length > 0 ? (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-30 mt-1 max-h-56 w-full overflow-auto rounded-lg border border-[var(--border)] bg-[var(--panel)] shadow-xl"
        >
          {results.map((place) => (
            <li key={`${place.name}-${place.lat}-${place.lon}`}>
              <button
                type="button"
                role="option"
                aria-selected={false}
                className="w-full px-3 py-2 text-left text-sm text-[var(--text)] hover:bg-[var(--panel-2)]"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  onSelect(place);
                  setQuery(place.name);
                  setOpen(false);
                }}
              >
                {place.name}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
