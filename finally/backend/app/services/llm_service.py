"""LLM Service for FinAlly backend using OpenRouter API or deterministic mock fallback."""

from __future__ import annotations

import json
import os
import re
import uuid
from datetime import datetime, timezone

import httpx

from app.db.database import get_db_connection, init_db
from app.market.cache import PriceCache
from app.services.portfolio_service import execute_trade, get_portfolio_context
from app.services.watchlist_service import add_to_watchlist, remove_from_watchlist

OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"
DEFAULT_LLM_MODEL = "openai/gpt-4o-mini"


def is_mock_mode() -> bool:
    """Return True if LLM_MOCK is set or OPENROUTER_API_KEY is missing/empty."""
    llm_mock_env = os.environ.get("LLM_MOCK", "").strip().lower()
    if llm_mock_env in ("true", "1", "yes"):
        return True
    api_key = os.environ.get("OPENROUTER_API_KEY", "").strip()
    return not bool(api_key)


def get_chat_history(
    user_id: str = "default", limit: int = 10, db_path: str | None = None
) -> list[dict]:
    """Fetch recent conversation history from chat_messages table."""
    init_db(db_path)
    conn = get_db_connection(db_path)
    try:
        cursor = conn.cursor()
        cursor.execute(
            """
            SELECT id, role, content, actions, created_at
            FROM chat_messages
            WHERE user_id = ?
            ORDER BY created_at DESC
            LIMIT ?
            """,
            (user_id, limit),
        )
        rows = cursor.fetchall()
        messages = []
        for row in reversed(rows):
            actions_parsed = None
            if row["actions"]:
                try:
                    actions_parsed = json.loads(row["actions"])
                except Exception:
                    actions_parsed = None
            messages.append(
                {
                    "id": row["id"],
                    "role": row["role"],
                    "content": row["content"],
                    "actions": actions_parsed,
                    "created_at": row["created_at"],
                }
            )
        return messages
    finally:
        conn.close()


def save_chat_message(
    role: str,
    content: str,
    actions: dict | None = None,
    user_id: str = "default",
    db_path: str | None = None,
) -> dict:
    """Save a user or assistant chat message with optional actions JSON to SQLite."""
    init_db(db_path)
    conn = get_db_connection(db_path)
    msg_id = str(uuid.uuid4())
    now_str = datetime.now(timezone.utc).isoformat()
    actions_json = json.dumps(actions) if actions is not None else None

    try:
        with conn:
            cursor = conn.cursor()
            cursor.execute(
                """
                INSERT INTO chat_messages (id, user_id, role, content, actions, created_at)
                VALUES (?, ?, ?, ?, ?, ?)
                """,
                (msg_id, user_id, role, content, actions_json, now_str),
            )
        return {
            "id": msg_id,
            "user_id": user_id,
            "role": role,
            "content": content,
            "actions": actions,
            "created_at": now_str,
        }
    finally:
        conn.close()


def build_system_prompt(portfolio_context: dict) -> str:
    """Construct system prompt identifying FinAlly as an AI trading workstation copilot."""
    positions_summary = []
    for pos in portfolio_context.get("positions", []):
        positions_summary.append(
            f"- {pos['ticker']}: {pos['quantity']} shares @ avg ${pos['avg_cost']:.2f} "
            f"(current: ${pos['current_price']:.2f}, P&L: ${pos['unrealized_pnl']:+.2f} / {pos['unrealized_pnl_pct']:+.2f}%)"
        )
    pos_str = "\n".join(positions_summary) if positions_summary else "No active positions."

    watchlist_summary = []
    for wl in portfolio_context.get("watchlist", []):
        watchlist_summary.append(f"- {wl['ticker']}: ${wl['price']:.2f}")
    wl_str = "\n".join(watchlist_summary) if watchlist_summary else "Watchlist empty."

    return f"""You are FinAlly, an elite AI Trading Assistant on the FinAlly Trading Workstation.
You analyze portfolio composition, risk concentration, P&L performance, suggest trades with analytical reasoning, execute trades, and manage the user's watchlist.

Current Portfolio State:
- Cash Balance: ${portfolio_context['cash_balance']:,.2f}
- Total Positions Value: ${portfolio_context['total_positions_value']:,.2f}
- Total Portfolio Value: ${portfolio_context['total_portfolio_value']:,.2f}
Active Positions:
{pos_str}
Watchlist Tickers:
{wl_str}

STRICT JSON OUTPUT REQUIREMENT:
You MUST respond ONLY with a JSON object matching this exact schema:
{{
  "message": "Your conversational response explaining analysis, recommendations, or confirming actions.",
  "trades": [
    {{"ticker": "AAPL", "side": "buy", "quantity": 10}}
  ],
  "watchlist_changes": [
    {{"ticker": "PYPL", "action": "add"}}
  ]
}}

Rules:
1. If the user asks to buy/sell shares or add/remove tickers, populate "trades" and/or "watchlist_changes" accordingly.
2. Quantities must be positive numbers. "side" must be "buy" or "sell". "action" must be "add" or "remove".
3. If no trades or watchlist changes are requested, set "trades": [] and "watchlist_changes": [].
4. Always respond with valid JSON. Do not include markdown formatting or extra text outside the JSON object.
"""


