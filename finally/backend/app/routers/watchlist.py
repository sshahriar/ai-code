"""Watchlist API router."""

from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field

from app import database
from app.dependencies import get_db_path_dep, get_market_source, get_price_cache
from app.market.cache import PriceCache
from app.market.interface import MarketDataSource
from app.market.seed_prices import SEED_PRICES

router = APIRouter(prefix="/api/watchlist", tags=["watchlist"])


class WatchlistAddRequest(BaseModel):
    ticker: str = Field(..., min_length=1, description="Ticker symbol to add to watchlist")


@router.get("")
async def get_watchlist(
    price_cache: PriceCache = Depends(get_price_cache),
    db_path=Depends(get_db_path_dep),
):
    """GET /api/watchlist: Return current watchlist tickers with latest market price."""
    items = database.get_watchlist(db_path=db_path)
    result = []

    for item in items:
        ticker = item["ticker"]
        update = price_cache.get(ticker)
        if update:
            price_data = update.to_dict()
        else:
            seed_price = SEED_PRICES.get(ticker, 100.0)
            price_data = {
                "ticker": ticker,
                "price": seed_price,
                "previous_price": seed_price,
                "timestamp": 0.0,
                "change": 0.0,
                "change_percent": 0.0,
                "direction": "flat",
            }

        result.append(
            {
                "ticker": ticker,
                "added_at": item["added_at"],
                "price": price_data["price"],
                "previous_price": price_data["previous_price"],
                "change": price_data["change"],
                "change_percent": price_data["change_percent"],
                "direction": price_data["direction"],
            }
        )

    return result


@router.post("")
async def add_to_watchlist(
    req: WatchlistAddRequest,
    price_cache: PriceCache = Depends(get_price_cache),
    market_source: MarketDataSource | None = Depends(get_market_source),
    db_path=Depends(get_db_path_dep),
):
    """POST /api/watchlist: Add ticker to watchlist."""
    ticker = req.ticker.strip().upper()
    if not ticker:
        raise HTTPException(status_code=400, detail="Ticker symbol cannot be empty")

    item = database.add_watchlist_ticker(ticker, db_path=db_path)

    # Seed price in cache if absent
    if price_cache.get(ticker) is None:
        seed_price = SEED_PRICES.get(ticker, 100.0)
        price_cache.update(ticker, seed_price)

    # Inform active market data source
    if market_source:
        await market_source.add_ticker(ticker)

    update = price_cache.get(ticker)
    price_data = update.to_dict() if update else {
        "price": SEED_PRICES.get(ticker, 100.0),
        "previous_price": SEED_PRICES.get(ticker, 100.0),
        "change": 0.0,
        "change_percent": 0.0,
        "direction": "flat",
    }

    return {
        "ticker": ticker,
        "added_at": item["added_at"],
        "price": price_data["price"],
        "previous_price": price_data.get("previous_price", price_data["price"]),
        "change": price_data.get("change", 0.0),
        "change_percent": price_data.get("change_percent", 0.0),
        "direction": price_data.get("direction", "flat"),
    }


@router.delete("/{ticker}")
async def remove_from_watchlist(
    ticker: str,
    price_cache: PriceCache = Depends(get_price_cache),
    market_source: MarketDataSource | None = Depends(get_market_source),
    db_path=Depends(get_db_path_dep),
):
    """DELETE /api/watchlist/{ticker}: Remove ticker from watchlist."""
    ticker = ticker.strip().upper()
    removed = database.remove_watchlist_ticker(ticker, db_path=db_path)
    if not removed:
        raise HTTPException(status_code=404, detail=f"Ticker '{ticker}' not found in watchlist")

    price_cache.remove(ticker)
    if market_source:
        await market_source.remove_ticker(ticker)

    return {"success": True, "ticker": ticker}
