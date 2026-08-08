# AGENTS.md

## Overview
This repository contains a modern single-board Kanban Project Management web application built with Next.js in the `frontend/` directory and an Express REST API backend in the `backend/` directory.

## Project Rules & Guidelines
- Simple, slick, and professional UI/UX.
- 5 fixed columns with inline renaming (Backlog, To Do, In Progress, In Review, Done).
- Cards with title and details.
- Prominent Card ID tag badge (e.g. `card-1`) displayed on every card for easy manual and AI targeting.
- Drag and drop functionality using @hello-pangea/dnd.
- Add card and Delete card capabilities.
- Pre-populated dummy data on launch.
- Express REST API backend (`backend/`) with SQLite (`sql.js`) data persistence.
- OpenRouter AI Chatbot Assistant floating at **Bottom-Right** capable of creating, deleting, moving cards (by Card ID or Title), and renaming columns via natural language.
- Beautiful split-panel Login Page.
- Containerized deployment using Docker and Docker Compose (`docker-compose.yml`).
- Strictly NO emojis in code, UI text, or documentation.

## Brand Color System
- Accent Yellow: `#ecad0a`
- Blue Primary: `#209dd7`
- Purple Secondary: `#753991`
- Dark Navy: `#032147`
- Gray Text: `#888888`
cur