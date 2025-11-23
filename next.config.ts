import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  output: "export",
  images: {
    unoptimized: true,
  },
  /* config options here */
  reactCompiler: true,
  reactStrictMode: true,
};

export default nextConfig;
