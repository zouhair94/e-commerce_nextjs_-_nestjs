import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        hostname: "localhost",
      },
      {
        hostname: "217.0.0.1",
      },
    ],
  },
};

export default nextConfig;
