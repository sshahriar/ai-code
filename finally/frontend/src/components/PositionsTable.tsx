import React from 'react';
import { Position, TickerPriceMap } from '../types';
import { Layers, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface PositionsTableProps {
  positions: Position[];
  prices: TickerPriceMap;
  selectedTicker: string | null;
  onSelectTicker: (ticker: string) => void;
}

export const PositionsTable: React.FC<PositionsTableProps> = ({
  positions,
  prices,
  selectedTicker,
  onSelectTicker,
}) => {
  return (
    <div className="bg-card border border-muted-border rounded-lg flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="bg-card-header px-4 py-3 border-b border-muted-border flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Layers className="w-4 h-4 text-accent-yellow" />
          <h2 className="font-mono font-bold text-sm text-white tracking-wide uppercase">
            Active Holdings
          </h2>
        </div>
        <span className="text-xs font-mono text-terminal-muted">{positions.length} POSITIONS</span>
      </div>

      {/* Table Area */}
      <div className="flex-1 overflow-x-auto overflow-y-auto">
        <table className="w-full text-left border-collapse select-none">
          <thead>
            <tr className="bg-card-header/60 border-b border-muted-border font-mono text-[11px] text-terminal-muted uppercase tracking-wider">
              <th className="py-2.5 px-3">Ticker</th>
              <th className="py-2.5 px-3 text-right">Shares</th>
              <th className="py-2.5 px-3 text-right">Avg Cost</th>
              <th className="py-2.5 px-3 text-right">Current Price</th>
              <th className="py-2.5 px-3 text-right">Market Value</th>
              <th className="py-2.5 px-3 text-right">Unrealized P&L</th>
              <th className="py-2.5 px-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-muted-border/40 font-mono text-xs">
            {positions.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-terminal-muted">
                  No open positions. Use the Trade Bar to purchase shares.
                </td>
              </tr>
            ) : (
              positions.map((pos) => {
                const liveUpdate = prices[pos.ticker];
                const currentPrice = liveUpdate
                  ? liveUpdate.price
                  : (pos.current_price ?? pos.avg_cost);
                const marketValue = pos.quantity * currentPrice;
                const costBasis = pos.quantity * pos.avg_cost;
                const unrealizedPnl = marketValue - costBasis;
                const unrealizedPnlPct = costBasis > 0 ? (unrealizedPnl / costBasis) * 100 : 0;

                const isProfitable = unrealizedPnl >= 0;
                const isSelected = selectedTicker === pos.ticker;

                return (
                  <tr
                    key={pos.ticker}
                    onClick={() => onSelectTicker(pos.ticker)}
                    className={`cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-accent-blue/15 border-l-2 border-accent-blue'
                        : 'hover:bg-muted-border/30'
                    }`}
                  >
                    <td className="py-2.5 px-3 font-bold text-white flex items-center space-x-1">
                      <span>{pos.ticker}</span>
                    </td>
                    <td className="py-2.5 px-3 text-right text-terminal-text">
                      {pos.quantity}
                    </td>
                    <td className="py-2.5 px-3 text-right text-terminal-text">
                      ${pos.avg_cost.toFixed(2)}
                    </td>
                    <td className="py-2.5 px-3 text-right font-bold text-white">
                      ${currentPrice.toFixed(2)}
                    </td>
                    <td className="py-2.5 px-3 text-right text-white">
                      ${marketValue.toFixed(2)}
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <div className="flex items-center justify-end space-x-1">
                        {isProfitable ? (
                          <ArrowUpRight className="w-3.5 h-3.5 text-terminal-green" />
                        ) : (
                          <ArrowDownRight className="w-3.5 h-3.5 text-terminal-red" />
                        )}
                        <span
                          className={`font-bold ${
                            isProfitable ? 'text-terminal-green' : 'text-terminal-red'
                          }`}
                        >
                          {isProfitable ? '+' : ''}
                          ${unrealizedPnl.toFixed(2)} ({isProfitable ? '+' : ''}
                          {unrealizedPnlPct.toFixed(2)}%)
                        </span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectTicker(pos.ticker);
                        }}
                        className="px-2 py-1 bg-background hover:bg-muted-border text-accent-blue text-[11px] rounded border border-muted-border transition-colors font-mono"
                      >
                        Trade
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
