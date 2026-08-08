'use client';

import React from 'react';
import { LayoutGrid, Layers } from 'lucide-react';

interface HeaderProps {
  totalCards: number;
  totalColumns: number;
}

export const Header: React.FC<HeaderProps> = ({ totalCards, totalColumns }) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        {/* Title and Branding */}
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#032147] flex items-center justify-center text-white shadow-sm border-b-2 border-[#ecad0a] shrink-0">
            <LayoutGrid className="w-4 h-4 sm:w-5 sm:h-5 text-[#ecad0a]" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-[#032147] leading-tight tracking-tight">
              Kanban Project Manager
            </h1>
            <p className="text-[11px] sm:text-xs text-[#888888]">Single Board Project Workspace</p>
          </div>
        </div>

        {/* Board Stats */}
        <div className="flex items-center space-x-3 self-stretch sm:self-auto justify-between sm:justify-start">
          <div className="flex items-center space-x-1.5 bg-slate-50 border border-slate-200 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg text-xs text-[#032147] font-medium">
            <Layers className="w-3.5 h-3.5 text-[#209dd7]" />
            <span>{totalColumns} Columns</span>
          </div>

          <div className="flex items-center space-x-1.5 bg-slate-50 border border-slate-200 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg text-xs text-[#032147] font-medium">
            <span className="w-2 h-2 rounded-full bg-[#ecad0a] inline-block"></span>
            <span>{totalCards} Total Cards</span>
          </div>
        </div>
      </div>
    </header>
  );
};
