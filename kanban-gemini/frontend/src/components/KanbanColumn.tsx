'use client';

import React, { useState } from 'react';
import { Droppable } from '@hello-pangea/dnd';
import { Plus, Edit2, Check } from 'lucide-react';
import { Column, Card } from '../types/kanban';
import { KanbanCard } from './KanbanCard';

interface KanbanColumnProps {
  column: Column;
  cards: Card[];
  onRenameColumn: (columnId: string, newTitle: string) => void;
  onOpenAddCardModal: (columnId: string) => void;
  onDeleteCard: (cardId: string) => void;
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({
  column,
  cards,
  onRenameColumn,
  onOpenAddCardModal,
  onDeleteCard,
}) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleInput, setTitleInput] = useState(column.title);

  const handleTitleSubmit = () => {
    const trimmed = titleInput.trim();
    if (trimmed && trimmed !== column.title) {
      onRenameColumn(column.id, trimmed);
    } else {
      setTitleInput(column.title);
    }
    setIsEditingTitle(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleTitleSubmit();
    } else if (e.key === 'Escape') {
      setTitleInput(column.title);
      setIsEditingTitle(false);
    }
  };

  return (
    <div
      data-testid="kanban-column"
      data-column-id={column.id}
      id={`column-${column.id}`}
      className="bg-[#ebf0f7] rounded-xl flex flex-col max-h-full border border-slate-200 shadow-xs w-full lg:flex-1 lg:w-auto min-w-0 shrink-0 lg:shrink flex-1 overflow-hidden"
    >
      {/* Column Header */}
      <div className="p-3 bg-white/80 backdrop-blur-xs border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center space-x-1.5 flex-1 min-w-0 pr-1">
          {isEditingTitle ? (
            <div className="flex items-center space-x-1 w-full">
              <input
                type="text"
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
                onBlur={handleTitleSubmit}
                onKeyDown={handleKeyDown}
                data-testid={`column-rename-input-${column.id}`}
                className="w-full text-xs font-bold text-[#032147] bg-white px-1.5 py-0.5 rounded border border-[#209dd7] focus:outline-none"
                autoFocus
              />
              <button
                type="button"
                onClick={handleTitleSubmit}
                className="text-[#209dd7] p-0.5 rounded hover:bg-slate-100"
              >
                <Check className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div
              className="flex items-center space-x-1.5 group cursor-pointer w-full"
              onClick={() => setIsEditingTitle(true)}
              data-testid={`column-title-container-${column.id}`}
            >
              <h2
                data-testid={`column-title-${column.id}`}
                className="font-bold text-xs xl:text-sm text-[#032147] truncate group-hover:text-[#209dd7] transition-colors"
                title="Click to rename"
              >
                {column.title}
              </h2>
              <Edit2 className="w-3 h-3 text-[#888888] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
            </div>
          )}
        </div>

        <div className="flex items-center space-x-1.5 shrink-0">
          <span className="text-[11px] font-semibold px-1.5 py-0.5 rounded-full bg-[#209dd7]/15 text-[#209dd7]">
            {cards.length}
          </span>
          <button
            type="button"
            onClick={() => onOpenAddCardModal(column.id)}
            data-testid={`add-card-btn-${column.id}`}
            title="Add card to column"
            className="p-1 rounded-lg bg-slate-100 hover:bg-[#753991] hover:text-white text-[#032147] transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Droppable Card Area */}
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`p-2.5 flex-1 overflow-y-auto min-h-[200px] sm:min-h-[250px] transition-colors ${
              snapshot.isDraggingOver ? 'bg-blue-50/50' : ''
            }`}
          >
            {cards.map((card, index) => (
              <KanbanCard
                key={card.id}
                card={card}
                index={index}
                onDeleteCard={onDeleteCard}
              />
            ))}
            {provided.placeholder}

            {cards.length === 0 && !snapshot.isDraggingOver && (
              <div className="h-28 flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-lg text-[#888888] text-xs p-3 text-center">
                <span>No cards</span>
                <button
                  type="button"
                  onClick={() => onOpenAddCardModal(column.id)}
                  className="mt-1.5 text-xs font-semibold text-[#209dd7] hover:underline"
                >
                  + Add card
                </button>
              </div>
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
};
