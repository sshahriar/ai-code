import React, { useState } from 'react';
import { WatchlistItem, TickerPriceMap, SparklineData } from '../types';
import { Plus, Trash2, TrendingUp, TrendingDown, Eye } from 'lucide-react';

interface WatchlistProps {
  items: WatchlistItem[];
  prices: TickerPriceMap;
  sparklines: SparklineData;
  flashes: Record<string, 'flash-green' | 'flash-red' | ''>;
  selectedTicker: string | null;
  onSelectTicker: (ticker: string) => void;
  onAddTicker: (ticker: string) => Promise<void>;
  onRemoveTicker: (ticker: string) => Promise<void>;
}

interface SparklineProps {
  data: number[];
  isPositive: boolean;
}

const Sparkline: React.FC<SparklineProps> = ({ data, isPositive }) => {
  if (!data || data.length < 2) {
    return <div className="w-16 h-5 bg-muted-border/30 rounded animate-pulse" />;
  }

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const width = 64;
  const height = 20;
  const padding = 2;

  const points = data
    .map((val, idx) => {
      const x = (idx / (data.length - 1)) * width;
      const y = height - padding - ((val - min) / range) * (height - 2 * padding);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  const strokeColor = isPositive ? '#00c805' : '#ff3b30';

  return (
    <svg className="w-16 h-5 overflow-visible" viewBox={`0 0 ${width} ${height}`}>
      <polyline
        fill="none"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
};

export const Watchlist: React.FC<WatchlistProps> = ({
  items,
  prices,
  sparklines,
  flashes,
  selectedTicker,
  onSelectTicker,
  onAddTicker,
  onRemoveTicker,
}) => {
  const [newTicker, setNewTicker] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const symbol = newTicker.trim().toUpperCase();
    if (!symbol) return;

    try {
      setIsSubmitting(true);
      setErrorMsg(null);
      await onAddTicker(symbol);
      setNewTicker('');
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to add ticker');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-card border border-muted-border rounded-lg flex flex-col h-full overflow-hidden">
      {/* Panel Header */}
      <div className="bg-card-header px-4 py-3 border-b border-muted-border flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Eye className="w-4 h-4 text-accent-yellow" />
          <h2 className="font-mono font-bold text-sm text-white tracking-wide uppercase">Watchlist</h2>
        </div>
        <span className="text-xs font-mono text-terminal-muted">{items.length} TICKERS</span>
      </div>

      {/* Add Ticker Form */}
      <form onSubmit={handleAdd} className="p-3 border-b border-muted-border bg-background/50 flex gap-2">
        <input
          type="text"
          value={newTicker}
          onChange={(e) => setNewTicker(e.target.value.toUpperCase())}
          placeholder="ADD TICKER (e.g. NVDA)"
          className="flex-1 bg-background border border-muted-border rounded px-3 py-1.5 text-xs font-mono text-white placeholder-terminal-muted focus:outline-none focus:border-accent-blue"
          maxLength={10}
        />
        <button
          type="submit"
          disabled={isSubmitting || !newTicker.trim()}
          className="bg-accent-blue hover:bg-blue-600 disabled:opacity-50 text-white px-3 py-1.5 rounded text-xs font-mono font-medium flex items-center space-x-1 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>ADD</span>
        </button>
      </form>

      {errorMsg && (
        <div className="px-3 py-1.5 bg-rose-950/50 border-b border-rose-800/50 text-rose-300 text-xs font-mono">
          {errorMsg}
        </div>
      )}

      {/* Watchlist Items */}
      <div className="flex-1 overflow-y-auto divide-y divide-muted-border/50">
        {items.length === 0 ? (
          <div className="p-6 text-center text-terminal-muted text-xs font-mono">
            No tickers in watchlist. Add one above.
          </div>
        ) : (
          items.map((item) => {
            const livePrice = prices[item.ticker];
            const displayPrice = livePrice ? livePrice.price : (item.price ?? 100);
            const changePct = livePrice ? livePrice.change_percent : (item.change_percent ?? 0);
            const flashClass = flashes[item.ticker] || '';
            const isSelected = selectedTicker === item.ticker;
            const sparklinePoints = sparklines[item.ticker] || [displayPrice];
            const isPositive = changePct >= 0;

            return (
              <div
                key={item.ticker}
                onClick={() => onSelectTicker(item.ticker)}
                className={`group flex items-center justify-between px-3 py-2.5 cursor-pointer transition-all ${
                  isSelected ? 'bg-accent-blue/15 border-l-2 border-accent-blue' : 'hover:bg-muted-border/30'
                } ${flashClass}`}
              >
                {/* Ticker Symbol */}
                <div className="flex flex-col min-w-[70px]">
                  <span className="font-mono font-bold text-sm text-white">{item.ticker}</span>
                  <span className="text-[10px] font-mono text-terminal-muted">
                    {sparklinePoints.length} pts
                  </span>
                </div>

                {/* Sparkline mini chart */}
                <div className="hidden sm:block px-2">
                  <Sparkline data={sparklinePoints} isPositive={isPositive} />
                </div>

                {/* Price & Change */}
                <div className="flex flex-col items-end min-w-[90px]">
                  <span className="font-mono font-bold text-sm text-white">
                    ${displayPrice.toFixed(2)}
                  </span>
                  <span
                    className={`font-mono text-xs flex items-center space-x-0.5 ${
                      isPositive ? 'text-terminal-green' : 'text-terminal-red'
                    }`}
                  >
                    {isPositive ? (
                      <TrendingUp className="w-3 h-3 inline" />
                    ) : (
                      <TrendingDown className="w-3 h-3 inline" />
                    )}
                    <span>
                      {isPositive ? '+' : ''}
                      {changePct.toFixed(2)}%
                    </span>
                  </span>
                </div>

                {/* Remove button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveTicker(item.ticker);
                  }}
                  className="opacity-0 group-hover:opacity-100 ml-2 p-1 text-terminal-muted hover:text-terminal-red rounded transition-opacity"
                  title={`Remove ${item.ticker}`}
                  aria-label={`Remove ${item.ticker}`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
