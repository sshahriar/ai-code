"use client";

import dynamic from "next/dynamic";
import type { MapViewProps } from "./MapView";

const MapView = dynamic(() => import("./MapView"), {
  ssr: false,
  loading: () => (
    <div
      data-testid="geonews-map"
      className="flex h-full w-full items-center justify-center bg-[var(--bg)] text-sm text-[var(--text-muted)]"
    >
      Loading map…
    </div>
  ),
});

export function MapCanvas(props: MapViewProps) {
  return <MapView {...props} />;
}
