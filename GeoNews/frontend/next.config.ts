import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

/**
 * basePath / assetPrefix are empty by default for local Docker (FastAPI serves `/`).
 * For GitHub Pages later: NEXT_PUBLIC_BASE_PATH=/ai-code/GeoNews
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") || "";

const devApiOrigin = process.env.NEXT_DEV_API_ORIGIN || "http://127.0.0.1:8000";

export default function config(phase: string): NextConfig {
  const isDevServer = phase === PHASE_DEVELOPMENT_SERVER;

  const common: NextConfig = {
    images: { unoptimized: true },
    basePath: basePath || undefined,
    assetPrefix: basePath || undefined,
    trailingSlash: true,
  };

  // The API client calls relative `/api/*` paths because production serves the
  // static export and FastAPI on one origin. `next dev` has no backend of its
  // own, so proxy there instead of letting every call fail into fixtures.
  // Rewrites are dropped under `output: "export"`, hence the dev-only split.
  if (isDevServer) {
    return {
      ...common,
      // Without this, `trailingSlash` 308s every `/api/x` call to `/api/x/`.
      skipTrailingSlashRedirect: true,
      rewrites: async () => [
        { source: "/api/:path*", destination: `${devApiOrigin}/api/:path*` },
      ],
    };
  }

  return { ...common, output: "export" };
}
