import React, { useState } from 'react';
import { PriceUpdate } from '../types';
import { BarChart2, TrendingUp, TrendingDown, Clock } from 'lucide-react';

interface MainChartProps {
  ticker: string | null;
  priceUpdate: PriceUpdate | null;
  history: number[];
}

export const MainChart: React.FC<MainChartProps> = ({ ticker, priceUpdate, history }) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  if (!ticker) {
    return (
      <div className="bg-card border border-muted-border rounded-lg flex flex-col items-center justify-center p-8 h-full text-center">
        <BarChart2 className="w-12 h-12 text-terminal-muted mb-3 animate-pulse" />
        <h3 className="font-mono font-bold text-white text-base">NO TICKER SELECTED</h3>
        <p className="font-mono text-xs text-terminal-muted mt-1">
          Select a ticker from the watchlist to display market price action.
        </p>
      </div>
    );
  }

  const dataPoints = history.length > 0 ? history : [priceUpdate?.price || 100];
  const currentPrice = priceUpdate?.price ?? dataPoints[dataPoints.length - 1];
  const changePercent = priceUpdate?.change_percent ?? 0;
  const isPositive = changePercent >= 0;

  const minPrice = Math.min(...dataPoints);
  const maxPrice = Math.max(...dataPoints);
  const priceRange = maxPrice - minPrice || 1;

  const svgWidth = 600;
  const svgHeight = 220;
  const paddingX = 40;
  const paddingY = 20;

  const chartWidth = svgWidth - paddingX * 2;
  const chartHeight = svgHeight - paddingY * 2;

  const pointsCoordinates = dataPoints.map((val, idx) => {
    const x = paddingX + (dataPoints.length > 1 ? (idx / (dataPoints.length - 1)) * chartWidth : chartWidth / 2);
    const y = paddingY + chartHeight - ((val - minPrice) / priceRange) * chartHeight;
    return { x, y, price: val, index: idx };
  });

  const polylinePoints = pointsCoordinates.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');

  const areaPoints =
    dataPoints.length > 1
      ? `${paddingX},${svgHeight - paddingY} ${polylinePoints} ${svgWidth - paddingX},${svgHeight - paddingY}`
      : '';

  const hoveredPoint = hoverIndex !== null && pointsCoordinates[hoverIndex] ? pointsCoordinates[hoverIndex] : null;

  return (
    <div className="bg-card border border-muted-border rounded-lg flex flex-col h-full overflow-hidden">
      {/* Header Bar */}
      <div className="bg-card-header px-4 py-3 border-b border-muted-border flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center space-x-3">
          <span className="font-mono font-bold text-lg text-white tracking-wider">{ticker}</span>
          <div className="flex items-center space-x-2">
            <span className="font-mono font-bold text-xl text-white">
              ${(hoveredPoint ? hoveredPoint.price : currentPrice).toFixed(2)}
            </span>
            <span
              className={`font-mono text-xs px-2 py-0.5 rounded flex items-center space-x-1 ${
                isPositive ? 'bg-terminal-green/20 text-terminal-green' : 'bg-terminal-red/20 text-terminal-red'
              }`}
            >
              {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              <span>{isPositive ? '+' : ''}{changePercent.toFixed(2)}%</span>
            </span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="flex items-center space-x-4 font-mono text-xs">
          <div>
            <span className="text-terminal-muted">LOW: </span>
            <span className="text-terminal-red">${minPrice.toFixed(2)}</span>
          </div>
          <div>
            <span className="text-terminal-muted">HIGH: </span>
            <span className="text-terminal-green">${maxPrice.toFixed(2)}</span>
          </div>
          <div className="flex items-center space-x-1 text-terminal-muted">
            <Clock className="w-3 h-3" />
            <span>REALTIME</span>
          </div>
        </div>
      </div>

      {/* Chart Canvas Area */}
      <div className="flex-1 p-4 relative flex items-center justify-center min-h-[220px]">
        <svg
          className="w-full h-full max-h-[240px] overflow-visible select-none"
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          preserveAspectRatio="none"
          onMouseLeave={() => setHoverIndex(null)}
        >
          <defs>
            <linearGradient id={`gradient-${ticker}`} x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor={isPositive ? '#00c805' : '#ff3b30'}
                stopOpacity="0.35"
              />
              <stop
                offset="100%"
                stopColor={isPositive ? '#00c805' : '#ff3b30'}
                stopOpacity="0.0"
              />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((pct) => {
            const y = paddingY + chartHeight * pct;
            const priceVal = maxPrice - pct * priceRange;
            return (
              <g key={pct}>
                <line
                  x1={paddingX}
                  y1={y}
                  x2={svgWidth - paddingX}
                  y2={y}
                  stroke="#2a2d3d"
                  strokeDasharray="3,3"
                  strokeWidth="1"
                />
                <text
                  x={svgWidth - paddingX + 6}
                  y={y + 3}
                  fill="#8b949e"
                  fontSize="9"
                  fontFamily="Fira Code, monospace"
                >
                  ${priceVal.toFixed(2)}
                </text>
              </g>
            );
          })}

          {/* Gradient Area Fill */}
          {areaPoints && (
            <polygon points={areaPoints} fill={`url(#gradient-${ticker})`} />
          )}

          {/* Price Line */}
          {dataPoints.length > 1 && (
            <polyline
              fill="none"
              stroke={isPositive ? '#00c805' : '#ff3b30'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={polylinePoints}
            />
          )}

          {/* Interactive Hover Crosshair */}
          {pointsCoordinates.map((p, idx) => (
            <rect
              key={idx}
              x={p.x - (chartWidth / (dataPoints.length || 1)) / 2}
              y={paddingY}
              width={chartWidth / (dataPoints.length || 1)}
              height={chartHeight}
              fill="transparent"
              onMouseEnter={() => setHoverIndex(idx)}
            />
          ))}

          {hoveredPoint && (
            <g>
              <line
                x1={hoveredPoint.x}
                y1={paddingY}
                x2={hoveredPoint.x}
                y2={svgHeight - paddingY}
                stroke="#209dd7"
                strokeDasharray="2,2"
                strokeWidth="1"
              />
              <circle
                cx={hoveredPoint.x}
                cy={hoveredPoint.y}
                r="4"
                fill="#209dd7"
                stroke="#ffffff"
                strokeWidth="1.5"
              />
            </g>
          )}
        </svg>

        {/* Floating Tooltip */}
        {hoveredPoint && (
          <div
            className="absolute top-2 left-6 bg-background/90 border border-accent-blue rounded px-2.5 py-1 text-xs font-mono shadow-lg pointer-events-none"
          >
            <span className="text-terminal-muted">Tick #{hoveredPoint.index + 1}: </span>
            <span className="text-white font-bold">${hoveredPoint.price.toFixed(2)}</span>
          </div>
        )}
      </div>
    </div>
  );
};
