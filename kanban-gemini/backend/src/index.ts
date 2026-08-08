import express from 'express';
import cors from 'cors';
import kanbanRoutes from './routes/kanban';
import { resetDb } from './db';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Root welcome route
app.get('/', (_req, res) => {
  res.json({
    name: 'Kanban Project Management API',
    status: 'online',
    endpoints: {
      health: '/api/health',
      board: '/api/board',
      columns: 'PUT /api/columns/:id',
      cards: 'POST /api/cards, DELETE /api/cards/:id',
      reorder: 'PUT /api/board/reorder',
    },
  });
});

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Reset endpoint for E2E testing
app.post('/api/reset', async (_req, res) => {
  await resetDb();
  res.json({ success: true });
});

// Kanban API routes
app.use('/api', kanbanRoutes);

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
