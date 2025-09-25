import { deployedUrl } from "@/lib/constants";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: `${deployedUrl}/cctpv2`,
  images: { remotePatterns: [{ protocol: "https", hostname: "**" }] },
  webpack(config) {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
};

export default nextConfig;
