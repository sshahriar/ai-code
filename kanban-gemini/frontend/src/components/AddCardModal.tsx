'use client';

import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

interface AddCardModalProps {
  isOpen: boolean;
  columnTitle: string;
  onClose: () => void;
  onAddCard: (title: string, details: string) => void;
}

export const AddCardModal: React.FC<AddCardModalProps> = ({
  isOpen,
  columnTitle,
  onClose,
  onAddCard,
}) => {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAddCard(title.trim(), details.trim());
    setTitle('');
    setDetails('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
      <div
        className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-150"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-[#032147]">Add New Card</h2>
            <p className="text-xs text-[#888888]">Adding to column: <span className="font-semibold text-[#209dd7]">{columnTitle}</span></p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#032147] mb-1.5">
              Card Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Implement user login API"
              data-testid="card-title-input"
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#209dd7] focus:border-[#209dd7] outline-none transition-all placeholder:text-slate-400"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#032147] mb-1.5">
              Details / Description
            </label>
            <textarea
              rows={3}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Provide relevant task specifications or notes..."
              data-testid="card-details-input"
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#209dd7] focus:border-[#209dd7] outline-none transition-all placeholder:text-slate-400 resize-none"
            />
          </div>

          <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              data-testid="submit-card-btn"
              className="px-4 py-2 text-xs font-semibold bg-[#753991] hover:bg-[#622e7a] text-white rounded-lg shadow-xs hover:shadow-md transition-all flex items-center space-x-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Card</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
