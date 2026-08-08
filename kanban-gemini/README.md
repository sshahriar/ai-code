# Kanban Project Management MVP

A modern, elegant single-board Kanban project management web application with a TypeScript REST API backend and Docker containerization.

## Architecture

- `frontend/` - Next.js 15 web application (React 19, TypeScript, Tailwind CSS)
- `backend/` - Express 5 REST API server (TypeScript, sql.js SQLite)
- `docker-compose.yml` - Full-stack containerization

## Features

- Single board view with 5 renamable fixed columns (Backlog, To Do, In Progress, In Review, Done)
- Interactive drag and drop interface using @hello-pangea/dnd
- Add card (Title and Details) and Delete card capabilities
- Pre-populated initial project data
- Persistent SQLite backend with REST API
- Graceful frontend fallback to in-memory state when backend is unavailable

## Getting Started

### Local Development

Start the backend:

```bash
cd backend
npm install
npm run dev
```

Start the frontend (in a separate terminal):

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:3000` in your web browser. Backend runs on `http://localhost:4000`.

### Docker Compose

```bash
docker-compose up --build
```

Frontend: `http://localhost:3000` | Backend API: `http://localhost:4000`

## Running Tests

Unit tests:

```bash
cd frontend
npm run test
```

End-to-end tests:

```bash
cd frontend
npx playwright test
```
