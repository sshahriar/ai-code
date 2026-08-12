# AI Coder Learn

Documentation-style React learning app for the AI Coder course. Lessons are generated from `.vtt` subtitles in `assets/`, with OpenRouter-powered summarize + chatbot.

## Setup

```bash
cd learning
npm install
cp .env.example .env.local   # add OPENROUTER_API_KEY
npm run build:content        # parse VTTs → content/manifest.json + lessons
npm run dev
```

Open: [http://localhost:5173/ai-code/learning/](http://localhost:5173/ai-code/learning/)

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run build:content` | Build manifest + structured markdown from all VTTs |
| `npm run generate:content` | Optional OpenRouter polish of lesson markdown |
| `npm run generate:content -- --slug 01-...` | Polish one lesson |
| `npm run generate:content -- --limit 3` | Polish first N lessons |
| `npm run dev` | Vite dev server (includes `/api/chat` proxy) |
| `npm run build` | Production static build |

## Layout

- **Left:** Week → Day → Lesson modules
- **Center:** Lesson markdown + Summarize + prev/next
- **Right:** On-this-page TOC (click to jump)
- **Bottom-right:** Lesson-scoped chatbot

## Env

```bash
OPENROUTER_API_KEY=
OPENROUTER_MODEL=openai/gpt-4o-mini
OPENROUTER_GEN_MODEL=openai/gpt-4o-mini
```

The API key stays in `.env.local` and is used by the Vite `/api/chat` proxy (not bundled into client JS).
