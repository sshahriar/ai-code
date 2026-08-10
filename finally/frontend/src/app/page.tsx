'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { usePrices } from '../hooks/usePrices';
import {
  fetchWatchlist,
  addWatchlistTicker,
  removeWatchlistTicker,
  fetchPortfolio,
  executeTrade,
  fetchPortfolioHistory,
  sendChatMessage,
  fetchChatHistory,
} from '../lib/api';
import { WatchlistItem, PortfolioSummary, PortfolioSnapshot, ChatMessage } from '../types';
import { Header } from '../components/Header';
import { Watchlist } from '../components/Watchlist';
import { MainChart } from '../components/MainChart';
import { PortfolioHeatmap } from '../components/PortfolioHeatmap';
import { PnLChart } from '../components/PnLChart';
import { PositionsTable } from '../components/PositionsTable';
import { TradeBar } from '../components/TradeBar';
import { ChatPanel } from '../components/ChatPanel';

export default function Home() {
  const { prices, sparklines, flashes, connectionStatus } = usePrices('/api/stream/prices');

  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [portfolio, setPortfolio] = useState<PortfolioSummary>({
    cash_balance: 10000.0,
    positions: [],
    total_value: 10000.0,
    unrealized_pnl: 0.0,
  });
  const [portfolioHistory, setPortfolioHistory] = useState<PortfolioSnapshot[]>([]);
  const [selectedTicker, setSelectedTicker] = useState<string | null>('AAPL');

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(true);

  // Load initial data
  const loadData = useCallback(async () => {
    try {
      const [wlData, portData, historyData, chatData] = await Promise.allSettled([
        fetchWatchlist(),
        fetchPortfolio(),
        fetchPortfolioHistory(),
        fetchChatHistory(),
      ]);

      if (wlData.status === 'fulfilled') {
        setWatchlist(wlData.value);
        if (wlData.value.length > 0 && !selectedTicker) {
          setSelectedTicker(wlData.value[0].ticker);
        }
      }

      if (portData.status === 'fulfilled') {
        setPortfolio(portData.value);
      }

      if (historyData.status === 'fulfilled') {
        setPortfolioHistory(historyData.value);
      }

      if (chatData.status === 'fulfilled' && chatData.value) {
        setChatMessages(chatData.value);
      }
    } catch (err) {
      console.error('Error initializing terminal data:', err);
    }
  }, [selectedTicker]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Compute live portfolio value based on live price cache
  const liveTotalPortfolioValue = useMemo(() => {
    if (!portfolio) return 10000.0;
    const positionsVal = portfolio.positions.reduce((acc, pos) => {
      const liveUpdate = prices[pos.ticker];
      const curPrice = liveUpdate ? liveUpdate.price : (pos.current_price ?? pos.avg_cost);
      return acc + pos.quantity * curPrice;
    }, 0);
    return portfolio.cash_balance + positionsVal;
  }, [portfolio, prices]);

  // Watchlist handlers
  const handleAddTicker = async (ticker: string) => {
    const newItem = await addWatchlistTicker(ticker);
    setWatchlist((prev) => {
      if (prev.some((i) => i.ticker === newItem.ticker)) return prev;
      return [...prev, newItem];
    });
    setSelectedTicker(newItem.ticker);
  };

  const handleRemoveTicker = async (ticker: string) => {
    await removeWatchlistTicker(ticker);
    setWatchlist((prev) => prev.filter((i) => i.ticker !== ticker));
    if (selectedTicker === ticker) {
      const remaining = watchlist.filter((i) => i.ticker !== ticker);
      setSelectedTicker(remaining.length > 0 ? remaining[0].ticker : null);
    }
  };

  // Trade handler
  const handleExecuteTrade = async (ticker: string, quantity: number, side: 'buy' | 'sell') => {
    await executeTrade(ticker, quantity, side);
    const [portData, historyData] = await Promise.all([
      fetchPortfolio(),
      fetchPortfolioHistory(),
    ]);
    setPortfolio(portData);
    setPortfolioHistory(historyData);
  };

  // Chat handler
  const handleSendChatMessage = async (userMessage: string) => {
    const tempUserMsg: ChatMessage = {
      id: `temp-${Date.now()}`,
      role: 'user',
      content: userMessage,
      created_at: new Date().toISOString(),
    };

    setChatMessages((prev) => [...prev, tempUserMsg]);
    setIsChatLoading(true);

    try {
      const response = await sendChatMessage(userMessage);

      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: response.message,
        actions: {
          trades: response.trades,
          watchlist_changes: response.watchlist_changes,
        },
        created_at: new Date().toISOString(),
      };

      setChatMessages((prev) => [...prev, assistantMsg]);

      // If AI executed trades or watchlist changes, refresh data
      if (
        (response.trades && response.trades.length > 0) ||
        (response.watchlist_changes && response.watchlist_changes.length > 0)
      ) {
        const [portData, historyData, wlData] = await Promise.all([
          fetchPortfolio(),
          fetchPortfolioHistory(),
          fetchWatchlist(),
        ]);
        setPortfolio(portData);
        setPortfolioHistory(historyData);
        setWatchlist(wlData);
      }
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: `Error communicating with AI assistant: ${err.message || 'Unknown error'}`,
        created_at: new Date().toISOString(),
      };
      setChatMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsChatLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      {/* Top Header */}
      <Header
        totalValue={liveTotalPortfolioValue}
        cashBalance={portfolio.cash_balance}
        connectionStatus={connectionStatus}
        onRefresh={loadData}
      />

      {/* Main Terminal Workspace */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Left Column / Main Dashboard Grid */}
        <div className="flex-1 p-3 overflow-y-auto space-y-3">
          {/* Row 1: Watchlist (Left) & Main Chart (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 h-auto lg:h-[340px]">
            <div className="lg:col-span-4 h-[340px] lg:h-full">
              <Watchlist
                items={watchlist}
                prices={prices}
                sparklines={sparklines}
                flashes={flashes}
                selectedTicker={selectedTicker}
                onSelectTicker={setSelectedTicker}
                onAddTicker={handleAddTicker}
                onRemoveTicker={handleRemoveTicker}
              />
            </div>

            <div className="lg:col-span-8 h-[340px] lg:h-full">
              <MainChart
                ticker={selectedTicker}
                priceUpdate={selectedTicker ? prices[selectedTicker] || null : null}
                history={selectedTicker ? sparklines[selectedTicker] || [] : []}
              />
            </div>
          </div>

          {/* Row 2: Portfolio Heatmap (Left) & PnL History Chart (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 h-auto lg:h-[260px]">
            <div className="lg:col-span-6 h-[260px] lg:h-full">
              <PortfolioHeatmap
                positions={portfolio.positions}
                prices={prices}
                onSelectTicker={setSelectedTicker}
              />
            </div>

            <div className="lg:col-span-6 h-[260px] lg:h-full">
              <PnLChart
                history={portfolioHistory}
                currentTotalValue={liveTotalPortfolioValue}
              />
            </div>
          </div>

          {/* Row 3: Positions Table */}
          <div className="min-h-[220px]">
            <PositionsTable
              positions={portfolio.positions}
              prices={prices}
              selectedTicker={selectedTicker}
              onSelectTicker={setSelectedTicker}
            />
          </div>

          {/* Row 4: Trade Order Bar */}
          <div>
            <TradeBar
              selectedTicker={selectedTicker}
              prices={prices}
              cashBalance={portfolio.cash_balance}
              positions={portfolio.positions}
              onExecuteTrade={handleExecuteTrade}
            />
          </div>
        </div>

        {/* Right Column: AI Chat Panel (Docked/Collapsible) */}
        <ChatPanel
          messages={chatMessages}
          isLoading={isChatLoading}
          onSendMessage={handleSendChatMessage}
          isOpen={isChatOpen}
          onToggleOpen={() => setIsChatOpen((prev) => !prev)}
        />
      </div>
    </div>
  );
}
