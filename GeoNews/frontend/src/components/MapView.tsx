"use client";

import { useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.heat";
import { categoryColor } from "@/lib/categories";
import { DHAKA } from "@/lib/fixtures";
import { boundsFromPlaceBBox } from "@/lib/geo";
import type { GeoEvent, HeatPoint, MapBBox, MapFlyTarget } from "@/lib/types";

export interface MapViewProps {
  events: GeoEvent[];
  heatPoints: HeatPoint[];
  heatmap: boolean;
  selectedId: string | null;
  flyTarget: MapFlyTarget | null;
  onBoundsChange: (bbox: MapBBox) => void;
  onSelectEvent: (event: GeoEvent) => void;
}

function pinIcon(category: string, severity: number, selected: boolean): L.DivIcon {
  const color = categoryColor(category);
  const size = selected || severity >= 4 ? 18 : 12;
  const halo =
    severity >= 4 || selected
      ? `box-shadow:0 0 0 6px ${color}33,0 0 14px ${color}aa;`
      : `box-shadow:0 0 8px ${color}88;`;
  return L.divIcon({
    className: "geonews-pin",
    html: `<span style="display:block;width:${size}px;height:${size}px;border-radius:999px;background:${color};border:2px solid #0b1220;${halo}"></span>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

function BoundsWatcher({ onBoundsChange }: { onBoundsChange: (bbox: MapBBox) => void }) {
  const timer = useRef<number | null>(null);

  useMapEvents({
    moveend: (e) => {
      const b = e.target.getBounds();
      if (timer.current) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => {
        onBoundsChange({
          min_lat: b.getSouth(),
          min_lon: b.getWest(),
          max_lat: b.getNorth(),
          max_lon: b.getEast(),
        });
      }, 400);
    },
  });

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  return null;
}

function FlyController({ target }: { target: MapFlyTarget | null }) {
  const map = useMap();
  const lastKey = useRef<string | null>(null);

  useEffect(() => {
    if (!target) return;
    const key = JSON.stringify(target);
    if (key === lastKey.current) return;
    lastKey.current = key;

    const bounds = boundsFromPlaceBBox(target.bbox);
    if (bounds) {
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 13 });
      return;
    }
    map.flyTo([target.lat, target.lon], target.zoom ?? 12, { duration: 0.9 });
  }, [map, target]);

  return null;
}

function ClusterLayer({
  events,
  selectedId,
  onSelectEvent,
}: {
  events: GeoEvent[];
  selectedId: string | null;
  onSelectEvent: (event: GeoEvent) => void;
}) {
  const map = useMap();

  useEffect(() => {
    const group = L.markerClusterGroup({
      showCoverageOnHover: false,
      maxClusterRadius: 50,
      spiderfyOnMaxZoom: true,
    });

    for (const event of events) {
      const marker = L.marker([event.lat, event.lon], {
        icon: pinIcon(event.category, event.severity, selectedId === event.id),
        title: event.title,
      });
      marker.on("click", () => onSelectEvent(event));
      // Playwright helper hook
      (marker as L.Marker & { options: { eventId?: string } }).options.eventId = event.id;
      group.addLayer(marker);
    }

    map.addLayer(group);
    return () => {
      map.removeLayer(group);
      group.clearLayers();
    };
  }, [map, events, selectedId, onSelectEvent]);

  return null;
}

function HeatLayer({
  points,
  enabled,
}: {
  points: HeatPoint[];
  enabled: boolean;
}) {
  const map = useMap();

  useEffect(() => {
    if (!enabled || points.length === 0) return;
    const latlngs = points.map(
      (p) => [p.lat, p.lon, p.weight] as [number, number, number],
    );
    const layer = (L as typeof L & { heatLayer: typeof L.heatLayer }).heatLayer(
      latlngs,
      {
        radius: 28,
        blur: 22,
        maxZoom: 14,
        minOpacity: 0.25,
      },
    );
    map.addLayer(layer);
    return () => {
      map.removeLayer(layer);
    };
  }, [map, points, enabled]);

  return null;
}

export default function MapView({
  events,
  heatPoints,
  heatmap,
  selectedId,
  flyTarget,
  onBoundsChange,
  onSelectEvent,
}: MapViewProps) {
  return (
    <div
      data-testid="geonews-map"
      className="absolute inset-0 z-0 h-full w-full"
    >
      <MapContainer
        center={[DHAKA.lat, DHAKA.lon]}
        zoom={DHAKA.zoom}
        className="h-full w-full"
        zoomControl={false}
        attributionControl
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        <BoundsWatcher onBoundsChange={onBoundsChange} />
        <FlyController target={flyTarget} />
        <ClusterLayer
          events={events}
          selectedId={selectedId}
          onSelectEvent={onSelectEvent}
        />
        <HeatLayer points={heatPoints} enabled={heatmap} />
      </MapContainer>
    </div>
  );
}
