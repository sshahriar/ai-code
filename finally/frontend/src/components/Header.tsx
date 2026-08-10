import React from 'react';
import { ConnectionStatus } from '../types';
import { Activity, DollarSign, Wallet, RefreshCw, Cpu } from 'lucide-react';

interface HeaderProps {
  totalValue: number;
  cashBalance: number;
  connectionStatus: ConnectionStatus;
  onRefresh?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  totalValue,
  cashBalance,
  connectionStatus,
  onRefresh,
}) => {
  const getStatusColor = (status: ConnectionStatus) => {
    switch (status) {
      case 'connected':
        return 'bg-emerald-500 shadow-emerald-500/50';
      case 'reconnecting':
        return 'bg-amber-500 shadow-amber-500/50 animate-pulse';
      case 'disconnected':
      default:
        return 'bg-rose-500 shadow-rose-500/50';
    }
  };

  const getStatusText = (status: ConnectionStatus) => {
    switch (status) {
      case 'connected':
        return 'LIVE STREAM';
      case 'reconnecting':
        return 'RECONNECTING';
      case 'disconnected':
        return 'OFFLINE';
    }
  };

  return (
    <header className="bg-card border-b border-muted-border px-4 py-3 flex flex-wrap items-center justify-between gap-4 select-none">
      {/* Brand / Title */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center justify-center w-9 h-9 rounded bg-gradient-to-br from-accent-yellow to-amber-600 text-black font-bold text-lg shadow-md shadow-amber-500/10">
          <Cpu className="w-5 h-5 text-slate-950" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <span className="font-bold text-lg tracking-wider text-white font-mono">
              Fin<span className="text-accent-yellow">Ally</span>
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted-border text-terminal-muted font-mono uppercase tracking-widest">
              v1.0 TERMINAL
            </span>
          </div>
          <p className="text-xs text-terminal-muted hidden sm:block">AI Trading Workstation</p>
        </div>
      </div>

      {/* Metrics Center */}
      <div className="flex items-center gap-6">
        {/* Total Value */}
        <div className="flex flex-col">
          <div className="flex items-center space-x-1 text-terminal-muted text-xs font-mono uppercase">
            <Wallet className="w-3.5 h-3.5 text-accent-blue" />
            <span>Portfolio Value</span>
          </div>
          <div className="text-xl font-bold font-mono text-white tracking-tight">
            ${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </div>

        {/* Cash Balance */}
        <div className="flex flex-col border-l border-muted-border pl-6">
          <div className="flex items-center space-x-1 text-terminal-muted text-xs font-mono uppercase">
            <DollarSign className="w-3.5 h-3.5 text-accent-yellow" />
            <span>Available Cash</span>
          </div>
          <div className="text-xl font-bold font-mono text-accent-yellow tracking-tight">
            ${cashBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </div>
      </div>

      {/* Status & Controls */}
      <div className="flex items-center space-x-4">
        {/* Connection Status Indicator */}
        <div
          className="flex items-center space-x-2 bg-background px-3 py-1.5 rounded-full border border-muted-border"
          data-testid="connection-status-container"
        >
          <span
            className={`w-2.5 h-2.5 rounded-full shadow-sm ${getStatusColor(connectionStatus)}`}
            data-testid="connection-status-dot"
          />
          <span
            className="text-xs font-mono font-medium tracking-wide text-terminal-text"
            data-testid="connection-status-text"
          >
            {getStatusText(connectionStatus)}
          </span>
        </div>

        {/* Manual Refresh Button */}
        {onRefresh && (
          <button
            onClick={onRefresh}
            className="p-1.5 rounded bg-background hover:bg-muted-border text-terminal-muted hover:text-white transition-colors"
            title="Refresh Data"
            aria-label="Refresh Data"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        )}
      </div>
    </header>
  );
};