def generate_mock_response(user_message: str, portfolio_context: dict) -> dict:
    """Generate a deterministic mock JSON response based on user input."""
    msg_lower = user_message.strip().lower()

    trades = []
    watchlist_changes = []

    stop_words = {"shares", "share", "of", "stocks", "stock", "units", "unit", "the", "a", "my", "to", "from", "for", "me"}

    def get_clean_ticker(text: str, default: str = "AAPL") -> str:
        words = [w.strip().upper() for w in text.split() if w.strip()]
        filtered = [w for w in words if w.lower() not in stop_words and w.isalpha()]
        return filtered[0] if filtered else default

    # Check buy request
    if "buy" in msg_lower:
        buy_match = re.search(r"buy\s+(?:(\d+(?:\.\d+)?)\s*)?(.*)", msg_lower)
        if buy_match:
            qty_str, rest = buy_match.group(1), buy_match.group(2)
            try:
                qty = float(qty_str) if qty_str else 10.0
            except ValueError:
                qty = 10.0
            ticker = get_clean_ticker(rest, "AAPL")
            trades.append({"ticker": ticker, "side": "buy", "quantity": qty})

    # Check sell request
    elif "sell" in msg_lower:
        sell_match = re.search(r"sell\s+(?:(\d+(?:\.\d+)?)\s*)?(.*)", msg_lower)
        if sell_match:
            qty_str, rest = sell_match.group(1), sell_match.group(2)
            try:
                qty = float(qty_str) if qty_str else 5.0
            except ValueError:
                qty = 5.0
            ticker = get_clean_ticker(rest, "AAPL")
            trades.append({"ticker": ticker, "side": "sell", "quantity": qty})

    # Check watchlist add request
    add_match = re.search(r"(?:add|watch)\s+([a-zA-Z]+)", msg_lower)
    if add_match and not ("add to" in msg_lower and "watchlist" in msg_lower and trades):
        ticker = add_match.group(1).upper()
        if ticker not in ("MY", "THE", "TO", "A", "OUR", "THIS"):
            watchlist_changes.append({"ticker": ticker, "action": "add"})

    # Check watchlist remove request
    remove_match = re.search(r"(?:remove|unwatch)\s+([a-zA-Z]+)", msg_lower)
    if remove_match:
        ticker = remove_match.group(1).upper()
        if ticker not in ("MY", "THE", "FROM", "A"):
            watchlist_changes.append({"ticker": ticker, "action": "remove"})

    # Construct response message
    parts = []
    if trades:
        for t in trades:
            parts.append(f"Initiating {t['side']} order for {t['quantity']} shares of {t['ticker']}.")
    if watchlist_changes:
        for w in watchlist_changes:
            action_verb = "added" if w["action"] == "add" else "removed"
            parts.append(f"I have {action_verb} {w['ticker']} {'to' if w['action'] == 'add' else 'from'} your watchlist.")

    if not parts:
        total_val = portfolio_context.get("total_portfolio_value", 10000.0)
        cash = portfolio_context.get("cash_balance", 10000.0)
        num_pos = len(portfolio_context.get("positions", []))
        parts.append(
            f"FinAlly Assistant: Your current total portfolio value is ${total_val:,.2f} with ${cash:,.2f} in cash across {num_pos} position(s). How can I help you trade or analyze your portfolio today?"
        )

    return {
        "message": " ".join(parts),
        "trades": trades,
        "watchlist_changes": watchlist_changes,
    }


def clean_and_parse_json(text: str) -> dict:
    """Parse JSON text from LLM response, stripping code blocks if present."""
    text_clean = text.strip()
    if text_clean.startswith("```"):
        # Strip markdown code fence
        lines = text_clean.splitlines()
        if lines[0].startswith("```"):
            lines = lines[1:]
        if lines and lines[-1].startswith("```"):
            lines = lines[:-1]
        text_clean = "\n".join(lines).strip()

    try:
        parsed = json.loads(text_clean)
        if isinstance(parsed, dict):
            return parsed
    except Exception:
        pass

    # Regex extraction fallback if JSON is embedded in extra text
    json_match = re.search(r"\{.*\}", text_clean, re.DOTALL)
    if json_match:
        try:
            parsed = json.loads(json_match.group(0))
            if isinstance(parsed, dict):
                return parsed
        except Exception:
            pass

    return {
        "message": text,
        "trades": [],
        "watchlist_changes": [],
    }


