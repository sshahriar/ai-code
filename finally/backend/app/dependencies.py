"""FastAPI dependencies for price cache, market data source, and database path."""

from __future__ import annotations

from pathlib import Path
from typing import TYPE_CHECKING

from fastapi import Request

if TYPE_CHECKING:
    from app.market.cache import PriceCache
    from app.market.interface import MarketDataSource


def get_price_cache(request: Request) -> PriceCache:
    """Retrieve PriceCache from FastAPI app state."""
    return request.app.state.price_cache


def get_market_source(request: Request) -> MarketDataSource | None:
    """Retrieve MarketDataSource from FastAPI app state."""
    return getattr(request.app.state, "market_source", None)


def get_db_path_dep(request: Request) -> Path | str | None:
    """Retrieve db_path from FastAPI app state."""
    return getattr(request.app.state, "db_path", None)
