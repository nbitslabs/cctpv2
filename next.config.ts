import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  assetPrefix: "https://nbitslabs.github.io",
  images: { remotePatterns: [{ protocol: "https", hostname: "**" }] },
  webpack(config) {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
};

export default nextConfig;
