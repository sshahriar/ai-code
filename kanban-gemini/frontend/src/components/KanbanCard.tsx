'use client';

import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { Trash2, Tag } from 'lucide-react';
import { Card } from '../types/kanban';

interface KanbanCardProps {
  card: Card;
  index: number;
  onDeleteCard: (cardId: string) => void;
}

export const KanbanCard: React.FC<KanbanCardProps> = ({ card, index, onDeleteCard }) => {
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          data-testid="kanban-card"
          data-card-id={card.id}
          className={`kanban-card bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs mb-3 group relative cursor-grab active:cursor-grabbing select-none ${
            snapshot.isDragging ? 'is-dragging z-50' : ''
          }`}
        >
          {/* Card Header Top Row: ID Badge & Delete Button */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="inline-flex items-center space-x-1 text-[10px] font-mono font-bold bg-[#209dd7]/10 text-[#209dd7] px-2 py-0.5 rounded border border-[#209dd7]/20">
              <Tag className="w-2.5 h-2.5" />
              <span>{card.id}</span>
            </span>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteCard(card.id);
              }}
              data-testid={`delete-card-${card.id}`}
              title={`Delete card ${card.id}`}
              className="text-slate-400 hover:text-red-500 p-1 rounded hover:bg-slate-100 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 shrink-0"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card Title */}
          <h3 className="font-semibold text-sm text-[#032147] group-hover:text-[#209dd7] transition-colors leading-snug break-words">
            {card.title}
          </h3>

          {/* Card Details */}
          {card.details && (
            <p className="text-xs text-[#888888] mt-2 leading-relaxed break-words whitespace-pre-wrap">
              {card.details}
            </p>
          )}

          {/* Card Footer */}
          {card.createdAt && (
            <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-end text-[10px] text-[#888888]">
              <span>{card.createdAt}</span>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};
