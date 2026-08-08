import initSqlJs, { Database } from 'sql.js';
import path from 'path';
import fs from 'fs';

const DB_PATH = process.env.DB_PATH || path.join(__dirname, '..', 'data', 'kanban.db');

let db: Database;

export async function getDb(): Promise<Database> {
  if (db) return db;

  const dataDir = path.dirname(DB_PATH);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const SQL = await initSqlJs();

  // Load existing database or create new one
  if (fs.existsSync(DB_PATH)) {
    const buffer = fs.readFileSync(DB_PATH);
    db = new SQL.Database(buffer);
  } else {
    db = new SQL.Database();
  }

  // Create tables
  db.run(`
    CREATE TABLE IF NOT EXISTS columns (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      position INTEGER NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS cards (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      details TEXT NOT NULL DEFAULT '',
      column_id TEXT NOT NULL,
      position INTEGER NOT NULL,
      created_at TEXT NOT NULL,
      FOREIGN KEY (column_id) REFERENCES columns(id)
    )
  `);

  // Seed initial data if empty
  const result = db.exec('SELECT COUNT(*) as count FROM columns');
  const count = result[0]?.values[0]?.[0] as number;

  if (count === 0) {
    db.run('INSERT INTO columns (id, title, position) VALUES (?, ?, ?)', ['col-1', 'Backlog', 0]);
    db.run('INSERT INTO columns (id, title, position) VALUES (?, ?, ?)', ['col-2', 'To Do', 1]);
    db.run('INSERT INTO columns (id, title, position) VALUES (?, ?, ?)', ['col-3', 'In Progress', 2]);
    db.run('INSERT INTO columns (id, title, position) VALUES (?, ?, ?)', ['col-4', 'In Review', 3]);
    db.run('INSERT INTO columns (id, title, position) VALUES (?, ?, ?)', ['col-5', 'Done', 4]);

    const insertCard = 'INSERT INTO cards (id, title, details, column_id, position, created_at) VALUES (?, ?, ?, ?, ?, ?)';
    db.run(insertCard, ['card-1', 'Design System Guidelines', 'Establish brand color tokens, typography scales, and component spacing guidelines for the application.', 'col-1', 0, '2026-08-01']);
    db.run(insertCard, ['card-2', 'Database Schema Audit', 'Review indexed columns, foreign key constraints, and query response latencies for performance optimization.', 'col-1', 1, '2026-08-01']);
    db.run(insertCard, ['card-3', 'Authentication Middleware', 'Implement JWT token validation, refresh token handling, and route protection handlers.', 'col-2', 0, '2026-08-01']);
    db.run(insertCard, ['card-4', 'Kanban Drag and Drop Interface', 'Build column drag targets, drop indicators, and card reordering state updates using fluid animations.', 'col-3', 0, '2026-08-02']);
    db.run(insertCard, ['card-5', 'API Integration & Error Boundaries', 'Connect frontend data models with backend REST endpoints and set up global error handling components.', 'col-3', 1, '2026-08-02']);
    db.run(insertCard, ['card-6', 'User Onboarding Flow', 'Draft step-by-step walkthrough modals for new users setting up their workspace project parameters.', 'col-4', 0, '2026-08-02']);
    db.run(insertCard, ['card-7', 'Responsive Grid Testing', 'Validate board responsive container layouts across tablet, desktop, and ultra-wide viewports.', 'col-5', 0, '2026-08-02']);
    db.run(insertCard, ['card-8', 'Performance Benchmark Analysis', 'Measure Lighthouse score metrics, bundle sizes, and initial server render times.', 'col-5', 1, '2026-08-02']);

    saveDb();
  }

  return db;
}

export function saveDb(): void {
  if (!db) return;
  const data = db.export();
  const buffer = Buffer.from(data);
  const dataDir = path.dirname(DB_PATH);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  fs.writeFileSync(DB_PATH, buffer);
}

export async function resetDb(): Promise<void> {
  const database = await getDb();
  database.run('DELETE FROM cards');
  database.run('DELETE FROM columns');

  database.run('INSERT INTO columns (id, title, position) VALUES (?, ?, ?)', ['col-1', 'Backlog', 0]);
  database.run('INSERT INTO columns (id, title, position) VALUES (?, ?, ?)', ['col-2', 'To Do', 1]);
  database.run('INSERT INTO columns (id, title, position) VALUES (?, ?, ?)', ['col-3', 'In Progress', 2]);
  database.run('INSERT INTO columns (id, title, position) VALUES (?, ?, ?)', ['col-4', 'In Review', 3]);
  database.run('INSERT INTO columns (id, title, position) VALUES (?, ?, ?)', ['col-5', 'Done', 4]);

  const insertCard = 'INSERT INTO cards (id, title, details, column_id, position, created_at) VALUES (?, ?, ?, ?, ?, ?)';
  database.run(insertCard, ['card-1', 'Design System Guidelines', 'Establish brand color tokens, typography scales, and component spacing guidelines for the application.', 'col-1', 0, '2026-08-01']);
  database.run(insertCard, ['card-2', 'Database Schema Audit', 'Review indexed columns, foreign key constraints, and query response latencies for performance optimization.', 'col-1', 1, '2026-08-01']);
  database.run(insertCard, ['card-3', 'Authentication Middleware', 'Implement JWT token validation, refresh token handling, and route protection handlers.', 'col-2', 0, '2026-08-01']);
  database.run(insertCard, ['card-4', 'Kanban Drag and Drop Interface', 'Build column drag targets, drop indicators, and card reordering state updates using fluid animations.', 'col-3', 0, '2026-08-02']);
  database.run(insertCard, ['card-5', 'API Integration & Error Boundaries', 'Connect frontend data models with backend REST endpoints and set up global error handling components.', 'col-3', 1, '2026-08-02']);
  database.run(insertCard, ['card-6', 'User Onboarding Flow', 'Draft step-by-step walkthrough modals for new users setting up their workspace project parameters.', 'col-4', 0, '2026-08-02']);
  database.run(insertCard, ['card-7', 'Responsive Grid Testing', 'Validate board responsive container layouts across tablet, desktop, and ultra-wide viewports.', 'col-5', 0, '2026-08-02']);
  database.run(insertCard, ['card-8', 'Performance Benchmark Analysis', 'Measure Lighthouse score metrics, bundle sizes, and initial server render times.', 'col-5', 1, '2026-08-02']);

  saveDb();
}
