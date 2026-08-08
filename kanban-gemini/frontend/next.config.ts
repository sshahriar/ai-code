import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/ai-code/kanban-gemini",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
