import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  basePath: "/cctpv2",
  images: { remotePatterns: [{ protocol: "https", hostname: "**" }] },
}

export default nextConfig
