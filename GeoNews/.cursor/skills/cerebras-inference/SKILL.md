---
name: cerebras-inference
description: Writes LiteLLM + OpenRouter calls that use Cerebras as the inference provider with structured outputs. Use when adding or changing GeoNews LLM chat, place briefs, classification fallbacks, or any OpenRouter completion.
---

# Calling an LLM via Cerebras

Use LiteLLM through OpenRouter with Cerebras as the ordered provider. Do not call OpenAI, Anthropic, or Groq SDKs directly.

## Setup

`OPENROUTER_API_KEY` must be loaded from the project-root `.env`.

```bash
uv add litellm pydantic
```

If `LLM_MOCK=true` or the key is missing, return the fixture in `plan.md` §12. Do not crash the API.

## Constants

```python
from litellm import completion
from pydantic import BaseModel, Field

MODEL = "openrouter/openai/gpt-oss-120b"
EXTRA_BODY = {"provider": {"order": ["cerebras"]}}
```

## Text completion

```python
response = completion(
    model=MODEL,
    messages=messages,
    reasoning_effort="low",
    extra_body=EXTRA_BODY,
)
result = response.choices[0].message.content
```

## Structured outputs (required for GeoNews)

```python
class GeoNewsBrief(BaseModel):
    place_name: str
    window: str
    headline: str
    risk_level: str = Field(pattern="^(low|moderate|high|unknown)$")
    bullets: list[str]
    caveats: list[str]

class WatchlistChange(BaseModel):
    name: str
    lat: float | None = None
    lon: float | None = None
    action: str = Field(pattern="^(add|remove)$")

class ChatResponse(BaseModel):
    message: str
    brief: GeoNewsBrief | None = None
    watchlist_changes: list[WatchlistChange] = []
    highlight_event_ids: list[str] = []

response = completion(
    model=MODEL,
    messages=messages,
    response_format=ChatResponse,
    reasoning_effort="low",
    extra_body=EXTRA_BODY,
)
result = ChatResponse.model_validate_json(response.choices[0].message.content)
```

## GeoNews rules

- System role: **GeoNews Analyst**. Concise, sourced, honest about uncertainty.
- Never invent coordinates or official crime statistics.
- If data is `sample` or GDELT-only, say so in `caveats`.
- Allowed side effects: watchlist add/remove only.
- Return the full JSON in one shot. No token streaming.
