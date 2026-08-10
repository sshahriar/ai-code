export type Direction = 'up' | 'down' | 'flat';
export type ConnectionStatus = 'connected' | 'reconnecting' | 'disconnected';

export interface PriceUpdate {
  ticker: string;
  price: number;
  previous_price: number;
  timestamp: number;
  change: number;
  change_percent: number;
  direction: Direction;
}

export interface TickerPriceMap {
  [ticker: string]: PriceUpdate;
}

export interface SparklineData {
  [ticker: string]: number[];
}

export interface Position {
  id?: string;
  user_id?: string;
  ticker: string;
  quantity: number;
  avg_cost: number;
  current_price?: number;
  current_value?: number;
  market_value?: number;
  unrealized_pnl?: number;
  unrealized_pnl_pct?: number;
  unrealized_pnl_percent?: number;
  updated_at?: string;
}

export interface PortfolioSummary {
  cash_balance: number;
  positions: Position[];
  total_value: number;
  total_pnl?: number;
  total_pnl_pct?: number;
  unrealized_pnl?: number;
  total_cost?: number;
}

export interface PortfolioSnapshot {
  id?: string;
  user_id?: string;
  total_value: number;
  recorded_at: string;
}

export interface TradeRequest {
  ticker: string;
  quantity: number;
  side: 'buy' | 'sell';
}

export interface TradeRecord {
  id?: string;
  ticker: string;
  side: 'buy' | 'sell';
  quantity: number;
  price: number;
  executed_at?: string;
}

export interface TradeResponse {
  success: boolean;
  message?: string;
  trade?: TradeRecord;
  cash_balance?: number;
  portfolio_value?: number;
  position?: Position | null;
  portfolio?: PortfolioSummary;
}

export interface WatchlistItem {
  id?: string;
  user_id?: string;
  ticker: string;
  added_at?: string;
  price?: number;
  previous_price?: number;
  change?: number;
  change_percent?: number;
  direction?: Direction;
}

export interface ChatTradeAction {
  ticker: string;
  side: 'buy' | 'sell';
  quantity: number;
  price?: number;
  status?: string;
}

export interface ChatWatchlistAction {
  ticker: string;
  action: 'add' | 'remove';
  result?: string;
}

export interface ChatActions {
  trades?: ChatTradeAction[];
  watchlist_changes?: ChatWatchlistAction[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  actions?: ChatActions | null;
  trades?: ChatTradeAction[];
  watchlist_changes?: ChatWatchlistAction[];
  created_at?: string;
}

export interface ChatResponse {
  message: string;
  trades?: ChatTradeAction[];
  watchlist_changes?: ChatWatchlistAction[];
}
