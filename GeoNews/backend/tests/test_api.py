"""Health + basic API smoke tests."""

from __future__ import annotations

from fastapi.testclient import TestClient


def test_health_ok(client: TestClient) -> None:
    resp = client.get("/api/health")
    assert resp.status_code == 200
    body = resp.json()
    assert body["ok"] is True
    assert "sources" in body
    for key in ("gdelt", "nominatim", "llm", "police_uk"):
        assert key in body["sources"]
    assert body["sources"]["llm"] == "mock"


def test_events_bbox_dhaka(client: TestClient) -> None:
    resp = client.get(
        "/api/events",
        params={
            "min_lat": 23.6,
            "min_lon": 90.2,
            "max_lat": 24.0,
            "max_lon": 90.6,
            "limit": 50,
        },
    )
    assert resp.status_code == 200
    events = resp.json()["events"]
    assert len(events) >= 1
    sample = events[0]
    for field in ("id", "source", "title", "category", "lat", "lon", "occurred_at"):
        assert field in sample


def test_event_not_found(client: TestClient) -> None:
    resp = client.get("/api/events/does-not-exist")
    assert resp.status_code == 404
    body = resp.json()
    assert body["error"]["code"] == "not_found"


def test_watchlist_roundtrip(client: TestClient) -> None:
    listed = client.get("/api/watchlist")
    assert listed.status_code == 200
    assert "places" in listed.json()

    created = client.post(
        "/api/watchlist",
        json={"name": "Testville", "lat": 1.0, "lon": 2.0, "radius_km": 10},
    )
    assert created.status_code == 201
    place_id = created.json()["id"]

    deleted = client.delete(f"/api/watchlist/{place_id}")
    assert deleted.status_code == 200
    assert deleted.json()["ok"] is True


def test_incidents_and_heatmap(client: TestClient) -> None:
    params = {
        "min_lat": 23.6,
        "min_lon": 90.2,
        "max_lat": 24.0,
        "max_lon": 90.6,
    }
    resp = client.get("/api/incidents", params={**params, "source": "sample"})
    assert resp.status_code == 200
    assert len(resp.json()["incidents"]) >= 1

    heat = client.get("/api/incidents/heatmap", params=params)
    assert heat.status_code == 200
    assert "points" in heat.json()


def test_hotspots(client: TestClient) -> None:
    resp = client.get(
        "/api/hotspots",
        params={
            "min_lat": 23.6,
            "min_lon": 90.2,
            "max_lat": 24.0,
            "max_lon": 90.6,
            "window": "7d",
        },
    )
    assert resp.status_code == 200
    body = resp.json()
    assert "hotspots" in body
    for h in body["hotspots"]:
        assert isinstance(h.get("name"), str) and h["name"].strip()
        assert h.get("place_name") == h["name"]


def test_hotspots_name_fallback_when_place_blank(client: TestClient, db_path) -> None:
    """BUG-E2E-002: sparse/blank place_name must still yield a non-empty name."""
    from datetime import datetime, timezone

    from db import connect, upsert_event

    now = datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")
    # Isolated coords so seed Dhaka/London rows do not share the cluster.
    lat, lon = -45.1234, 170.4567
    conn = connect(db_path)
    try:
        upsert_event(
            conn,
            {
                "source": "sample",
                "external_id": "blank-place-isolated-1",
                "title": "Sparse place event",
                "category": "other",
                "severity": 2,
                "lat": lat,
                "lon": lon,
                "place_name": "",
                "occurred_at": now,
            },
        )
        upsert_event(
            conn,
            {
                "source": "sample",
                "external_id": "blank-place-isolated-2",
                "title": "Whitespace place event",
                "category": "other",
                "severity": 3,
                "lat": lat + 0.001,
                "lon": lon + 0.001,
                "place_name": "   ",
                "occurred_at": now,
            },
        )
        conn.commit()
    finally:
        conn.close()

    resp = client.get(
        "/api/hotspots",
        params={
            "min_lat": -45.2,
            "min_lon": 170.3,
            "max_lat": -45.0,
            "max_lon": 170.6,
            "window": "7d",
            "limit": 20,
        },
    )
    assert resp.status_code == 200
    hotspots = resp.json()["hotspots"]
    assert len(hotspots) >= 1
    for h in hotspots:
        name = h.get("name")
        assert isinstance(name, str) and name.strip(), h
        assert h.get("place_name") == name
        # Blank input → coord label like "-45.12, 170.46"
        assert name == f"{h['lat']:.2f}, {h['lon']:.2f}"


def test_brief_and_chat_mock(client: TestClient) -> None:
    brief = client.get("/api/brief", params={"lat": 23.81, "lon": 90.41})
    assert brief.status_code == 200
    body = brief.json()
    assert body.get("mock") is True
    assert body.get("place_name") == "Dhaka"
    assert body.get("risk_level") in ("low", "moderate", "high", "unknown")
    assert isinstance(body.get("caveats"), list)

    chat = client.post("/api/chat", json={"message": "What is happening in Dhaka?"})
    assert chat.status_code == 200
    chat_body = chat.json()
    assert chat_body.get("mock") is True
    assert "message" in chat_body
    assert chat_body.get("brief", {}).get("place_name") == "Dhaka"
