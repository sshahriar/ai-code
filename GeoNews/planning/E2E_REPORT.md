# GeoNews E2E Report

**Role:** Integration Tester  
**Skill:** `.cursor/skills/playwright-geonews/SKILL.md` (plan.md §17)

## Latest retest (fix loop)

**Date:** 2026-08-16 (retest after BUG-E2E-001 / BUG-E2E-002)  
**Rebuild:** `docker compose up -d --build` — **success**; `/api/health` ok with `llm: mock`  
**Command:**

```powershell
cd c:\Users\Pavilion\Documents\ai_coder\claude_code\GeoNews
docker compose up -d --build
# wait until /api/health ok
cd test
npm test
```

### Suite result

| # | Scenario | Result |
|---|----------|--------|
| 1 | Fresh start: map, Dhaka default, sample events | **PASS** |
| 2 | Search London → map/view refresh; events or empty-state | **PASS** |
| 3 | Filter crime hides non-crime | **PASS** |
| 4 | Open event → drawer title + source badge | **PASS** |
| 5 | Watchlist add → reload → chip remains | **PASS** |
| 6 | AI mock “Brief this place” → brief + caveats | **PASS** |
| 7 | `GET /api/health` → `ok` | **PASS** |
| 8 | Heatmap toggle does not crash | **PASS** |

**Counts:** **8 passed / 0 failed** (≈9–11s), Chromium, `baseURL: http://localhost:8000`

### Spot-checks (post-fix)

- **London search:** scenario 2 PASS; UI after select showed **4 event cards** (not stuck on Dhaka-only sample) and hotspot chips with labels (e.g. `Camden, London×1`). No bare `×N` chips.
- **Hotspot labels (BUG-E2E-002):** API + UI labels non-empty after London focus.
- **bbox fly (BUG-E2E-001):** rebuilt image includes `frontend/src/lib/geo.ts` `boundsFromPlaceBBox`; London no longer lands on blank-ocean wrong geography in spot-check.

### Test-only tweak this retest

- Watchlist scenario clears leftover `Hobart` via API before POST (shared volume isolation). No product code changes.

### Stack status after retest

**Left running:** yes — `geonews` (`geonews:local`) healthy on `:8000`. Volume not removed.

---

## Prior baseline (first Integration Tester run)

**Date:** 2026-08-16  
**Target:** already-running mock stack (pre-fix-loop image)  
**Suite:** 8 passed  
**Bugs filed:** BUG-E2E-001 (bbox order), BUG-E2E-002 (empty hotspot names) — see `planning/E2E_BUGS.md`

## Artifacts

| Path | Purpose |
|------|---------|
| `test/e2e/geonews.spec.ts` | Eight §17 scenarios |
| `test/playwright.config.ts` | Playwright config |
| `test/docker-compose.test.yml` | Mock-forced compose for CI/isolated runs |
| `test/README.md` | How to run against compose or live stack |
| `planning/E2E_BUGS.md` | Bug status (verified-fixed) |
