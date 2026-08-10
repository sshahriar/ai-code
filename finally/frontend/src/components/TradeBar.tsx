import React, { useState, useEffect } from 'react';
import { TickerPriceMap, Position } from '../types';
import { ShoppingBag, ArrowUpRight, ArrowDownRight, AlertCircle, CheckCircle2 } from 'lucide-react';

interface TradeBarProps {
  selectedTicker: string | null;
  prices: TickerPriceMap;
  cashBalance: number;
  positions: Position[];
  onExecuteTrade: (ticker: string, quantity: number, side: 'buy' | 'sell') => Promise<void>;
}

export const TradeBar: React.FC<TradeBarProps> = ({
  selectedTicker,
  prices,
  cashBalance,
  positions,
  onExecuteTrade,
}) => {
  const [ticker, setTicker] = useState(selectedTicker || 'AAPL');
  const [quantity, setQuantity] = useState<string>('1');
  const [isExecuting, setIsExecuting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    if (selectedTicker) {
      setTicker(selectedTicker);
    }
  }, [selectedTicker]);

  const activePriceUpdate = prices[ticker.toUpperCase()];
  const currentPrice = activePriceUpdate ? activePriceUpdate.price : 100.0;

  const currentPosition = positions.find((p) => p.ticker === ticker.toUpperCase());
  const ownedShares = currentPosition ? currentPosition.quantity : 0;
  const maxBuyShares = currentPrice > 0 ? Math.floor(cashBalance / currentPrice) : 0;

  const handleTrade = async (side: 'buy' | 'sell') => {
    const numQty = parseFloat(quantity);
    if (isNaN(numQty) || numQty <= 0) {
      setFeedback({ type: 'error', message: 'Quantity must be greater than 0' });
      return;
    }
    if (!ticker.trim()) {
      setFeedback({ type: 'error', message: 'Ticker symbol is required' });
      return;
    }

    try {
      setIsExecuting(true);
      setFeedback(null);
      await onExecuteTrade(ticker.trim().toUpperCase(), numQty, side);
      setFeedback({
        type: 'success',
        message: `Successfully executed ${side.toUpperCase()} for ${numQty} shares of ${ticker.toUpperCase()} @ $${currentPrice.toFixed(
          2
        )}`,
      });
    } catch (err: any) {
      setFeedback({ type: 'error', message: err.message || 'Trade execution failed' });
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="bg-card border border-muted-border rounded-lg p-4 select-none">
      <div className="flex items-center justify-between mb-3 border-b border-muted-border pb-2">
        <div className="flex items-center space-x-2">
          <ShoppingBag className="w-4 h-4 text-accent-purple" />
          <h2 className="font-mono font-bold text-sm text-white tracking-wide uppercase">
            Market Order Bar
          </h2>
        </div>
        <div className="flex items-center space-x-4 font-mono text-xs text-terminal-muted">
          <span>EST. PRICE: <strong className="text-white">${currentPrice.toFixed(2)}</strong></span>
          <span>OWNED: <strong className="text-white">{ownedShares}</strong></span>
          <span>MAX BUY: <strong className="text-accent-yellow">{maxBuyShares}</strong></span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {/* Ticker Input */}
        <div className="flex flex-col flex-1 min-w-[120px]">
          <label className="text-[10px] font-mono text-terminal-muted uppercase mb-1">Ticker</label>
          <input
            type="text"
            value={ticker}
            onChange={(e) => setTicker(e.target.value.toUpperCase())}
            placeholder="TICKER"
            className="bg-background border border-muted-border rounded px-3 py-1.5 font-mono font-bold text-sm text-white focus:outline-none focus:border-accent-blue"
            maxLength={10}
          />
        </div>

        {/* Quantity Input */}
        <div className="flex flex-col flex-1 min-w-[120px]">
          <label className="text-[10px] font-mono text-terminal-muted uppercase mb-1">Quantity</label>
          <input
            type="number"
            min="0.01"
            step="any"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="QTY"
            className="bg-background border border-muted-border rounded px-3 py-1.5 font-mono font-bold text-sm text-white focus:outline-none focus:border-accent-blue"
          />
        </div>

        {/* Estimated Total */}
        <div className="flex flex-col min-w-[120px]">
          <label className="text-[10px] font-mono text-terminal-muted uppercase mb-1">Est. Total</label>
          <div className="px-3 py-1.5 bg-background border border-muted-border rounded font-mono font-bold text-sm text-accent-yellow">
            ${((parseFloat(quantity) || 0) * currentPrice).toFixed(2)}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-end gap-2 mt-auto">
          {/* Instant Buy */}
          <button
            type="button"
            disabled={isExecuting || !ticker}
            onClick={() => handleTrade('buy')}
            className="bg-terminal-green hover:bg-emerald-600 disabled:opacity-50 text-black font-bold px-4 py-2 rounded text-xs font-mono flex items-center space-x-1.5 transition-colors shadow-md shadow-emerald-950/20"
          >
            <ArrowUpRight className="w-4 h-4" />
            <span>INSTANT BUY</span>
          </button>

          {/* Instant Sell */}
          <button
            type="button"
            disabled={isExecuting || !ticker || ownedShares <= 0}
            onClick={() => handleTrade('sell')}
            className="bg-accent-purple hover:bg-purple-800 disabled:opacity-50 text-white font-bold px-4 py-2 rounded text-xs font-mono flex items-center space-x-1.5 transition-colors shadow-md shadow-purple-950/20"
          >
            <ArrowDownRight className="w-4 h-4" />
            <span>INSTANT SELL</span>
          </button>
        </div>
      </div>

      {/* Feedback Toast / Alert */}
      {feedback && (
        <div
          className={`mt-3 p-2.5 rounded border font-mono text-xs flex items-center space-x-2 ${
            feedback.type === 'success'
              ? 'bg-emerald-950/60 border-emerald-800/80 text-emerald-300'
              : 'bg-rose-950/60 border-rose-800/80 text-rose-300'
          }`}
        >
          {feedback.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-terminal-green flex-shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-terminal-red flex-shrink-0" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}
    </div>
  );
};
