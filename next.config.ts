import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { remotePatterns: [{ protocol: "https", hostname: "**" }] },
  webpack(config) {
    config.externals.push("pino-pretty", "lokijs", "encoding");

    // Handle React Native modules for web
    config.resolve.fallback = {
      ...config.resolve.fallback,
      "@react-native-async-storage/async-storage": false,
      "react-native": false,
      // Handle keyv adapters that are not available in browser
      "@keyv/redis": false,
      "@keyv/mongo": false,
      "@keyv/sqlite": false,
      "@keyv/postgres": false,
      "@keyv/mysql": false,
      "@keyv/etcd": false,
      "@keyv/offline": false,
      "@keyv/tiered": false,
    };

    return config;
  },
};

export default nextConfig;