async def call_openrouter_api(
    user_message: str,
    portfolio_context: dict,
    chat_history: list[dict],
) -> dict:
    """Make HTTP POST call to OpenRouter API directly."""
    api_key = os.environ.get("OPENROUTER_API_KEY", "").strip()
    if not api_key:
        return generate_mock_response(user_message, portfolio_context)

    system_prompt = build_system_prompt(portfolio_context)
    messages = [{"role": "system", "content": system_prompt}]

    for msg in chat_history:
        messages.append({"role": msg["role"], "content": msg["content"]})

    messages.append({"role": "user", "content": user_message})

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
        "HTTP-Referer": "https://finally-trading.local",
        "X-Title": "FinAlly AI Workstation",
    }

    payload = {
        "model": DEFAULT_LLM_MODEL,
        "messages": messages,
        "response_format": {"type": "json_object"},
        "temperature": 0.2,
    }

    async with httpx.AsyncClient(timeout=30.0) as client:
        try:
            response = await client.post(OPENROUTER_URL, headers=headers, json=payload)
            response.raise_for_status()
            data = response.json()

            choice = data["choices"][0]["message"]["content"]
            parsed = clean_and_parse_json(choice)
            return parsed
        except Exception as exc:
            # Fallback to mock on API error / network failure
            mock_res = generate_mock_response(user_message, portfolio_context)
            mock_res["message"] = (
                f"[OpenRouter API Error: {str(exc)}] {mock_res['message']}"
            )
            return mock_res


async def process_chat(
    user_message: str,
    price_cache: PriceCache | None = None,
    user_id: str = "default",
    db_path: str | None = None,
) -> dict:
    """Process incoming chat message: gather context, call LLM/mock, auto-execute actions, and save to DB."""
    # 1. Gather context
    context = get_portfolio_context(price_cache=price_cache, user_id=user_id, db_path=db_path)

    # 2. Save user message to DB
    save_chat_message(role="user", content=user_message, user_id=user_id, db_path=db_path)

    # 3. Get history for prompt context
    history = get_chat_history(user_id=user_id, limit=6, db_path=db_path)

    # 4. Determine LLM response (Mock or OpenRouter API)
    if is_mock_mode():
        raw_response = generate_mock_response(user_message, context)
    else:
        raw_response = await call_openrouter_api(user_message, context, history)

    # 5. Extract fields
    message_text = raw_response.get("message", "Request processed.")
    requested_trades = raw_response.get("trades", [])
    requested_watchlist = raw_response.get("watchlist_changes", [])

    if not isinstance(requested_trades, list):
        requested_trades = []
    if not isinstance(requested_watchlist, list):
        requested_watchlist = []

    # 6. Auto-execute trades & watchlist changes
    executed_trades = []
    executed_watchlist_changes = []
    error_notes = []

    for tr in requested_trades:
        if not isinstance(tr, dict):
            continue
        ticker = str(tr.get("ticker", "")).upper()
        side = str(tr.get("side", "")).lower()
        try:
            qty = float(tr.get("quantity", 0))
        except (ValueError, TypeError):
            qty = 0.0

        if ticker and side in ("buy", "sell") and qty > 0:
            res = execute_trade(
                ticker=ticker,
                side=side,
                quantity=qty,
                price_cache=price_cache,
                user_id=user_id,
                db_path=db_path,
            )
            if res.get("success"):
                executed_trades.append(
                    {
                        "ticker": ticker,
                        "side": side,
                        "quantity": qty,
                        "price": res["trade"]["price"],
                        "status": "executed",
                    }
                )
            else:
                error_msg = res.get("error", "Validation failed")
                error_notes.append(f"Failed to execute {side} {qty} {ticker}: {error_msg}")

    for wl in requested_watchlist:
        if not isinstance(wl, dict):
            continue
        ticker = str(wl.get("ticker", "")).upper()
        action = str(wl.get("action", "")).lower()

        if ticker and action in ("add", "remove"):
            if action == "add":
                res = add_to_watchlist(ticker=ticker, user_id=user_id, db_path=db_path)
                executed_watchlist_changes.append({"ticker": ticker, "action": "add", "result": res.get("action")})
            else:
                removed = remove_from_watchlist(ticker=ticker, user_id=user_id, db_path=db_path)
                executed_watchlist_changes.append({"ticker": ticker, "action": "remove", "removed": removed})

    # Append any execution errors to the assistant message
    if error_notes:
        message_text += "\n\n[Execution Notice]: " + "; ".join(error_notes)

    actions_summary = {
        "trades": executed_trades,
        "watchlist_changes": executed_watchlist_changes,
    }

    # 7. Save assistant message with executed actions
    save_chat_message(
        role="assistant",
        content=message_text,
        actions=actions_summary,
        user_id=user_id,
        db_path=db_path,
    )

    # 8. Return response format
    return {
        "message": message_text,
        "trades": executed_trades,
        "watchlist_changes": executed_watchlist_changes,
    }
