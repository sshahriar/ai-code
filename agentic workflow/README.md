# Agentic Ops

A mission-control dashboard that shows how a product is built **agentically**: one Jira ticket in, an orchestrated specialist team in the middle, a running deploy out the other side.

**Live:** [https://sshahriar.github.io/ai-code/agentic-workflow/](https://sshahriar.github.io/ai-code/agentic-workflow/)

Open [`index.html`](./index.html) in a browser. The workflow replays on load. Use **Replay workflow**, **Pause** / **Play**, or click any pipeline stage to jump.

---

## What you are looking at

The page is not the app. It is a live diagram of the *process* used to build apps like GeoNews: a Team Lead that never writes application code, six specialist teammates, and a gated toolkit (MCP, skills, hooks, plugins, sandbox).

```text
GEO-142  (Jira MCP)
   │
   ▼
plan.md  ← contract / skills / CLAUDE.md
   │
   ▼
Toolkit    MCP · Skills · Hooks · Plugins · Sandbox
   │
   ▼
Team Lead  (orchestration only)
   │
   ├─ Database Engineer     backend/db/*
   ├─ Backend API Engineer  backend/api/*
   ├─ LLM Engineer          backend/llm/*
   ├─ Frontend Engineer     frontend/*
   ├─ Integration Tester    test/*   (Playwright e2e)
   └─ DevOps Engineer       docker + start scripts
   │
   ▼
E2E fail → bug back to owner → retest → 8/8
   │
   ▼
Deploy     ./scripts/start_windows.ps1  →  localhost:8000
```

---

## Pipeline

| Stage | What happens |
| :--- | :--- |
| **Ticket** | Jira MCP pulls `GEO-142`. The lead treats `plan.md` as the only contract. |
| **Spec** | Skills and `CLAUDE.md` point at the plan by path so context loads only when needed. |
| **Toolkit** | Plugins, MCP servers, hooks, and Docker sandbox are armed *before* anyone codes. |
| **Team** | Lead creates the agent team. Module ownership keeps teammates from colliding. |
| **Build** | Database goes first. API, LLM, Frontend, and DevOps then run in parallel. Sub-agents take focused tasks (one migration, one unit test, one classify call). |
| **E2E** | Integration Tester builds and runs Playwright when handoffs land. |
| **Fix loop** | Failures go to the owning engineer (Frontend / Backend), not the lead. Retest until green. |
| **Deploy** | DevOps ships the container and start script. One command, sandboxed, no paid APIs. |

---

## Agent team

The spawn prompt the lead uses:

> Create an Agent Team to complete the project as defined. Team-members: a Front-end engineer to work on the frontend, a Backend API Engineer on the backend, a Database Engineer on all DB related code, an LLM Engineer on the LLM calls. While all team-members should work on unit tests, there should be an Integration Tester team-member that builds and runs end-to-end Playwright tests when ready, reporting issues back to be fixed by the team-members. Finally, a Devops engineer for the Docker container and the scripts.

| Teammate | Owns | Job |
| :--- | :--- | :--- |
| **Team Lead** | orchestration | Sequence work, unblock, never write app code |
| **Frontend Engineer** | `frontend/*` | Map UI, intel drawer, filters |
| **Backend API Engineer** | `backend/api/*` | FastAPI, ingest, SSE, health |
| **Database Engineer** | `backend/db/*` | Schema, migrations, queries |
| **LLM Engineer** | `backend/llm/*` | Classify, geocode-from-text, briefing |
| **Integration Tester** | `test/*` | Playwright e2e; file bugs at owners |
| **DevOps Engineer** | Docker / scripts | Compose, start scripts, sandbox network |

Orchestration order on the graph: **DB unblocks API + LLM** → Frontend can mock in parallel → Tester waits on handoffs → bugs loop back on a dashed line → DevOps ships after 8/8.

---

## Practice topics

These eight techniques are the stack, not decoration. The dashboard highlights the matching card as the pipeline moves.

| Topic | How it is used |
| :--- | :--- |
| **MCP server** | Jira ticket ingest; project MCP for news / geocode / crime tools |
| **Skills** | `SKILL.md` files for ingest, Leaflet, inference — loaded on demand |
| **Hooks** | Format on edit, block secret leaks, gate outbound HTTP |
| **Sub-agents** | Short-lived workers under a specialist for one focused task |
| **Multi-agents** | Persistent teammates with their own history and module ownership |
| **Swarm & orchestration** | Parallel build (swarm) reeled in by the lead (orchestration) |
| **Plugins** | frontend-design, Context7, Playwright — none that spawn extra sub-agents |
| **Sandboxing** | Docker + hook-gated shell; agents never hit paid APIs or the raw host |

---

## How to watch it

1. Open `index.html`.
2. Let the replay run, or hit **Replay workflow**.
3. Click a pipeline node to inspect that phase.
4. Watch the Jira board, agent statuses, event stream, bug cards, and deploy box move together.

No build step, no server, no API keys.

---

## Why this shape of team

- **Vertical module ownership** (UI vs API vs DB vs LLM vs Docker vs e2e) so agents do not edit the same files.
- **Lead does not code** so orchestration does not compete with implementation context.
- **Everyone writes unit tests**; only Tester owns Playwright, and only after handoffs exist.
- **Bugs go to owners**, which is the difference between a swarm and a team.
- **Sandbox first**, so a six-agent swarm cannot leak secrets or call paid APIs.

That is the agentic way this repo builds a project: ticket → spec → toolkit → team → parallel build → e2e loop → deploy.
