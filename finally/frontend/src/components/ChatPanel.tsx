import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage, ChatTradeAction, ChatWatchlistAction } from '../types';
import {
  Bot,
  User,
  Send,
  Loader2,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  CheckCircle,
  AlertCircle,
  PlusCircle,
  MinusCircle,
} from 'lucide-react';

interface ChatPanelProps {
  messages: ChatMessage[];
  isLoading: boolean;
  onSendMessage: (message: string) => Promise<void>;
  isOpen: boolean;
  onToggleOpen: () => void;
}

export const ChatPanel: React.FC<ChatPanelProps> = ({
  messages,
  isLoading,
  onSendMessage,
  isOpen,
  onToggleOpen,
}) => {
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;
    const msg = inputMessage;
    setInputMessage('');
    await onSendMessage(msg);
  };

  const handleSuggestion = (promptText: string) => {
    setInputMessage(promptText);
  };

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={onToggleOpen}
        className="fixed bottom-6 right-6 bg-accent-purple hover:bg-purple-700 text-white rounded-full p-3.5 shadow-xl border border-purple-500/30 flex items-center space-x-2 font-mono text-xs z-40 transition-transform hover:scale-105"
        title="Open AI Copilot"
      >
        <Sparkles className="w-5 h-5 text-accent-yellow animate-pulse" />
        <span className="font-bold">AI COPILOT</span>
        <ChevronLeft className="w-4 h-4" />
      </button>
    );
  }

  return (
    <aside className="w-80 sm:w-96 bg-card border-l border-muted-border flex flex-col h-full select-none z-30 shadow-2xl">
      {/* Header */}
      <div className="bg-card-header px-4 py-3 border-b border-muted-border flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="p-1 rounded bg-accent-purple/20 text-accent-purple">
            <Bot className="w-4 h-4 text-purple-400" />
          </div>
          <div>
            <h2 className="font-mono font-bold text-sm text-white flex items-center gap-1.5">
              <span>FinAlly Assistant</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            </h2>
            <p className="text-[10px] font-mono text-terminal-muted">Powered by AI Agent Engine</p>
          </div>
        </div>

        <button
          type="button"
          onClick={onToggleOpen}
          className="p-1 rounded text-terminal-muted hover:text-white hover:bg-muted-border transition-colors"
          title="Collapse Panel"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-xs">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center text-terminal-muted space-y-3">
            <Bot className="w-10 h-10 text-accent-purple opacity-60" />
            <p className="font-bold text-white">How can I assist your portfolio today?</p>
            <p className="text-[11px] leading-relaxed max-w-[240px]">
              Ask me to analyze risks, execute buy/sell trades, or manage your watchlist.
            </p>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col space-y-2 ${
                msg.role === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div className="flex items-center space-x-1.5 text-[10px] text-terminal-muted">
                {msg.role === 'user' ? (
                  <>
                    <span>YOU</span>
                    <User className="w-3 h-3 text-accent-blue" />
                  </>
                ) : (
                  <>
                    <Bot className="w-3 h-3 text-accent-purple" />
                    <span>AI COPILOT</span>
                  </>
                )}
              </div>

              {/* Message Content Bubble */}
              <div
                className={`max-w-[85%] rounded-lg p-3 leading-relaxed whitespace-pre-wrap ${
                  msg.role === 'user'
                    ? 'bg-accent-blue/20 text-blue-100 border border-accent-blue/30 rounded-tr-none'
                    : 'bg-background text-terminal-text border border-muted-border rounded-tl-none'
                }`}
              >
                {msg.content}
              </div>

              {/* Render Action Confirmation Cards */}
              {msg.role === 'assistant' && msg.actions && (
                <div className="w-full space-y-2 pt-1">
                  {/* Trade Action Cards */}
                  {msg.actions.trades &&
                    msg.actions.trades.map((trade: ChatTradeAction, idx: number) => (
                      <div
                        key={idx}
                        className="bg-background/90 border border-emerald-800/60 rounded p-2.5 flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-terminal-green flex-shrink-0" />
                          <div>
                            <div className="font-bold text-white uppercase">
                              EXECUTED {trade.side}: {trade.quantity} {trade.ticker}
                            </div>
                            {trade.price && (
                              <div className="text-[10px] text-terminal-muted">
                                Fill Price: ${trade.price.toFixed(2)}
                              </div>
                            )}
                          </div>
                        </div>
                        <span className="text-[10px] bg-emerald-950 text-terminal-green px-1.5 py-0.5 rounded font-bold uppercase">
                          FILLED
                        </span>
                      </div>
                    ))}

                  {/* Watchlist Action Cards */}
                  {msg.actions.watchlist_changes &&
                    msg.actions.watchlist_changes.map((wl: ChatWatchlistAction, idx: number) => (
                      <div
                        key={idx}
                        className="bg-background/90 border border-accent-blue/50 rounded p-2.5 flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-2">
                          {wl.action === 'add' ? (
                            <PlusCircle className="w-4 h-4 text-accent-blue flex-shrink-0" />
                          ) : (
                            <MinusCircle className="w-4 h-4 text-terminal-red flex-shrink-0" />
                          )}
                          <div className="font-bold text-white uppercase">
                            WATCHLIST {wl.action.toUpperCase()}: {wl.ticker}
                          </div>
                        </div>
                        <span className="text-[10px] bg-blue-950 text-accent-blue px-1.5 py-0.5 rounded font-bold uppercase">
                          UPDATED
                        </span>
                      </div>
                    ))}
                </div>
              )}
            </div>
          ))
        )}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-center space-x-2 text-accent-purple text-xs font-mono bg-background p-3 rounded-lg border border-muted-border w-fit">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Analyzing market data & portfolio...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggestion Pills */}
      <div className="px-3 py-2 border-t border-muted-border bg-background/50 flex flex-wrap gap-1.5">
        <button
          type="button"
          onClick={() => handleSuggestion('Analyze my portfolio risk and P&L')}
          className="text-[10px] font-mono bg-card hover:bg-muted-border text-terminal-text border border-muted-border px-2 py-1 rounded transition-colors"
        >
          💡 Portfolio Risk Analysis
        </button>
        <button
          type="button"
          onClick={() => handleSuggestion('Buy 5 shares of NVDA')}
          className="text-[10px] font-mono bg-card hover:bg-muted-border text-terminal-text border border-muted-border px-2 py-1 rounded transition-colors"
        >
          📈 Buy 5 NVDA
        </button>
        <button
          type="button"
          onClick={() => handleSuggestion('Add AMD to my watchlist')}
          className="text-[10px] font-mono bg-card hover:bg-muted-border text-terminal-text border border-muted-border px-2 py-1 rounded transition-colors"
        >
          ➕ Add AMD to Watchlist
        </button>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="p-3 border-t border-muted-border bg-card flex gap-2">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Ask AI or execute command..."
          className="flex-1 bg-background border border-muted-border rounded px-3 py-2 text-xs font-mono text-white placeholder-terminal-muted focus:outline-none focus:border-accent-purple"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !inputMessage.trim()}
          className="bg-accent-purple hover:bg-purple-700 disabled:opacity-50 text-white px-3 py-2 rounded text-xs font-mono font-bold flex items-center justify-center transition-colors shadow-md shadow-purple-950/30"
          title="Send Message"
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        </button>
      </form>
    </aside>
  );
};
