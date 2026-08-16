import type { NextConfig } from "next";

/**
 * basePath / assetPrefix are empty by default for local Docker (FastAPI serves `/`).
 * For GitHub Pages later: NEXT_PUBLIC_BASE_PATH=/ai-code/GeoNews
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") || "";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
};

export default nextConfig;
