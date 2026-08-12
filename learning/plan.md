# Plan: AI Coder Learning App (React Docs-Style)

A documentation-style learning app (inspired by [react.dev/learn](https://react.dev/learn)) that turns course `.vtt` subtitles in `assets/` into detailed lesson pages, with AI summarize + a floating chatbot powered by OpenRouter.

---

## 1. Product goals

| Goal | Detail |
|------|--------|
| Docs UX | Three-pane layout: modules (left), lesson content (center), on-page TOC (right) |
| Content source | Generate rich markdown lessons from `assets/**/*.vtt` transcripts |
| AI features | One-click **Summarize** for the current lesson; floating **Chatbot** (bottom-right) scoped to the open lesson |
| Scope | Local/Vite React app under `learning/` (this folder), using existing 93 lessons across 3 weeks |

---

## 2. Content inventory (source of truth)

```text
learning/assets/
├── 1 - Week 1/   # 33 lessons (.vtt)
├── 2 - Week 2/   # 30 lessons (.vtt)
└── 3 - Week 3/   # 30 lessons (.vtt)
```

**Filename pattern:** `{n}. Day {d} - {Title}.vtt`

**Parse into course tree:**

- **Week** ← folder name (`1 - Week 1`, …)
- **Day** ← `Day N` in filename
- **Lesson order** ← leading number
- **Title** ← text after ` - `
- **Slug** ← kebab-case of title + lesson number (stable IDs for routes)

Example:

`1. Day 1 - Welcome to the Course Building a 3D Game with Cursor AI.vtt`  
→ Week 1 / Day 1 / lesson `01-welcome-to-the-course-building-a-3d-game-with-cursor-ai`

---

## 3. UX layout (react.dev-like)

```text
┌──────────────────────────────────────────────────────────────────────────┐
│  Top bar: Course title · Search (optional) · Theme                       │
├──────────────┬─────────────────────────────────────┬─────────────────────┤
│ LEFT         │ CENTER                              │ RIGHT               │
│ Module nav   │ Lesson article                      │ On this page        │
│              │                                     │                     │
│ Week 1       │ H1 title                            │ · Intro             │
│  Day 1       │ Intro / You will learn              │ · Key concepts      │
│   Lesson A ← │ Sections with id anchors            │ · Walkthrough       │
│   Lesson B   │ Code / callouts / lists             │ · Takeaways         │
│  Day 2       │ [ Summarize lesson ]                │                     │
│ Week 2 …     │                                     │ click → scrollInto  │
│ Week 3 …     │                                     │ View of #section    │
└──────────────┴─────────────────────────────────────┴─────────────────────┘
                                              ┌─────────────────────┐
                                              │ FAB Chatbot (BR)    │
                                              │ Ask about this      │
                                              │ lesson…             │
                                              └─────────────────────┘
```

### Left sidebar — modules

- Collapsible **Week → Day → Lesson** tree
- Active lesson highlighted
- Persisted expand/collapse in `localStorage`
- Mobile: drawer / off-canvas

### Center — content

- Render generated markdown (headings, lists, code blocks, callouts)
- Sticky lesson actions: **Summarize**, prev/next lesson
- Scroll spy updates the right TOC active item

### Right sidebar — “On this page”

- Auto-built from `h2` / `h3` in the current lesson (`id` slugs)
- Click = smooth scroll to that section (`#heading-id`)
- Hidden / collapsed on narrow viewports

### Chatbot (bottom-right)

- Floating button → expandable panel
- Context: current lesson title + body (truncated if needed)
- Streaming replies preferred
- Clear chat / “Ask about this lesson” empty state

---

## 4. Content pipeline (VTT → detailed lessons)

### 4.1 Offline / build-time generation (recommended)

Generate once (or when VTTs change), ship static JSON/MD so the UI stays fast and cheap.

```text
scripts/generate-content.mjs
  1. Scan assets/**/*.vtt
  2. Parse WEBVTT → plain transcript (strip timestamps/cues)
  3. Call OpenRouter with a structured prompt → lesson markdown + TOC metadata
  4. Write:
       content/lessons/{slug}.md
       content/manifest.json   # weeks, days, titles, slugs, paths
```

**Lesson markdown template (target):**

```markdown
# {Title}

## Overview
…

## You will learn
- …

## Key concepts
### Concept A
…

## Walkthrough
…

## Practical tips
…

## Common pitfalls
…

## Summary
…
```

Prompt rules for the model:

- Faithful to the transcript (no invented APIs/tools)
- Expand spoken notes into clear docs-style sections
- Add section headings suitable for right-rail TOC
- Keep code snippets only when the transcript implies them
- Output markdown only (or JSON `{ title, sections[] }` if easier to parse)

### 4.2 Optional runtime fallback

If a lesson has no generated file yet, show raw transcript + a **Generate content** action (same OpenRouter prompt). Prefer pre-generation for the full catalog.

### 4.3 Summarize button

- Input: current lesson markdown (or transcript)
- OpenRouter call with a short “executive summary” system prompt
- Show result in a modal or expandable panel above the article
- Cache summary per slug in `localStorage` / IndexedDB

### 4.4 Chatbot

- Messages: user + assistant
- System prompt: tutor for this course; answer only from provided lesson context + optional short course syllabus
- Pass `lessonTitle` + `lessonBody` (truncate to model context limit)
- Model via OpenRouter (see §6)

---

## 5. Proposed tech stack

| Layer | Choice | Why |
|-------|--------|-----|
| UI | React 18 + Vite | Matches monorepo Vite apps; fast local DX |
| Routing | React Router | `/week/:weekId/day/:dayId/:slug` or `/learn/:slug` |
| Markdown | `react-markdown` + `remark-gfm` | Docs-style rendering |
| Syntax highlight | `shiki` or `rehype-highlight` | Optional for code blocks |
| Styles | CSS modules or plain CSS | Docs-like density; left/right fixed columns |
| Content gen | Node script + OpenRouter | Build-time batch from VTTs |
| AI API | OpenRouter Chat Completions | Summarize + chatbot (+ content gen) |
| Env | `.env.local` (gitignored) | API key never in source |

**Suggested folder structure:**

```text
learning/
├── plan.md
├── assets/                      # existing .vtt (read-only source)
├── content/                     # generated (commit or gitignore — choose one)
│   ├── manifest.json
│   └── lessons/*.md
├── scripts/
│   └── generate-content.mjs
├── .env.example
├── .env.local                   # OPENROUTER_API_KEY=… (do not commit)
└── app/                         # or src/
    ├── main.jsx
    ├── App.jsx
    ├── components/
    │   ├── Layout.jsx
    │   ├── LeftSidebar.jsx
    │   ├── LessonContent.jsx
    │   ├── RightToc.jsx
    │   ├── SummarizeButton.jsx
    │   └── Chatbot.jsx
    ├── lib/
    │   ├── openrouter.js
    │   ├── parseVtt.js
    │   └── courseTree.js
    └── styles/
```

**Vite base (if deploying to GitHub Pages hub later):**

```js
base: '/ai-code/learning/',
```

---

## 6. OpenRouter integration

### 6.1 Secrets (critical)

- Store the key only in `.env.local` / environment — **never** in `plan.md`, source, or git.
- Root `.gitignore` already ignores `.env` / `.env.local`.
- **Rotate the key** that was pasted in chat; treat it as exposed.
- Prefer a small **local proxy** or Vite server middleware for browser calls so the key is not embedded in client bundles. If using `VITE_*` for a prototype only, accept that anyone can extract it from the built JS — do not ship that to production.

`.env.example`:

```bash
OPENROUTER_API_KEY=
OPENROUTER_MODEL=openai/gpt-4o-mini
# optional: content generation model (can be stronger)
OPENROUTER_GEN_MODEL=anthropic/claude-3.5-sonnet
```

### 6.2 API shape

- Endpoint: `https://openrouter.ai/api/v1/chat/completions`
- Headers: `Authorization: Bearer $OPENROUTER_API_KEY`, `HTTP-Referer`, `X-Title`
- Features:
  1. Batch content generation (script)
  2. Summarize (UI)
  3. Chat (UI, multi-turn)

### 6.3 Cost / limits

- Generate content once offline; re-run only when VTTs change
- Summarize: cache by content hash
- Chat: cap message history + truncate lesson context

---

## 7. Routing & data model

**`manifest.json` (sketch):**

```json
{
  "courseTitle": "AI Coder — Agentic Engineering",
  "weeks": [
    {
      "id": "week-1",
      "title": "Week 1",
      "days": [
        {
          "id": "day-1",
          "title": "Day 1",
          "lessons": [
            {
              "id": "01",
              "slug": "01-welcome-to-the-course-building-a-3d-game-with-cursor-ai",
              "title": "Welcome to the Course Building a 3D Game with Cursor AI",
              "vttPath": "assets/1 - Week 1/1. Day 1 - ….vtt",
              "contentPath": "content/lessons/01-welcome-….md"
            }
          ]
        }
      ]
    }
  ]
}
```

**Routes:**

- `/` → redirect to first lesson
- `/learn/:slug` → lesson view
- Hash links: `/learn/:slug#key-concepts`

---

## 8. Implementation phases

### Phase 0 — Scaffold

- [ ] Vite + React app in `learning/`
- [ ] Layout shell: left / center / right columns
- [ ] `.env.example` + document OpenRouter setup
- [ ] Stub with 1–2 hardcoded lessons to validate UX

### Phase 1 — Course nav + VTT ingest

- [ ] `parseVtt.js` → plain text from WEBVTT
- [ ] Scan `assets/` → build `manifest.json` (titles/tree without LLM)
- [ ] Left sidebar wired to real weeks/days/lessons
- [ ] Center shows transcript fallback until generated MD exists

### Phase 2 — Content generation

- [ ] `scripts/generate-content.mjs` + OpenRouter prompt
- [ ] Generate all 93 lessons (or week-by-week)
- [ ] Markdown renderer + heading `id`s
- [ ] Right TOC from headings + scroll spy + click-to-scroll

### Phase 3 — AI UX

- [ ] Summarize button + modal/panel + cache
- [ ] Floating chatbot (lesson-scoped context)
- [ ] Loading / error / rate-limit states
- [ ] Optional: proxy so key stays server-side

### Phase 4 — Polish

- [ ] Prev/next lesson
- [ ] Keyboard nav / focus styles
- [ ] Mobile sidebars
- [ ] Progress checkmarks in left nav (`localStorage`)
- [ ] Search lessons by title (optional)
- [ ] README: generate content, run app, env vars

---

## 9. Acceptance criteria

1. Opening the app shows a react.dev-like three-pane docs layout.
2. Left nav lists Week 1–3 → Day → all lessons from `assets/`.
3. Selecting a lesson loads detailed, structured content derived from that lesson’s `.vtt`.
4. Right sidebar lists section headings; clicking jumps to that section.
5. **Summarize** returns a concise AI summary of the open lesson.
6. Bottom-right chatbot answers questions using the current lesson as context.
7. No API key committed to the repository.

---

## 10. Out of scope (v1)

- Auth / user accounts
- Video player sync with VTT timestamps (nice-to-have later)
- Quizzes / certificates
- Full-text search over generated bodies
- Production multi-user hosting with shared API key

---

## 11. Immediate next step

Scaffold the Vite React app and static three-pane layout, then wire the left sidebar to a manifest built from `assets/` (transcript-only center pane). After UX feels right, run the OpenRouter generation script over Week 1, then Weeks 2–3.


while summarizeing ui i glitching give nice skeleten ui so it looks nice,
also add scroll support in Summarize lesso n ui 
chat bubble should not be that lengthy at first after clicking it should expand 

chat floating bar give better ui 
add light /dark mode option at top 