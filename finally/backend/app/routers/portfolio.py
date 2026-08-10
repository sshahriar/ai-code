"""Portfolio API router."""

from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field

from app import database
from app.dependencies import get_db_path_dep, get_price_cache
from app.market.cache import PriceCache
from app.market.seed_prices import SEED_PRICES

router = APIRouter(prefix="/api/portfolio", tags=["portfolio"])


class TradeRequest(BaseModel):
    ticker: str = Field(..., min_length=1, description="Ticker symbol")
    quantity: float = Field(..., gt=0, description="Trade quantity (must be > 0)")
    side: str = Field(..., pattern="^(buy|sell)$", description="Trade side: 'buy' or 'sell'")


@router.get("")
async def get_portfolio(
    price_cache: PriceCache = Depends(get_price_cache),
    db_path=Depends(get_db_path_dep),
):
    """GET /api/portfolio: Return cash balance, positions, total portfolio value, and unrealized P&L."""
    profile = database.get_user_profile(db_path=db_path)
    cash_balance = profile["cash_balance"]
    db_positions = database.get_positions(db_path=db_path)

    positions = []
    total_positions_val = 0.0
    total_unrealized_pnl = 0.0

    for pos in db_positions:
        ticker = pos["ticker"]
        qty = pos["quantity"]
        avg_cost = pos["avg_cost"]

        cur_price = price_cache.get_price(ticker)
        if cur_price is None:
            cur_price = avg_cost

        current_value = qty * cur_price
        cost_basis = qty * avg_cost
        unrealized_pnl = current_value - cost_basis
        unrealized_pnl_pct = (
            (unrealized_pnl / cost_basis * 100.0) if cost_basis > 0 else 0.0
        )

        total_positions_val += current_value
        total_unrealized_pnl += unrealized_pnl

        positions.append(
            {
                "ticker": ticker,
                "quantity": qty,
                "avg_cost": round(avg_cost, 2),
                "current_price": round(cur_price, 2),
                "current_value": round(current_value, 2),
                "unrealized_pnl": round(unrealized_pnl, 2),
                "unrealized_pnl_pct": round(unrealized_pnl_pct, 2),
            }
        )

    total_value = cash_balance + total_positions_val
    total_pnl = total_value - 10000.0
    total_pnl_pct = (total_pnl / 10000.0) * 100.0

    return {
        "cash_balance": round(cash_balance, 2),
        "total_value": round(total_value, 2),
        "total_pnl": round(total_pnl, 2),
        "total_pnl_pct": round(total_pnl_pct, 2),
        "positions": positions,
    }


@router.post("/trade")
async def execute_trade(
    req: TradeRequest,
    price_cache: PriceCache = Depends(get_price_cache),
    db_path=Depends(get_db_path_dep),
):
    """POST /api/portfolio/trade: Execute trade (buy or sell)."""
    ticker = req.ticker.strip().upper()
    side = req.side.lower()
    quantity = req.quantity

    if side not in ("buy", "sell"):
        raise HTTPException(status_code=400, detail="Invalid trade side. Must be 'buy' or 'sell'")
    if quantity <= 0:
        raise HTTPException(status_code=400, detail="Quantity must be greater than 0")

    # Get market price from cache or seed
    current_price = price_cache.get_price(ticker)
    if current_price is None:
        current_price = SEED_PRICES.get(ticker, 100.0)
        price_cache.update(ticker, current_price)

    profile = database.get_user_profile(db_path=db_path)
    cash_balance = profile["cash_balance"]
    existing_position = database.get_position(ticker, db_path=db_path)

    if side == "buy":
        cost = current_price * quantity
        if cash_balance < cost:
            raise HTTPException(
                status_code=400,
                detail=f"Insufficient cash balance (${cash_balance:.2f}) for trade cost (${cost:.2f})",
            )

        new_cash = cash_balance - cost
        database.update_user_cash(new_cash, db_path=db_path)

        if existing_position:
            old_qty = existing_position["quantity"]
            old_cost = existing_position["avg_cost"]
            new_qty = old_qty + quantity
            new_avg_cost = ((old_qty * old_cost) + cost) / new_qty
            updated_pos = database.upsert_position(
                ticker, new_qty, new_avg_cost, db_path=db_path
            )
        else:
            updated_pos = database.upsert_position(
                ticker, quantity, current_price, db_path=db_path
            )
    else:  # sell
        if not existing_position or existing_position["quantity"] < quantity:
            owned_qty = existing_position["quantity"] if existing_position else 0
            raise HTTPException(
                status_code=400,
                detail=f"Insufficient shares to sell. Owned: {owned_qty}, requested: {quantity}",
            )

        revenue = current_price * quantity
        new_cash = cash_balance + revenue
        database.update_user_cash(new_cash, db_path=db_path)

        new_qty = existing_position["quantity"] - quantity
        if new_qty <= 1e-6:
            database.delete_position(ticker, db_path=db_path)
            updated_pos = None
        else:
            updated_pos = database.upsert_position(
                ticker, new_qty, existing_position["avg_cost"], db_path=db_path
            )

    # Insert trade log record
    trade_record = database.record_trade(ticker, side, quantity, current_price, db_path=db_path)

    # Immediately calculate and record portfolio snapshot
    all_positions = database.get_positions(db_path=db_path)
    pos_val = sum(
        p["quantity"] * (price_cache.get_price(p["ticker"]) or p["avg_cost"])
        for p in all_positions
    )
    total_val = round(new_cash + pos_val, 2)
    database.record_portfolio_snapshot(total_val, db_path=db_path)

    return {
        "success": True,
        "trade": trade_record,
        "cash_balance": round(new_cash, 2),
        "portfolio_value": total_val,
        "position": updated_pos,
    }


@router.get("/history")
async def get_portfolio_history(
    db_path=Depends(get_db_path_dep),
):
    """GET /api/portfolio/history: Return portfolio snapshot value history over time."""
    snapshots = database.get_portfolio_history(db_path=db_path)
    return [
        {
            "id": snap["id"],
            "recorded_at": snap["recorded_at"],
            "total_value": snap["total_value"],
        }
        for snap in snapshots
    ]
