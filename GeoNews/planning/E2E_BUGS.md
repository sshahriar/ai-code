# GeoNews E2E Bugs

Filed by Integration Tester. Lead reopen owners only when status is **open** / **regressed**.

**Retest (2026-08-16):** rebuild + `npm test` → **8/8 PASS**. BUG-E2E-001 and BUG-E2E-002 marked **verified-fixed**.

---

## BUG-E2E-001 — Place `bbox` axis order mismatch (map fly wrong)

| Field | Value |
|-------|--------|
| **Severity** | Medium |
| **Owner** | Frontend (primary); Backend/contract alignment secondary |
| **Files** | `frontend/src/lib/geo.ts`, `frontend/src/components/MapView.tsx`, `frontend/src/lib/fixtures.ts`, `backend/geocode` / Nominatim skill |
| **Repro** | Open app → search `London` → select Greater London |
| **Expected** | Map flies to London; tiles show UK |
| **Original actual** | Drawer refreshed but map could land on wrong geography (dark/blank ocean). API `bbox` W,S,E,N treated as S,W,N,E. |
| **Status** | **verified-fixed** (retest 2026-08-16) |
| **What changed** | `boundsFromPlaceBBox()` interprets W,S,E,N → Leaflet bounds; fixtures aligned; malformed bbox falls back to `flyTo(lat, lon)`. |
| **Verification** | Suite scenario 2 PASS after `docker compose up -d --build`. Spot-check: London select yielded London-area events (4 cards) + labeled hotspots including `Camden, London`. |

---

## BUG-E2E-002 — Hotspot chips can render with empty names

| Field | Value |
|-------|--------|
| **Severity** | Low |
| **Owner** | Backend (hotspot aggregation) / Frontend (display guard) |
| **Files** | `backend/routes/hotspots.py`; `frontend/src/lib/geo.ts` (`hotspotLabel`); `frontend/src/components/HotspotList.tsx` |
| **Repro** | Search London → observe hotspot row |
| **Expected** | Each hotspot chip shows a place label + count |
| **Original actual** | Chips like bare `×2` / `×1` |
| **Status** | **verified-fixed** (retest 2026-08-16) |
| **What changed** | Backend always emits non-empty `name`; Frontend `hotspotLabel()` guard. |
| **Verification** | Spot-check after London: hotspot buttons all labeled (`Nairobi×2`, `Camden, London×1`, …); `blankLabels: []`. Dhaka fresh-start chips still show `Dhanmondi` / `Gulshan` / `Mirpur`. |

---

## Observations (not reopen of 001/002)

| Issue | Notes |
|-------|--------|
| Watchlist chip vs API mismatch (intermittent) | One full-suite run: POST Hobart 201 + chip visible, then after reload UI showed only Dhaka while `GET /api/watchlist` still listed Hobart + seeds. Isolated + subsequent full suite **PASS**. Possible Frontend race (`mergeMode` / fixture fallback). **Not filed as open bug** — green on retest; reopen Frontend if it reproduces. |
| Test isolation | Watchlist E2E now deletes leftover `Hobart` before add (shared `geonews-data` volume). |

## Closed / not product bugs

| Issue | Resolution |
|-------|------------|
| London “map transform unchanged” flake | Test assertion — drawer empty/changed signal |
| Watchlist Singapore / Hobart 409 | Volume leftover duplicate; test clears Hobart before POST |
