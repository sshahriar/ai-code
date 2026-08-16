# LLM Handoff — Phase 1

LLM Engineer deliverable for GeoNews (`plan.md` §12, skill `cerebras-inference`).

Replaces Backend stubs under `backend/llm/`. **Stable imports for routes:**

```python
from llm import generate_brief, handle_chat
```

## Files

| Path | Purpose |
|---|---|
| `backend/llm/__init__.py` | Re-exports `generate_brief`, `handle_chat` (+ helpers) |
| `backend/llm/models.py` | `GeoNewsBrief`, `ChatResponse`, `WatchlistChange`, `ClassifyResult` |
| `backend/llm/client.py` | LiteLLM + Cerebras constants, mock detection, structured completion |
| `backend/llm/fixtures.py` | Deterministic Dhaka / London / default mock briefs + chat |
| `backend/llm/context.py` | Radius→bbox, window→since, place resolve, DB context loaders |
| `backend/llm/brief.py` | `generate_brief(**kwargs)` |
| `backend/llm/chat.py` | `handle_chat(**kwargs)` |
| `backend/llm/classify.py` | Rules-first `classify_text` (+ thin LLM fallback) |
| `backend/llm/tests/test_llm.py` | Unit tests (parse, fixtures, crime-stat guard, classify) |

## Signatures (match Backend routes)

```python
generate_brief(*, lat, lon, radius_km=25.0, window="72h", place_name=None, conn=None) -> dict
handle_chat(*, message, lat=None, lon=None, place_name=None, radius_km=25.0, window="72h", conn=None, user_id="default") -> dict
```

Mock responses include plan §12 fields **plus** `"mock": true` (keeps Backend API tests green). Live responses set `"mock": false`.

`handle_chat` does **not** mutate DB — Backend executes `watchlist_changes` and persists `chat_messages`.

## Env vars

| Variable | Behavior |
|---|---|
| `OPENROUTER_API_KEY` | From process env or project-root `.env`. Required for live calls. |
| `LLM_MOCK` | `true`/`1`/`yes`/`on` → fixtures only (no network). |

**Mock when:** `LLM_MOCK` truthy **OR** missing/empty key. Never raises for missing key.

Live: LiteLLM model `openrouter/openai/gpt-oss-120b`, `extra_body={"provider":{"order":["cerebras"]}}`, Pydantic structured outputs.

## Optional classify

```python
from llm import classify_text, classify_rules

classify_text(title, summary="", cameo=None, tone=None, source=None, ...)
# → {category, severity, rationale}
```

Rules first; LLM fallback only when unmatched. Mock/no-key unmatched → `{other, 2, "rules-unmatched"}`.

## Fixture behavior

| Place | Match | Honesty |
|---|---|---|
| Dhaka | name / ~80 km of 23.81, 90.41 | No Police.uk for BD; sample/DEMO only; no invented crime stats |
| London | name / near 51.51, -0.13 | Open UK data may apply; still no invented rates |
| Default | else | `risk_level=unknown` |

## How to run LLM tests

```powershell
cd backend
.\.venv\Scripts\python.exe -m pip install -e ".[dev]"
$env:LLM_MOCK = "true"
.\.venv\Scripts\python.exe -m pytest llm/tests -v
```

All backend unit tests (DB + API + ingest + LLM):

```powershell
$env:INGEST_MOCK = "true"
$env:LLM_MOCK = "true"
.\.venv\Scripts\python.exe -m pytest -v
```

## Dependencies added

`litellm`, `pydantic` (merged into existing FastAPI `backend/pyproject.toml`).
