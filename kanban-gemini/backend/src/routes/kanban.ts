import { Router, Request, Response } from 'express';
import { getDb, saveDb } from '../db';

const router = Router();

interface ColumnRow {
  id: string;
  title: string;
  position: number;
}

interface CardRow {
  id: string;
  title: string;
  details: string;
  column_id: string;
  position: number;
  created_at: string;
}

// Helper to query rows from sql.js result
function queryAll<T>(sql: string, params: unknown[] = []): T[] {
  const db = (router as any)._db;
  const stmt = db.prepare(sql);
  if (params.length > 0) stmt.bind(params);
  const rows: T[] = [];
  while (stmt.step()) {
    rows.push(stmt.getAsObject() as T);
  }
  stmt.free();
  return rows;
}

// Middleware to ensure db is initialized
router.use(async (_req, _res, next) => {
  try {
    (router as any)._db = await getDb();
    next();
  } catch (err) {
    next(err);
  }
});

// GET /api/board - Return full board state
router.get('/board', (_req: Request, res: Response) => {
  const columns = queryAll<ColumnRow>('SELECT id, title, position FROM columns ORDER BY position ASC');
  const allCards = queryAll<CardRow>('SELECT id, title, details, column_id, position, created_at FROM cards ORDER BY position ASC');

  const cardsMap: Record<string, { id: string; title: string; details: string; createdAt: string }> = {};
  const columnsMap: Record<string, { id: string; title: string; cardIds: string[] }> = {};
  const columnOrder: string[] = [];

  for (const col of columns) {
    columnOrder.push(col.id);
    columnsMap[col.id] = { id: col.id, title: col.title, cardIds: [] };
  }

  for (const card of allCards) {
    cardsMap[card.id] = {
      id: card.id,
      title: card.title,
      details: card.details,
      createdAt: card.created_at,
    };
    if (columnsMap[card.column_id]) {
      columnsMap[card.column_id].cardIds.push(card.id);
    }
  }

  res.json({ cards: cardsMap, columns: columnsMap, columnOrder });
});

// PUT /api/columns/:id - Rename a column
router.put('/columns/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { title } = req.body;

  if (!title || typeof title !== 'string') {
    res.status(400).json({ error: 'Title is required' });
    return;
  }

  const db = (router as any)._db;
  db.run('UPDATE columns SET title = ? WHERE id = ?', [title.trim(), id]);
  saveDb();

  res.json({ id, title: title.trim() });
});

// POST /api/cards - Create a new card
router.post('/cards', (req: Request, res: Response) => {
  const { title, details, columnId } = req.body;

  if (!title || typeof title !== 'string') {
    res.status(400).json({ error: 'Title is required' });
    return;
  }

  if (!columnId || typeof columnId !== 'string') {
    res.status(400).json({ error: 'Column ID is required' });
    return;
  }

  const db = (router as any)._db;

  // Find the next position in the target column
  const result = db.exec('SELECT MAX(position) as maxPos FROM cards WHERE column_id = ?', [columnId]);
  const maxPos = result.length > 0 && result[0].values[0][0] !== null ? (result[0].values[0][0] as number) : -1;
  const position = maxPos + 1;

  const id = `card-${Date.now()}`;
  const createdAt = new Date().toISOString().split('T')[0];

  db.run(
    'INSERT INTO cards (id, title, details, column_id, position, created_at) VALUES (?, ?, ?, ?, ?, ?)',
    [id, title.trim(), (details || '').trim(), columnId, position, createdAt]
  );
  saveDb();

  res.status(201).json({ id, title: title.trim(), details: (details || '').trim(), createdAt });
});

// DELETE /api/cards/:id - Delete a card
router.delete('/cards/:id', (req: Request, res: Response) => {
  const db = (router as any)._db;
  const { id } = req.params;

  db.run('DELETE FROM cards WHERE id = ?', [id]);
  saveDb();

  res.json({ success: true });
});

// PUT /api/board/reorder - Reorder cards across columns after drag-and-drop
router.put('/board/reorder', (req: Request, res: Response) => {
  const { cardId, sourceColumnId, destinationColumnId, sourceIndex, destinationIndex } = req.body;

  if (!cardId || !sourceColumnId || !destinationColumnId || sourceIndex === undefined || destinationIndex === undefined) {
    res.status(400).json({ error: 'Missing required fields: cardId, sourceColumnId, destinationColumnId, sourceIndex, destinationIndex' });
    return;
  }

  const db = (router as any)._db;

  if (sourceColumnId === destinationColumnId) {
    // Reordering within the same column
    const cards = queryAll<{ id: string }>('SELECT id FROM cards WHERE column_id = ? ORDER BY position ASC', [sourceColumnId]);
    const cardIds = cards.map((c) => c.id);

    cardIds.splice(sourceIndex, 1);
    cardIds.splice(destinationIndex, 0, cardId);

    cardIds.forEach((cid, idx) => {
      db.run('UPDATE cards SET position = ? WHERE id = ?', [idx, cid]);
    });
  } else {
    // Moving between columns
    const sourceCards = queryAll<{ id: string }>('SELECT id FROM cards WHERE column_id = ? ORDER BY position ASC', [sourceColumnId]);
    const sourceIds = sourceCards.map((c) => c.id).filter((cid) => cid !== cardId);

    sourceIds.forEach((cid, idx) => {
      db.run('UPDATE cards SET position = ? WHERE id = ?', [idx, cid]);
    });

    const destCards = queryAll<{ id: string }>('SELECT id FROM cards WHERE column_id = ? AND id != ? ORDER BY position ASC', [destinationColumnId, cardId]);
    const destIds = destCards.map((c) => c.id);
    destIds.splice(destinationIndex, 0, cardId);

    destIds.forEach((cid, idx) => {
      db.run('UPDATE cards SET position = ? WHERE id = ?', [idx, cid]);
    });

    // Move the card to the new column
    db.run('UPDATE cards SET column_id = ?, position = ? WHERE id = ?', [destinationColumnId, destinationIndex, cardId]);
  }

  saveDb();
  res.json({ success: true });
});

export default router;
