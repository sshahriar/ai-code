import React from 'react';
import { Position, TickerPriceMap } from '../types';
import { PieChart, AlertCircle } from 'lucide-react';

interface PortfolioHeatmapProps {
  positions: Position[];
  prices: TickerPriceMap;
  onSelectTicker?: (ticker: string) => void;
}

export const PortfolioHeatmap: React.FC<PortfolioHeatmapProps> = ({
  positions,
  prices,
  onSelectTicker,
}) => {
  // Enrich positions with live price updates if available
  const enrichedPositions = positions.map((pos) => {
    const liveUpdate = prices[pos.ticker];
    const curPrice = liveUpdate ? liveUpdate.price : (pos.current_price ?? pos.avg_cost);
    const mktVal = pos.quantity * curPrice;
    const costBasis = pos.quantity * pos.avg_cost;
    const pnl = mktVal - costBasis;
    const pnlPct = costBasis > 0 ? (pnl / costBasis) * 100 : 0;

    return {
      ...pos,
      curPrice,
      mktVal,
      pnl,
      pnlPct,
    };
  });

  const totalPositionsValue = enrichedPositions.reduce((acc, p) => acc + p.mktVal, 0);

  // Function to determine background color based on P&L percentage
  const getPnlColor = (pnlPct: number) => {
    if (pnlPct > 10) return 'bg-emerald-600 border-emerald-500 hover:bg-emerald-500';
    if (pnlPct > 5) return 'bg-emerald-700/90 border-emerald-600 hover:bg-emerald-600';
    if (pnlPct > 0) return 'bg-emerald-900/80 border-emerald-700 hover:bg-emerald-800';
    if (pnlPct === 0) return 'bg-slate-800 border-slate-700 hover:bg-slate-700';
    if (pnlPct > -5) return 'bg-rose-950/80 border-rose-800 hover:bg-rose-900';
    if (pnlPct > -10) return 'bg-rose-900/90 border-rose-700 hover:bg-rose-800';
    return 'bg-rose-700 border-rose-600 hover:bg-rose-600';
  };

  return (
    <div className="bg-card border border-muted-border rounded-lg flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="bg-card-header px-4 py-3 border-b border-muted-border flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <PieChart className="w-4 h-4 text-accent-yellow" />
          <h2 className="font-mono font-bold text-sm text-white tracking-wide uppercase">
            Portfolio Heatmap
          </h2>
        </div>
        <span className="text-xs font-mono text-terminal-muted">
          POSITIONS VALUE: ${totalPositionsValue.toFixed(2)}
        </span>
      </div>

      {/* Heatmap Area */}
      <div className="flex-1 p-3 overflow-hidden flex flex-col justify-center">
        {enrichedPositions.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-6 text-center text-terminal-muted">
            <AlertCircle className="w-8 h-8 mb-2 opacity-50 text-accent-yellow" />
            <p className="font-mono text-xs">No active positions in portfolio.</p>
            <p className="font-mono text-[11px] text-terminal-muted mt-1">
              Execute trades using the Trade Bar or AI Copilot to populate heatmap.
            </p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2 h-full min-h-[160px] w-full content-stretch">
            {enrichedPositions.map((pos) => {
              const weightPct = totalPositionsValue > 0 ? (pos.mktVal / totalPositionsValue) * 100 : 0;
              // Compute flex-grow / min-width based on weight percentage
              const flexGrowValue = Math.max(1, Math.round(weightPct * 10));

              return (
                <div
                  key={pos.ticker}
                  onClick={() => onSelectTicker && onSelectTicker(pos.ticker)}
                  style={{ flex: `${flexGrowValue} 1 120px` }}
                  className={`p-3 rounded border transition-all cursor-pointer flex flex-col justify-between select-none ${getPnlColor(
                    pos.pnlPct
                  )}`}
                  title={`${pos.ticker}: ${weightPct.toFixed(1)}% of portfolio | P&L: ${pos.pnlPct.toFixed(2)}%`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-base text-white">{pos.ticker}</span>
                    <span className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-black/40 text-white font-semibold">
                      {weightPct.toFixed(1)}%
                    </span>
                  </div>

                  <div className="mt-2">
                    <div className="font-mono text-sm font-bold text-white">
                      ${pos.mktVal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <div className="flex items-center justify-between text-xs font-mono mt-0.5">
                      <span className="text-white/80">{pos.quantity} shrs</span>
                      <span className="font-bold text-white">
                        {pos.pnlPct >= 0 ? '+' : ''}
                        {pos.pnlPct.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
