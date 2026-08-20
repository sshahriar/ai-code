"use client";

import { useCallback, useRef, useState } from "react";
import { describeApiError, postIngestPlace } from "./api";
import type { GeoEvent, IngestSourceEntry } from "./types";

export interface PlaceIngestTarget {
  name: string;
  lat: number;
  lon: number;
  country_code?: string;
}

export type PlaceIngestState =
  | { status: "idle" }
  | { status: "loading"; place: string }
  | {
      status: "success";
      place: string;
      count: number;
      rows_upserted: number;
      sources: string[];
    }
  | { status: "empty"; place: string; sources: string[] }
  | { status: "error"; place: string; message: string };

export function sourceLabels(entries: IngestSourceEntry[]): string[] {
  const names = entries
    .map((entry) => (typeof entry === "string" ? entry : entry?.source))
    .filter((name): name is string => typeof name === "string" && name.length > 0);
  return Array.from(new Set(names));
}

interface UsePlaceIngestOptions {
  /** Called with the ingest response events so the map can swap to the new place. */
  onEvents: (events: GeoEvent[]) => void;
  /** Called instead when the response omitted events, to refetch the bbox. */
  onReload: () => void;
}

/**
 * Runs scoped ingest for a selected place. Only the most recent request may
 * write state, so quickly picking another place cannot be clobbered by a
 * slower earlier response.
 */
export function usePlaceIngest({ onEvents, onReload }: UsePlaceIngestOptions) {
  const [state, setState] = useState<PlaceIngestState>({ status: "idle" });
  const sequence = useRef(0);
  const lastTarget = useRef<PlaceIngestTarget | null>(null);

  const start = useCallback(
    async (target: PlaceIngestTarget) => {
      lastTarget.current = target;
      const token = (sequence.current += 1);
      setState({ status: "loading", place: target.name });

      try {
        const result = await postIngestPlace(target);
        if (token !== sequence.current) return;

        if (result.events) {
          onEvents(result.events);
        } else {
          onReload();
        }

        const count = result.events ? result.events.length : result.rows_upserted;
        const sources = sourceLabels(result.sources);
        setState(
          count === 0 && result.rows_upserted === 0
            ? { status: "empty", place: target.name, sources }
            : {
                status: "success",
                place: target.name,
                count,
                rows_upserted: result.rows_upserted,
                sources,
              },
        );
      } catch (err) {
        if (token !== sequence.current) return;
        setState({
          status: "error",
          place: target.name,
          message: describeApiError(err, "Scoped ingest failed."),
        });
      }
    },
    [onEvents, onReload],
  );

  const retry = useCallback(() => {
    if (lastTarget.current) void start(lastTarget.current);
  }, [start]);

  return { state, start, retry };
}
