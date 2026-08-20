# GeoNews frontend

Next.js static export + Leaflet map UI. See [`../planning/FRONTEND_HANDOFF.md`](../planning/FRONTEND_HANDOFF.md).

```bash
npm install
npm run dev
npm test
npm run build
```

## Seeing real data locally

The API client calls relative `/api/*` paths, because production serves the static
export and FastAPI from one origin (port 8000). Any failed call falls back to the
offline fixtures in `src/lib/fixtures.ts`, whose URLs are `https://example.local/...` —
so demo-looking cards mean the UI never reached the backend.

Start the backend first, then the dev server:

```bash
# from the project root
.venv/Scripts/python.exe -m uvicorn main:app --app-dir backend --port 8000
cd frontend && npm run dev          # http://localhost:3000
```

`next dev` proxies `/api/*` to `http://127.0.0.1:8000` (override with
`NEXT_DEV_API_ORIGIN`). The proxy is dev-only: `output: "export"` drops rewrites, so
`next.config.ts` only sets `output` for production builds.

The header badge shows `live` when the backend is reachable and `offline fixtures`
when it is not.
