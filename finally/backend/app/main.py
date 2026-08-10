"""Main FastAPI application for FinAlly backend."""

from __future__ import annotations

import asyncio
import logging
from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse

from app import database
from app.market import PriceCache, create_market_data_source
from app.market.seed_prices import SEED_PRICES
from app.market.stream import create_stream_router
from app.routers import health, portfolio, watchlist

logger = logging.getLogger(__name__)


async def _snapshot_loop(app: FastAPI, interval: float = 30.0) -> None:
    """Background task recording portfolio total value snapshot every `interval` seconds."""
    while True:
        try:
            await asyncio.sleep(interval)
            db_path = getattr(app.state, "db_path", None)
            price_cache: PriceCache = app.state.price_cache
            profile = database.get_user_profile(db_path=db_path)
            cash = profile["cash_balance"]
            positions = database.get_positions(db_path=db_path)
            pos_val = sum(
                p["quantity"] * (price_cache.get_price(p["ticker"]) or p["avg_cost"])
                for p in positions
            )
            total_value = round(cash + pos_val, 2)
            database.record_portfolio_snapshot(total_value, db_path=db_path)
        except asyncio.CancelledError:
            break
        except Exception as e:
            logger.error("Error in portfolio snapshot task: %s", e)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifespan context manager to handle app startup and shutdown tasks."""
    if not hasattr(app.state, "price_cache") or app.state.price_cache is None:
        app.state.price_cache = PriceCache()
    if not hasattr(app.state, "db_path"):
        app.state.db_path = None

    db_path = app.state.db_path

    # 1. Initialize database (create tables & seed default profile + watchlist)
    database.init_db(db_path=db_path)

    # 2. Fetch watchlist tickers from DB
    watchlist_items = database.get_watchlist(db_path=db_path)
    tickers = [item["ticker"] for item in watchlist_items]
    if not tickers:
        tickers = list(SEED_PRICES.keys())

    # Seed initial prices into PriceCache
    for t in tickers:
        if app.state.price_cache.get(t) is None:
            app.state.price_cache.update(t, SEED_PRICES.get(t, 100.0))

    # 3. Create & start market data source background task
    market_source = create_market_data_source(app.state.price_cache)
    app.state.market_source = market_source
    await market_source.start(tickers)

    # 4. Start 30-second portfolio snapshot recorder task
    snapshot_task = asyncio.create_task(_snapshot_loop(app, interval=30.0))

    yield

    # Shutdown logic
    snapshot_task.cancel()
    try:
        await snapshot_task
    except asyncio.CancelledError:
        pass

    if getattr(app.state, "market_source", None):
        await app.state.market_source.stop()


def create_app(db_path: Path | str | None = None) -> FastAPI:
    """Factory function to build the FastAPI application instance."""
    app = FastAPI(
        title="FinAlly Trading Workstation API",
        version="0.1.0",
        lifespan=lifespan,
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.state.price_cache = PriceCache()
    app.state.db_path = db_path

    # Include routers
    app.include_router(health.router)
    app.include_router(portfolio.router)
    app.include_router(watchlist.router)

    try:
        from app.routers import chat
        app.include_router(chat.router)
    except (ImportError, AttributeError):
        pass

    # Include SSE stream router using factory
    stream_router = create_stream_router(app.state.price_cache)
    app.include_router(stream_router)

    # Mount static files with SPA fallback logic
    _mount_static_files(app)

    return app


def _mount_static_files(app: FastAPI) -> None:
    """Mount static files from frontend/out or backend/app/static with SPA fallback to index.html."""
    app_dir = Path(__file__).resolve().parent
    backend_dir = app_dir.parent
    root_dir = backend_dir.parent

    candidates = [
        root_dir / "frontend" / "out",
        backend_dir / "frontend" / "out",
        backend_dir / "app" / "static",
        backend_dir / "static",
        app_dir / "static",
        Path.cwd() / "frontend" / "out",
        Path.cwd() / "static",
    ]

    static_dir: Path | None = None
    for candidate in candidates:
        if candidate.exists() and candidate.is_dir() and (candidate / "index.html").exists():
            static_dir = candidate
            break

    if static_dir is None:
        for candidate in candidates:
            if candidate.exists() and candidate.is_dir():
                static_dir = candidate
                break

    if static_dir is None:
        logger.warning("No static files directory found for SPA mounting.")
        return

    logger.info("Mounting static files from: %s", static_dir)
    index_html = static_dir / "index.html"

    @app.get("/{full_path:path}", include_in_schema=False)
    async def serve_spa(full_path: str):
        if full_path.startswith("api/"):
            return Response(status_code=404)
        file_path = static_dir / full_path
        if full_path and file_path.exists() and file_path.is_file():
            return FileResponse(file_path)
        if index_html.exists():
            return FileResponse(index_html)
        return Response(status_code=404)


app = create_app()
