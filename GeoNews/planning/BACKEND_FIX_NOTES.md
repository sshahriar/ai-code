# Backend Fix Notes

## BUG-E2E-002 — Hotspot chips empty names (2026-08-16)

**Owner:** Backend API Engineer  
**File:** `backend/routes/hotspots.py`

### Cause
Hotspot aggregation copied `place_name` from events as-is. Sparse ingest rows (empty / whitespace / null) produced clusters with `place_name: null`. The frontend Hotspot type reads `name`, so chips rendered as `×N` with no label.

### Fix
- Prefer first non-blank event `place_name` in the cluster.
- Always emit both `name` and `place_name` with a guaranteed non-empty label:
  1. cleaned `place_name`, else
  2. formatted coords (`"51.51, -0.13"`), else
  3. `"Unknown place"`.
- Response shape remains compatible (`lat`, `lon`, `count`, `avg_severity`, `score`, `place_name`); `name` added for frontend chips.

### Sample response item
```json
{
  "lat": 51.51,
  "lon": -0.13,
  "name": "51.51, -0.13",
  "place_name": "51.51, -0.13",
  "count": 2,
  "avg_severity": 2.5,
  "score": 5.0
}
```
