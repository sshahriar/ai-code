import React, { useState } from 'react';
import { PortfolioSnapshot } from '../types';
import { LineChart, DollarSign } from 'lucide-react';

interface PnLChartProps {
  history: PortfolioSnapshot[];
  currentTotalValue?: number;
}

export const PnLChart: React.FC<PnLChartProps> = ({ history, currentTotalValue }) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  // Combine history with latest currentTotalValue if available
  const dataPoints: { value: number; label: string }[] = history.map((snap) => ({
    value: snap.total_value,
    label: new Date(snap.recorded_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
  }));

  if (currentTotalValue !== undefined && dataPoints.length > 0) {
    const lastPoint = dataPoints[dataPoints.length - 1];
    if (Math.abs(lastPoint.value - currentTotalValue) > 0.01) {
      dataPoints.push({
        value: currentTotalValue,
        label: 'Now',
      });
    }
  }

  // Fallback initial point if history is empty
  if (dataPoints.length === 0) {
    dataPoints.push({ value: currentTotalValue ?? 10000, label: 'Start' });
  }

  const values = dataPoints.map((d) => d.value);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);
  const range = maxVal - minVal || 100;

  const svgWidth = 500;
  const svgHeight = 180;
  const paddingX = 40;
  const paddingY = 20;

  const chartWidth = svgWidth - paddingX * 2;
  const chartHeight = svgHeight - paddingY * 2;

  const points = dataPoints.map((d, idx) => {
    const x = paddingX + (dataPoints.length > 1 ? (idx / (dataPoints.length - 1)) * chartWidth : chartWidth / 2);
    const y = paddingY + chartHeight - ((d.value - minVal) / range) * chartHeight;
    return { x, y, value: d.value, label: d.label, index: idx };
  });

  const polylineStr = points.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
  const areaStr =
    dataPoints.length > 1
      ? `${paddingX},${svgHeight - paddingY} ${polylineStr} ${svgWidth - paddingX},${svgHeight - paddingY}`
      : '';

  const initialBaseline = 10000;
  const latestVal = values[values.length - 1];
  const netGain = latestVal - initialBaseline;
  const netGainPct = (netGain / initialBaseline) * 100;
  const isProfitable = netGain >= 0;

  const hoveredPoint = hoverIndex !== null && points[hoverIndex] ? points[hoverIndex] : null;

  return (
    <div className="bg-card border border-muted-border rounded-lg flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="bg-card-header px-4 py-3 border-b border-muted-border flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <LineChart className="w-4 h-4 text-accent-blue" />
          <h2 className="font-mono font-bold text-sm text-white tracking-wide uppercase">
            Portfolio P&L History
          </h2>
        </div>
        <div className="flex items-center space-x-2 font-mono text-xs">
          <span className="text-terminal-muted">NET P&L:</span>
          <span className={`font-bold ${isProfitable ? 'text-terminal-green' : 'text-terminal-red'}`}>
            {isProfitable ? '+' : ''}${netGain.toFixed(2)} ({isProfitable ? '+' : ''}
            {netGainPct.toFixed(2)}%)
          </span>
        </div>
      </div>

      {/* SVG Chart */}
      <div className="flex-1 p-3 relative flex items-center justify-center min-h-[160px]">
        <svg
          className="w-full h-full max-h-[180px] overflow-visible select-none"
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          preserveAspectRatio="none"
          onMouseLeave={() => setHoverIndex(null)}
        >
          <defs>
            <linearGradient id="pnl-area-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor={isProfitable ? '#00c805' : '#ff3b30'}
                stopOpacity="0.3"
              />
              <stop
                offset="100%"
                stopColor={isProfitable ? '#00c805' : '#ff3b30'}
                stopOpacity="0.0"
              />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 0.5, 1].map((pct) => {
            const y = paddingY + chartHeight * pct;
            const val = maxVal - pct * range;
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
                  x={paddingX - 6}
                  y={y + 3}
                  fill="#8b949e"
                  fontSize="9"
                  fontFamily="Fira Code, monospace"
                  textAnchor="end"
                >
                  ${val.toFixed(0)}
                </text>
              </g>
            );
          })}

          {/* Area Fill */}
          {areaStr && <polygon points={areaStr} fill="url(#pnl-area-gradient)" />}

          {/* Line */}
          {dataPoints.length > 1 && (
            <polyline
              fill="none"
              stroke={isProfitable ? '#00c805' : '#ff3b30'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={polylineStr}
            />
          )}

          {/* Hover hitboxes */}
          {points.map((p, idx) => (
            <rect
              key={idx}
              x={p.x - chartWidth / (dataPoints.length || 1) / 2}
              y={paddingY}
              width={chartWidth / (dataPoints.length || 1)}
              height={chartHeight}
              fill="transparent"
              onMouseEnter={() => setHoverIndex(idx)}
            />
          ))}

          {/* Hover Crosshair */}
          {hoveredPoint && (
            <g>
              <line
                x1={hoveredPoint.x}
                y1={paddingY}
                x2={hoveredPoint.x}
                y2={svgHeight - paddingY}
                stroke="#ecad0a"
                strokeDasharray="2,2"
                strokeWidth="1"
              />
              <circle
                cx={hoveredPoint.x}
                cy={hoveredPoint.y}
                r="4"
                fill="#ecad0a"
                stroke="#ffffff"
                strokeWidth="1.5"
              />
            </g>
          )}
        </svg>

        {hoveredPoint && (
          <div className="absolute top-2 left-12 bg-background/90 border border-accent-yellow rounded px-2.5 py-1 text-xs font-mono shadow-md pointer-events-none">
            <span className="text-terminal-muted">{hoveredPoint.label}: </span>
            <span className="text-white font-bold">${hoveredPoint.value.toFixed(2)}</span>
          </div>
        )}
      </div>
    </div>
  );
};
