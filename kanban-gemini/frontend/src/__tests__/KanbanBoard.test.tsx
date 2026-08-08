import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { KanbanBoard } from '../components/KanbanBoard';

// Mock API service for isolated unit testing
vi.mock('../services/api', () => ({
  api: {
    getBoard: vi.fn().mockImplementation(() =>
      Promise.resolve({
        cards: {
          'card-1': {
            id: 'card-1',
            title: 'Design System Guidelines',
            details: 'Establish brand color tokens.',
            createdAt: '2026-08-01',
          },
          'card-2': {
            id: 'card-2',
            title: 'Database Schema Audit',
            details: 'Review indexed columns.',
            createdAt: '2026-08-01',
          },
          'card-3': {
            id: 'card-3',
            title: 'Authentication Middleware',
            details: 'Implement JWT token validation.',
            createdAt: '2026-08-01',
          },
          'card-4': {
            id: 'card-4',
            title: 'Kanban Drag and Drop Interface',
            details: 'Build column drag targets.',
            createdAt: '2026-08-02',
          },
        },
        columns: {
          'col-1': { id: 'col-1', title: 'Backlog', cardIds: ['card-1', 'card-2'] },
          'col-2': { id: 'col-2', title: 'To Do', cardIds: ['card-3'] },
          'col-3': { id: 'col-3', title: 'In Progress', cardIds: ['card-4'] },
          'col-4': { id: 'col-4', title: 'In Review', cardIds: [] },
          'col-5': { id: 'col-5', title: 'Done', cardIds: [] },
        },
        columnOrder: ['col-1', 'col-2', 'col-3', 'col-4', 'col-5'],
      })
    ),
    renameColumn: vi.fn().mockResolvedValue(undefined),
    addCard: vi.fn().mockImplementation((title, details) =>
      Promise.resolve({
        id: `card-mock-${Date.now()}`,
        title,
        details,
        createdAt: '2026-08-02',
      })
    ),
    deleteCard: vi.fn().mockResolvedValue(undefined),
    reorderBoard: vi.fn().mockResolvedValue(undefined),
  },
}));

describe('KanbanBoard Unit Tests', () => {
  beforeEach(() => {
    render(<KanbanBoard />);
  });

  it('renders header and 5 fixed default columns', async () => {
    await waitFor(() => {
      expect(screen.getByText('Kanban Project Manager')).toBeInTheDocument();
    });

    expect(screen.getByText('Backlog')).toBeInTheDocument();
    expect(screen.getByText('To Do')).toBeInTheDocument();
    expect(screen.getByText('In Progress')).toBeInTheDocument();
    expect(screen.getByText('In Review')).toBeInTheDocument();
    expect(screen.getByText('Done')).toBeInTheDocument();
  });

  it('renders initial dummy cards', async () => {
    await waitFor(() => {
      expect(screen.getByText('Design System Guidelines')).toBeInTheDocument();
    });

    expect(screen.getByText('Database Schema Audit')).toBeInTheDocument();
    expect(screen.getByText('Authentication Middleware')).toBeInTheDocument();
    expect(screen.getByText('Kanban Drag and Drop Interface')).toBeInTheDocument();
  });

  it('allows inline renaming of a column', async () => {
    await waitFor(() => {
      expect(screen.getByText('Backlog')).toBeInTheDocument();
    });

    const backlogHeader = screen.getByTestId('column-title-col-1');
    fireEvent.click(backlogHeader);

    const input = screen.getByTestId('column-rename-input-col-1');
    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'Product Backlog' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(screen.getByText('Product Backlog')).toBeInTheDocument();
    expect(screen.queryByText('Backlog')).not.toBeInTheDocument();
  });

  it('adds a new card to a column', async () => {
    await waitFor(() => {
      expect(screen.getByTestId('add-card-btn-col-1')).toBeInTheDocument();
    });

    const addBtn = screen.getByTestId('add-card-btn-col-1');
    fireEvent.click(addBtn);

    const titleInput = screen.getByTestId('card-title-input');
    const detailsInput = screen.getByTestId('card-details-input');
    const submitBtn = screen.getByTestId('submit-card-btn');

    fireEvent.change(titleInput, { target: { value: 'New Test Feature Card' } });
    fireEvent.change(detailsInput, { target: { value: 'Detailed testing requirements' } });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText('New Test Feature Card')).toBeInTheDocument();
      expect(screen.getByText('Detailed testing requirements')).toBeInTheDocument();
    });
  });

  it('deletes an existing card', async () => {
    await waitFor(() => {
      expect(screen.getByText('Design System Guidelines')).toBeInTheDocument();
    });

    const deleteBtn = screen.getByTestId('delete-card-card-1');
    fireEvent.click(deleteBtn);

    await waitFor(() => {
      expect(screen.queryByText('Design System Guidelines')).not.toBeInTheDocument();
    });
  });
});
