import { BoardState } from '../types/kanban';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export const api = {
  async getBoard(): Promise<BoardState> {
    const res = await fetch(`${API_BASE}/board`);
    if (!res.ok) throw new Error('Failed to fetch board');
    return res.json();
  },

  async renameColumn(columnId: string, title: string): Promise<void> {
    const res = await fetch(`${API_BASE}/columns/${columnId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });
    if (!res.ok) throw new Error('Failed to rename column');
  },

  async addCard(title: string, details: string, columnId: string): Promise<{ id: string; title: string; details: string; createdAt: string }> {
    const res = await fetch(`${API_BASE}/cards`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, details, columnId }),
    });
    if (!res.ok) throw new Error('Failed to add card');
    return res.json();
  },

  async deleteCard(cardId: string): Promise<void> {
    const res = await fetch(`${API_BASE}/cards/${cardId}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete card');
  },

  async reorderBoard(
    cardId: string,
    sourceColumnId: string,
    destinationColumnId: string,
    sourceIndex: number,
    destinationIndex: number
  ): Promise<void> {
    const res = await fetch(`${API_BASE}/board/reorder`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cardId, sourceColumnId, destinationColumnId, sourceIndex, destinationIndex }),
    });
    if (!res.ok) throw new Error('Failed to reorder board');
  },
};
