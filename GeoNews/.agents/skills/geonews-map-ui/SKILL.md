---
name: geonews-map-ui
description: >-
  Guidelines and specifications for GeoNews frontend, Leaflet map integration,
  Carto tile rendering, floating bubble AI analyst UI, and light/dark theme switching.
---

# GeoNews Map & Frontend UI Guidelines

Use this skill when building or styling UI components, adjusting map layers, handling Leaflet interactions, or updating the AI analyst chat interface.

---

## 1. Floating AI Analyst Chat Interface (Issue #21)

### Component Specifications
* **Closed State (FAB)**:
  * Floating action button on bottom-right of the map canvas (offset ~24px from bottom & drawer edge).
  * `data-testid="ai-fab"`, `aria-expanded`, accessible name: `"Open AI analyst"` / `"Close AI analyst"`.
  * Visual indicators: soft pulse while `loading`, unread dot when assistant replies while closed.
* **Open State (Panel)**:
  * Floating card: `min(380px, calc(100vw - 24px))` x `min(560px, 70vh)`.
  * Rounded-2xl, background `var(--panel)` with backdrop blur, border `var(--border)`.
  * Header with title, current focus place name, and close button.
  * Dismissible via Header (X), FAB click, or `Escape`.
* **Transcript & Bubbles**:
  * User messages: `var(--accent)` background.
  * Analyst messages: `var(--panel-2)` background.
  * Auto-scrolling to newest message on send / reply.
  * Typing indicator (three dots) with `aria-live="polite"`.
* **Composer**:
  * `data-testid="ai-input"`, `Enter` to send, `Shift+Enter` for new lines.
  * Send button accessible name `"Send"`.

---

## 2. Leaflet Map & Category Pin Rules

* **Tile Providers**:
  * Dark theme: Carto `dark_all` (`https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png`)
  * Light theme: Carto `light_all` (`https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png`)
* **Category Color Codes**:
  * `crime`: `#f43f5e` (Rose)
  * `conflict`: `#fb7185` (Coral)
  * `disaster`: `#f59e0b` (Amber)
  * `politics`: `#818cf8` (Indigo)
  * `health`: `#34d399` (Emerald)
  * `economy`: `#22d3ee` (Cyan)
  * `other`: `#94a3b8` (Slate)
* **Z-Index Layering**:
  * Map tiles: base
  * Pins/Markers/Clusters: default Leaflet overlay panes
  * FAB / Floating Chat Panel: `z-index: 30-40` (clickable above tiles and pins, but non-blocking to map navigation).

---

## 3. Theme CSS Tokens

Ensure all components consume the root CSS variables in `frontend/src/app/globals.css`:
* `--bg`, `--panel`, `--panel-2`, `--border`, `--text`, `--text-muted`, `--accent`, `--alert`, `--warning`
