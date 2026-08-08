'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { initialBoardData } from '../data/dummyData';
import { BoardState, Card } from '../types/kanban';
import { api } from '../services/api';
import { BoardAction } from '../services/aiChat';
import { Header } from './Header';
import { KanbanColumn } from './KanbanColumn';
import { AddCardModal } from './AddCardModal';
import { ChatWidget } from './ChatWidget';

export const KanbanBoard: React.FC = () => {
  const [board, setBoard] = useState<BoardState>(initialBoardData);
  const [activeModalColumnId, setActiveModalColumnId] = useState<string | null>(null);
  const [activeMobileColumnId, setActiveMobileColumnId] = useState<string>('col-1');
  const [isMounted, setIsMounted] = useState(false);
  const [useBackend, setUseBackend] = useState(false);

  // Attempt to load board from backend; fall back to local dummy data
  const loadBoard = useCallback(async () => {
    try {
      const data = await api.getBoard();
      setBoard(data);
      setUseBackend(true);
    } catch {
      setUseBackend(false);
    }
  }, []);

  useEffect(() => {
    setIsMounted(true);
    loadBoard();
  }, [loadBoard]);

  const totalCardsCount = Object.keys(board.cards).length;
  const totalColumnsCount = board.columnOrder.length;

  const scrollToColumn = (columnId: string) => {
    setActiveMobileColumnId(columnId);
    const element = document.getElementById(`column-${columnId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  // Handle Drag and Drop End
  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const startColumn = board.columns[source.droppableId];
    const finishColumn = board.columns[destination.droppableId];

    if (startColumn === finishColumn) {
      const newCardIds = Array.from(startColumn.cardIds);
      newCardIds.splice(source.index, 1);
      newCardIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...startColumn,
        cardIds: newCardIds,
      };

      setBoard((prev) => ({
        ...prev,
        columns: {
          ...prev.columns,
          [newColumn.id]: newColumn,
        },
      }));
    } else {
      const startCardIds = Array.from(startColumn.cardIds);
      startCardIds.splice(source.index, 1);
      const newStartColumn = {
        ...startColumn,
        cardIds: startCardIds,
      };

      const finishCardIds = Array.from(finishColumn.cardIds);
      finishCardIds.splice(destination.index, 0, draggableId);
      const newFinishColumn = {
        ...finishColumn,
        cardIds: finishCardIds,
      };

      setBoard((prev) => ({
        ...prev,
        columns: {
          ...prev.columns,
          [newStartColumn.id]: newStartColumn,
          [newFinishColumn.id]: newFinishColumn,
        },
      }));
    }

    if (useBackend) {
      api.reorderBoard(
        draggableId,
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index
      ).catch(() => {});
    }
  };

  // Handle column rename
  const handleRenameColumn = (columnId: string, newTitle: string) => {
    setBoard((prev) => ({
      ...prev,
      columns: {
        ...prev.columns,
        [columnId]: {
          ...prev.columns[columnId],
          title: newTitle,
        },
      },
    }));

    if (useBackend) {
      api.renameColumn(columnId, newTitle).catch(() => {});
    }
  };

  // Handle card addition
  const handleAddCard = async (title: string, details: string, targetColId?: string) => {
    const colId = targetColId || activeModalColumnId || 'col-1';

    if (useBackend) {
      try {
        const newCard = await api.addCard(title, details, colId);
        setBoard((prev) => {
          const targetColumn = prev.columns[colId];
          if (!targetColumn) return prev;
          return {
            ...prev,
            cards: {
              ...prev.cards,
              [newCard.id]: {
                id: newCard.id,
                title: newCard.title,
                details: newCard.details,
                createdAt: newCard.createdAt,
              },
            },
            columns: {
              ...prev.columns,
              [colId]: {
                ...targetColumn,
                cardIds: [...targetColumn.cardIds, newCard.id],
              },
            },
          };
        });
      } catch {
        addCardLocally(title, details, colId);
      }
    } else {
      addCardLocally(title, details, colId);
    }
  };

  const addCardLocally = (title: string, details: string, colId: string) => {
    const newCardId = `card-${Date.now()}`;
    const todayStr = new Date().toISOString().split('T')[0];
    const newCard: Card = { id: newCardId, title, details, createdAt: todayStr };

    setBoard((prev) => {
      const targetColumn = prev.columns[colId];
      if (!targetColumn) return prev;
      return {
        ...prev,
        cards: { ...prev.cards, [newCardId]: newCard },
        columns: {
          ...prev.columns,
          [colId]: {
            ...targetColumn,
            cardIds: [...targetColumn.cardIds, newCardId],
          },
        },
      };
    });
  };

  // Handle card deletion
  const handleDeleteCard = (cardId: string) => {
    setBoard((prev) => {
      const { [cardId]: deletedCard, ...remainingCards } = prev.cards;

      const updatedColumns = { ...prev.columns };
      Object.keys(updatedColumns).forEach((colId) => {
        updatedColumns[colId] = {
          ...updatedColumns[colId],
          cardIds: updatedColumns[colId].cardIds.filter((id) => id !== cardId),
        };
      });

      return { ...prev, cards: remainingCards, columns: updatedColumns };
    });

    if (useBackend) {
      api.deleteCard(cardId).catch(() => {});
    }
  };

  // Handle AI Chatbot Actions
  const handleExecuteAIAction = (action: BoardAction) => {
    const { type, payload } = action;

    // Helper to resolve card ID from ID or title
    const resolveCardId = (query?: string): string | null => {
      if (!query) return null;
      const q = String(query).toLowerCase().trim().replace(/^['"]|['"]$/g, '');
      if (board.cards[query]) return query;
      if (board.cards[q]) return q;

      // 1. Exact title match
      for (const id of Object.keys(board.cards)) {
        const card = board.cards[id];
        if (card.title.toLowerCase() === q) return id;
      }

      // 2. Exact ID match
      for (const id of Object.keys(board.cards)) {
        if (id.toLowerCase() === q) return id;
      }

      // 3. Substring title match
      let bestMatchId: string | null = null;
      let bestMatchLen = 0;
      for (const id of Object.keys(board.cards)) {
        const card = board.cards[id];
        const titleLower = card.title.toLowerCase();
        if (titleLower.includes(q) || q.includes(titleLower)) {
          if (titleLower.length > bestMatchLen) {
            bestMatchId = id;
            bestMatchLen = titleLower.length;
          }
        }
      }
      return bestMatchId;
    };

    // Helper to resolve column ID from ID or title
    const resolveColumnId = (query?: string): string | null => {
      if (!query) return null;
      const q = String(query).toLowerCase().trim().replace(/^['"]|['"]$/g, '');
      if (board.columns[query]) return query;
      if (board.columns[q]) return q;

      // 1. Exact title match
      for (const id of board.columnOrder) {
        const col = board.columns[id];
        if (col.title.toLowerCase() === q) return id;
      }

      // 2. Exact column ID match
      for (const id of board.columnOrder) {
        if (id.toLowerCase() === q) return id;
      }

      // 3. Substring match
      for (const id of board.columnOrder) {
        const col = board.columns[id];
        const titleLower = col.title.toLowerCase();
        if (titleLower.includes(q) || q.includes(titleLower)) {
          return id;
        }
      }
      return null;
    };

    switch (type) {
      case 'CREATE_CARD': {
        const title = payload.title || payload.cardTitle || payload.name || payload.cardName || 'New Task';
        const details = payload.details || payload.description || '';
        const colInput = payload.columnId || payload.column || payload.targetColumn || payload.targetColumnId || payload.columnName || 'col-1';
        const resolvedColId = resolveColumnId(colInput) || 'col-1';
        handleAddCard(title, details, resolvedColId);
        scrollToColumn(resolvedColId);
        break;
      }
      case 'DELETE_CARD': {
        const cardInput = payload.cardId || payload.cardName || payload.card || payload.id || payload.title;
        const resolvedCardId = resolveCardId(cardInput);
        if (resolvedCardId) {
          handleDeleteCard(resolvedCardId);
        }
        break;
      }
      case 'MOVE_CARD': {
        const cardInput = payload.cardId || payload.cardName || payload.card || payload.id || payload.card_id || payload.title;
        const colInput = payload.targetColumnId || payload.targetColumn || payload.columnId || payload.column || payload.target_column || payload.columnName || payload.to || payload.destination;

        const resolvedCardId = resolveCardId(cardInput);
        const resolvedColId = resolveColumnId(colInput);

        if (!resolvedCardId || !resolvedColId) break;

        // Find current column of card
        let currentColId: string | null = null;
        Object.keys(board.columns).forEach((colId) => {
          if (board.columns[colId].cardIds.includes(resolvedCardId)) {
            currentColId = colId;
          }
        });

        if (!currentColId || currentColId === resolvedColId) break;

        // Execute move
        const startCol = board.columns[currentColId];
        const finishCol = board.columns[resolvedColId];
        if (!startCol || !finishCol) break;

        const startCardIds = startCol.cardIds.filter((id) => id !== resolvedCardId);
        const finishCardIds = [...finishCol.cardIds, resolvedCardId];

        setBoard((prev) => ({
          ...prev,
          columns: {
            ...prev.columns,
            [currentColId!]: { ...startCol, cardIds: startCardIds },
            [resolvedColId]: { ...finishCol, cardIds: finishCardIds },
          },
        }));

        scrollToColumn(resolvedColId);

        if (useBackend) {
          api.reorderBoard(resolvedCardId, currentColId, resolvedColId, 0, finishCardIds.length - 1).catch(() => {});
        }
        break;
      }
      case 'RENAME_COLUMN': {
        const colInput = payload.columnId || payload.column || payload.columnName;
        const newTitle = payload.newTitle || payload.title || payload.name;
        const resolvedColId = resolveColumnId(colInput);

        if (resolvedColId && newTitle) {
          handleRenameColumn(resolvedColId, newTitle);
          scrollToColumn(resolvedColId);
        }
        break;
      }
    }
  };

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-[#f4f7fb] flex flex-col overflow-hidden">
        <Header totalCards={totalCardsCount} totalColumns={totalColumnsCount} />
        <main className="flex-1 p-4 flex justify-center items-center">
          <div className="text-sm font-semibold text-[#888888]">Loading board workspace...</div>
        </main>
      </div>
    );
  }

  const activeColumnTitle = activeModalColumnId
    ? board.columns[activeModalColumnId]?.title
    : '';

  return (
    <div className="min-h-screen bg-[#f4f7fb] flex flex-col max-w-full overflow-x-hidden relative">
      <Header totalCards={totalCardsCount} totalColumns={totalColumnsCount} />

      {/* Mobile Column Navigation Pills */}
      <div className="md:hidden bg-white border-b border-slate-200 px-3 py-2 overflow-x-auto flex space-x-2 scrollbar-none sticky top-16 z-20">
        {board.columnOrder.map((colId) => {
          const col = board.columns[colId];
          const isActive = activeMobileColumnId === colId;
          return (
            <button
              key={colId}
              type="button"
              onClick={() => scrollToColumn(colId)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                isActive
                  ? 'bg-[#032147] text-white shadow-xs'
                  : 'bg-slate-100 text-[#888888] hover:bg-slate-200'
              }`}
            >
              {col.title} ({col.cardIds.length})
            </button>
          );
        })}
      </div>

      <main className="flex-1 p-3 md:p-5 max-w-full overflow-hidden flex flex-col">
        <DragDropContext onDragEnd={handleDragEnd}>
          <div
            data-testid="kanban-board-grid"
            className="grid grid-cols-1 md:grid-cols-5 gap-3 md:gap-4 w-full flex-1 md:h-[calc(100vh-6.5rem)] overflow-hidden"
          >
            {board.columnOrder.map((columnId) => {
              const column = board.columns[columnId];
              const columnCards = column.cardIds
                .map((id) => board.cards[id])
                .filter(Boolean);

              return (
                <KanbanColumn
                  key={column.id}
                  column={column}
                  cards={columnCards}
                  onRenameColumn={handleRenameColumn}
                  onOpenAddCardModal={(colId) => setActiveModalColumnId(colId)}
                  onDeleteCard={handleDeleteCard}
                />
              );
            })}
          </div>
        </DragDropContext>

        <AddCardModal
          isOpen={!!activeModalColumnId}
          columnTitle={activeColumnTitle}
          onClose={() => setActiveModalColumnId(null)}
          onAddCard={(title, details) => handleAddCard(title, details, activeModalColumnId || undefined)}
        />
      </main>

      {/* AI Chatbot Assistant Widget at Bottom-Left */}
      <ChatWidget boardState={board} onExecuteAction={handleExecuteAIAction} />
    </div>
  );
};
