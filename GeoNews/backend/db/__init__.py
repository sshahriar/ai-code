"""GeoNews SQLite database package (schema, seed, query helpers)."""

from db.connection import DEFAULT_DB_PATH, connect, get_db_path
from db.init import init_db, seed_if_empty
from db.queries import (
    add_watchlist_place,
    delete_watchlist_place,
    get_event,
    get_watchlist_place,
    list_watchlist,
    query_events_bbox,
    query_incidents_bbox,
    upsert_event,
    upsert_incident,
)

__all__ = [
    "DEFAULT_DB_PATH",
    "add_watchlist_place",
    "connect",
    "delete_watchlist_place",
    "get_db_path",
    "get_event",
    "get_watchlist_place",
    "init_db",
    "list_watchlist",
    "query_events_bbox",
    "query_incidents_bbox",
    "seed_if_empty",
    "upsert_event",
    "upsert_incident",
]
