"""Print a few events from a running GeoNews API, to confirm real article links.

Usage (backend must be running):
    .venv/Scripts/python.exe scripts/check_api_events.py http://127.0.0.1:8000
    .venv/Scripts/python.exe scripts/check_api_events.py http://127.0.0.1:3000 london
"""

from __future__ import annotations

import sys

import httpx

BBOXES = {
    "dhaka": {"min_lat": 23.6, "min_lon": 90.2, "max_lat": 24.0, "max_lon": 90.6},
    "london": {"min_lat": 51.2, "min_lon": -0.6, "max_lat": 51.8, "max_lon": 0.3},
    "world": {"min_lat": -90.0, "min_lon": -180.0, "max_lat": 90.0, "max_lon": 180.0},
}

args = [a for a in sys.argv[1:] if not a.startswith("--")]
BASE = args[0] if args else "http://127.0.0.1:8000"
BBOX = BBOXES[args[1].lower()] if len(args) > 1 else BBOXES["dhaka"]


def safe(text: object, width: int = 90) -> str:
    return str(text)[:width].encode("ascii", "replace").decode("ascii")


def main() -> int:
    with httpx.Client(timeout=60.0) as client:
        print("health:", safe(client.get(f"{BASE}/api/health").json(), 200))
        if "--ingest" in sys.argv:
            run = client.post(f"{BASE}/api/ingest/run")
            print("ingest:", run.status_code, safe(run.text, 160))
        resp = client.get(f"{BASE}/api/events", params={**BBOX, "limit": 8})
        print("events status:", resp.status_code)
        data = resp.json()
    events = data.get("events") if isinstance(data, dict) else data
    for event in events or []:
        print(f"- [{event.get('source')}] {safe(event.get('title'), 70)}")
        print(f"  {safe(event.get('url'), 110)}")
    print("count:", len(events or []))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
