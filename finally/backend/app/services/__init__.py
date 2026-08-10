"""Services package for FinAlly backend."""

from .llm_service import (
    get_chat_history,
    process_chat,
)
from .portfolio_service import (
    execute_trade,
    get_portfolio_context,
    get_positions,
    get_user_profile,
)
from .watchlist_service import (
    add_to_watchlist,
    get_watchlist,
    remove_from_watchlist,
)

__all__ = [
    "get_user_profile",
    "get_positions",
    "get_portfolio_context",
    "execute_trade",
    "get_watchlist",
    "add_to_watchlist",
    "remove_from_watchlist",
    "process_chat",
    "get_chat_history",
]
