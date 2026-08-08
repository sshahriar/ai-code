import { BoardState } from '../types/kanban';

export const initialBoardData: BoardState = {
  cards: {
    'card-1': {
      id: 'card-1',
      title: 'Design System Guidelines',
      details: 'Establish brand color tokens, typography scales, and component spacing guidelines for the application.',
      createdAt: '2026-08-01',
    },
    'card-2': {
      id: 'card-2',
      title: 'Database Schema Audit',
      details: 'Review indexed columns, foreign key constraints, and query response latencies for performance optimization.',
      createdAt: '2026-08-01',
    },
    'card-3': {
      id: 'card-3',
      title: 'Authentication Middleware',
      details: 'Implement JWT token validation, refresh token handling, and route protection handlers.',
      createdAt: '2026-08-01',
    },
    'card-4': {
      id: 'card-4',
      title: 'Kanban Drag and Drop Interface',
      details: 'Build column drag targets, drop indicators, and card reordering state updates using fluid animations.',
      createdAt: '2026-08-02',
    },
    'card-5': {
      id: 'card-5',
      title: 'API Integration & Error Boundaries',
      details: 'Connect frontend data models with backend REST endpoints and set up global error handling components.',
      createdAt: '2026-08-02',
    },
    'card-6': {
      id: 'card-6',
      title: 'User Onboarding Flow',
      details: 'Draft step-by-step walkthrough modals for new users setting up their workspace project parameters.',
      createdAt: '2026-08-02',
    },
    'card-7': {
      id: 'card-7',
      title: 'Responsive Grid Testing',
      details: 'Validate board responsive container layouts across tablet, desktop, and ultra-wide viewports.',
      createdAt: '2026-08-02',
    },
    'card-8': {
      id: 'card-8',
      title: 'Performance Benchmark Analysis',
      details: 'Measure Lighthouse score metrics, bundle sizes, and initial server render times.',
      createdAt: '2026-08-02',
    },
  },
  columns: {
    'col-1': {
      id: 'col-1',
      title: 'Backlog',
      cardIds: ['card-1', 'card-2'],
    },
    'col-2': {
      id: 'col-2',
      title: 'To Do',
      cardIds: ['card-3'],
    },
    'col-3': {
      id: 'col-3',
      title: 'In Progress',
      cardIds: ['card-4', 'card-5'],
    },
    'col-4': {
      id: 'col-4',
      title: 'In Review',
      cardIds: ['card-6'],
    },
    'col-5': {
      id: 'col-5',
      title: 'Done',
      cardIds: ['card-7', 'card-8'],
    },
  },
  columnOrder: ['col-1', 'col-2', 'col-3', 'col-4', 'col-5'],
};
