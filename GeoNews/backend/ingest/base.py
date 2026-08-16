"""Ingest adapter interface and shared helpers."""

from __future__ import annotations

from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from datetime import datetime, timezone
from typing import Any, Iterable


def utc_now() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")


@dataclass
class AdapterBatch:
    """Normalized rows produced by one adapter fetch."""

    events: list[dict[str, Any]] = field(default_factory=list)
    incidents: list[dict[str, Any]] = field(default_factory=list)


class BaseAdapter(ABC):
    """One source → normalized events and/or incidents."""

    source: str

    @abstractmethod
    def fetch(self) -> AdapterBatch:
        """Fetch and normalize. Must not raise for empty results; may raise on hard failures."""


def ensure_event_defaults(row: dict[str, Any]) -> dict[str, Any]:
    out = dict(row)
    now = utc_now()
    out.setdefault("ingested_at", now)
    out.setdefault("occurred_at", now)
    out.setdefault("category", "other")
    out.setdefault("severity", 2)
    return out


def ensure_incident_defaults(row: dict[str, Any]) -> dict[str, Any]:
    out = dict(row)
    out.setdefault("occurred_at", utc_now())
    out.setdefault("category", "other")
    return out


def merge_batches(batches: Iterable[AdapterBatch]) -> AdapterBatch:
    merged = AdapterBatch()
    for batch in batches:
        merged.events.extend(batch.events)
        merged.incidents.extend(batch.incidents)
    return merged
