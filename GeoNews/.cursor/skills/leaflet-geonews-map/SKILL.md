---
name: leaflet-geonews-map
description: Builds the GeoNews Leaflet map on a Next.js static export with clusters, heat layer, flyTo, and category colors. Use when working on frontend map canvas, pins, heatmap, watchlist fly-to, or react-leaflet setup.
---

# Leaflet map for GeoNews

Next.js `output: 'export'` cannot SSR Leaflet. Always dynamic-import the map with `ssr: false`.

## Setup

```bash
npm install leaflet react-leaflet leaflet.markercluster leaflet.heat
npm install -D @types/leaflet
```

Import CSS once in the map module (not in a server file):

```ts
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
```

```tsx
import dynamic from "next/dynamic";

const MapView = dynamic(() => import("@/components/MapView"), { ssr: false });
```

## Basemap (free)

Carto Dark (no key):

```
https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png
```

Attribution: `© OpenStreetMap © CARTO`. Default center: Dhaka `23.8103, 90.4125`, zoom 11.

## Category colors (from plan.md)

| category | color |
|---|---|
| crime | `#f43f5e` |
| conflict | `#fb7185` |
| disaster | `#f59e0b` |
| politics | `#818cf8` |
| health | `#34d399` |
| economy | `#22d3ee` |
| other | `#94a3b8` |

## Layers

- **News pins**: `L.marker` in `L.markerClusterGroup`. Never render 10k raw markers.
- **Incidents**: `leaflet.heat` from `GET /api/incidents/heatmap`.
- Click pin → intel drawer. Selected pin gets a larger halo for `severity >= 4`.
- `map.flyTo([lat, lon], zoom)` on search / watchlist chip.
- `map.fitBounds(bbox)` when Nominatim returns a bbox.
- Reload `GET /api/events` when the map `moveend` bbox changes (debounce 400ms).

## Data

Same-origin only: `/api/events`, `/api/incidents`, `/api/incidents/heatmap`, `/api/hotspots`. Use `EventSource('/api/stream/events')` to refresh pins.

Add `data-testid="geonews-map"` on the map container for Playwright.
