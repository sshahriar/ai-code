import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/ai-code/portfolio",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
