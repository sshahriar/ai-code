---
name: geonews-classify
description: Maps GDELT CAMEO codes, tone, and keywords to GeoNews category and severity 1-5. Use when normalizing ingest rows, implementing MCP classify_text, or adding an LLM classify fallback.
---

# Classify events

Rules first. Call an LLM only when rules return `other` **and** `severity` is unknown. Never label a row as official crime unless `source == "police_uk"`.

## Output

```json
{ "category": "crime", "severity": 3, "rationale": "keyword: shooting" }
```

`category`: `crime` | `conflict` | `disaster` | `politics` | `health` | `economy` | `other`  
`severity`: integer 1–5 (1 = routine, 5 = mass casualty / major disaster)

## Keyword rules (title + summary, case-insensitive)

Apply the first matching bucket. More specific beats `other`.

| category | examples |
|---|---|
| crime | murder, homicide, shooting, robbery, theft, rape, assault, arrest, police, stabbing, kidnapping |
| conflict | war, airstrike, missile, troop, ceasefire, invasion, militant, shelling |
| disaster | earthquake, flood, cyclone, hurricane, wildfire, tsunami, landslide, eruption |
| politics | election, parliament, minister, protest, vote, coalition, impeach |
| health | outbreak, dengue, cholera, hospital, epidemic, vaccine |
| economy | inflation, recession, stock, bank, tariff, unemployment |

## GDELT CAMEO (if present)

Use the two-digit root:

| root | category | base severity |
|---|---|---|
| 18, 19, 20 | conflict (or crime if keywords match crime) | 4–5 |
| 17 | conflict | 3 |
| 14 | politics | 2 |
| 13, 15, 16 | conflict | 3 |
| 02, 03, 04 | politics | 1–2 |

## Tone → severity nudge

GDELT `tone` is roughly -100 to +100 (often -10 to +10).

- tone ≤ -8 → min severity 4
- tone ≤ -4 → min severity 3
- tone ≥ 2 → cap severity at 3 unless CAMEO is 18–20

## Police.uk

`source=police_uk` → `category=crime`. Severity from their category string (violence/weapons → 4, theft/burglary → 2, anti-social → 1). Still not a conviction.

## LLM fallback

Use `cerebras-inference` structured output `{category, severity, rationale}`. If `LLM_MOCK=true`, keep the rule result (`other`, 2) and rationale `rules-unmatched`.
