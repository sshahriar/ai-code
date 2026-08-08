# Project Plan and Overview

## Executive Summary
This document outlines the architecture, component breakdown, brand design system, feature specifications, and operational plan for the single-board Kanban Project Management Web Application.

---

## Component & Architecture Details

### 1. Split-Panel Login Page (`LoginPage.tsx`)
- **Layout**: Beautiful split-panel design.
  - **Left Panel**: Dark navy background (`#032147`) with glowing color accents (Accent Yellow `#ecad0a`, Blue Primary `#209dd7`, Purple Secondary `#753991`), grid overlay pattern, branding title, tagline, and feature bullet highlights.
  - **Right Panel**: Clean, modern authentication form featuring email, password input with toggle visibility, remember me checkbox, and submit button.
- **State Flow**: Manages login authentication state (`isLoggedIn`) in main application entry ([page.tsx](file:///c:/Users/Pavilion/Documents/ai_coder/kanban%20gemini/frontend/src/app/page.tsx)). Demonstrates smooth transition to main Kanban board upon submission.

### 2. Floating AI Chatbot Assistant (`ChatWidget.tsx` & `aiChat.ts`)
- **Position & UI**: Floating action widget anchored at the **Bottom-Right** of the screen with toggleable chat window.
- **Integration**: Uses OpenRouter API backend fallback / AI processing service (`services/aiChat.ts`) to interpret natural language.
- **Natural Language Capabilities**:
  - **Create Card**: Intelligently creates cards by title and places them into the designated column (e.g. "Add a card titled 'Design Landing Page' to To Do"). Automatically scrolls to and highlights the target column.
  - **Delete Card**: Target cards by Card ID badge (e.g. `card-1`) or card title/name to remove them cleanly.
  - **Move Card**: Relocates cards smoothly across columns by exact or partial Card Title/Name (e.g. "Move Database Schema Audit to Done") as well as Card ID. Automatically scrolls smoothly to the destination column upon execution.
  - **Rename Column**: Enables inline column title changes via natural chatbot commands.
- **Interactive Prompts**: Quick suggestion chips provided inside the chat window for easy testing and user guidance.

### 3. Main Kanban Board (`KanbanBoard.tsx`, `KanbanColumn.tsx`, `KanbanCard.tsx`)
- **Columns**: 5 fixed columns (Backlog, To Do, In Progress, In Review, Done) with inline renaming.
- **Cards**: Title, Details, and prominent Card ID tag badge (e.g. `card-1`) displayed on every card for easy manual and AI targeting.
- **Drag-and-Drop**: Built using `@hello-pangea/dnd`.
- **Card Modals**: Add Card Modal and inline Delete Card functionality.

### 4. Express REST API Backend (`/backend`)
- **Framework**: Node.js Express REST API in TypeScript.
- **Data Persistence**: SQLite database (`sql.js`) with persistent file volume.
- **Endpoints**:
  - `GET /api/board`: Fetch current board columns and card state.
  - `POST /api/cards`: Create a new card.
  - `PUT /api/cards/:id`: Update card details or column placement.
  - `DELETE /api/cards/:id`: Remove card.
  - `PUT /api/columns/:id`: Rename column title.
  - `POST /api/ai/chat`: Backend proxy route for OpenRouter chatbot queries.

### 5. Docker Containerization (`docker-compose.yml`)
- **Backend Service (`kanban-backend`)**: Port `4000:4000`
- **Frontend Service (`kanban-frontend`)**: Port `3000:3000`
- **Shared Volume (`kanban-data`)**: Mounts to `/app/data` for SQLite persistence across restarts.

---

## Core Guidelines & Constraints

1. **Brand Color System**:
   - Accent Yellow: `#ecad0a`
   - Blue Primary: `#209dd7`
   - Purple Secondary: `#753991`
   - Dark Navy: `#032147`
   - Gray Text: `#888888`
2. **Formatting Rule**: Strictly NO emojis in code, UI text, or documentation.

---

## Current Status

- Both `kanban-frontend` and `kanban-backend` Docker containers are active and verified.
- Access Links:
  - Frontend UI: [http://localhost:3000](http://localhost:3000)
  - Backend API: [http://localhost:4000/api](http://localhost:4000/api)
