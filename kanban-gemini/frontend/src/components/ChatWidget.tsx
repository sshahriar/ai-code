'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, CornerDownLeft, ChevronDown } from 'lucide-react';
import { ChatMessage, BoardAction, processChatMessage } from '../services/aiChat';
import { BoardState } from '../types/kanban';

interface ChatWidgetProps {
  boardState: BoardState;
  onExecuteAction: (action: BoardAction) => void;
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({ boardState, onExecuteAction }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'assistant',
      text: 'Hello. I am your AI Board Assistant. How can I help you manage your tasks today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isLoading) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: timeStr,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsLoading(true);

    try {
      const response = await processChatMessage(text, boardState);
      const assistantMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionTaken: response.action?.type,
      };

      setMessages((prev) => [...prev, assistantMsg]);

      // Execute board action if present
      if (response.action) {
        onExecuteAction(response.action);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'assistant',
          text: 'Encountered an issue processing the command. Please try again.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestionChips = [
    'Add card in Backlog titled Fix Mobile Nav',
    'Move card-1 to Done',
    'Delete card-2',
  ];

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end select-none">
      {/* Expanded Chat Window */}
      {isOpen && (
        <div className="w-[88vw] sm:w-80 md:w-96 h-[440px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden mb-3 animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Chat Window Header */}
          <div className="bg-[#032147] px-4 py-3 text-white flex items-center justify-between border-b border-[#209dd7]/30">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#209dd7]/20 flex items-center justify-center border border-[#209dd7]/40 text-[#ecad0a]">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-xs leading-snug flex items-center space-x-1.5">
                  <span>AI Board Assistant</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ecad0a]"></span>
                </h3>
                <p className="text-[10px] text-slate-300">OpenRouter Powered</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-[#f4f7fb]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs shadow-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#753991] text-white rounded-br-none'
                      : 'bg-white text-[#032147] border border-slate-200 rounded-bl-none'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>

                  {msg.actionTaken && (
                    <div className="mt-1.5 pt-1 border-t border-slate-100 flex items-center space-x-1 text-[10px] text-[#209dd7] font-semibold">
                      <Sparkles className="w-3 h-3 text-[#ecad0a]" />
                      <span>Action Executed: {msg.actionTaken}</span>
                    </div>
                  )}
                </div>
                <span className="text-[9px] text-[#888888] mt-1 px-1">{msg.timestamp}</span>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center space-x-2 bg-white border border-slate-200 px-3 py-2 rounded-2xl rounded-bl-none w-fit text-xs text-[#888888]">
                <div className="w-2 h-2 rounded-full bg-[#209dd7] animate-ping" />
                <span>AI processing board action...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Chips */}
          <div className="px-3 py-2 bg-slate-50 border-t border-slate-200 overflow-x-auto flex space-x-1.5 scrollbar-none shrink-0">
            {suggestionChips.map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(chip)}
                disabled={isLoading}
                className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-white text-[#032147] border border-slate-200 hover:border-[#209dd7] hover:text-[#209dd7] transition-colors whitespace-nowrap shrink-0 shadow-2xs disabled:opacity-50"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-2.5 bg-white border-t border-slate-200 flex items-center space-x-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask AI to create, delete or move tasks..."
              data-testid="chat-input"
              className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#209dd7] focus:border-[#209dd7] outline-none transition-all placeholder:text-slate-400"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              data-testid="chat-send-btn"
              className="p-2 bg-[#753991] hover:bg-[#622e7a] text-white rounded-xl shadow-xs transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Toggle Button (Bottom-Left) */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        data-testid="chat-toggle-btn"
        title="Toggle AI Board Assistant"
        className="w-12 h-12 rounded-full bg-[#032147] hover:bg-[#0a3366] text-white shadow-xl flex items-center justify-center border-2 border-[#209dd7] transition-transform hover:scale-105 active:scale-95 group relative"
      >
        <div className="relative">
          {isOpen ? (
            <X className="w-5 h-5 text-white" />
          ) : (
            <Bot className="w-5 h-5 text-[#ecad0a] group-hover:rotate-12 transition-transform" />
          )}
        </div>
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#ecad0a] border-2 border-white rounded-full"></span>
      </button>
    </div>
  );
};
