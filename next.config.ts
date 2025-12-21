import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.hardcover.app',
        port: '',
        search: '',
      },
    ],
  },
  env: {
    HARDCOVER_API_TOKEN: process.env.HARDCOVER_API_TOKEN
  },
};

export default nextConfig;
