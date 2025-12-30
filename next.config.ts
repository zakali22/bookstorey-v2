import type { NextConfig } from "next";

const nextConfig = {
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
  turbopack: {
    rules: {
      '*.graphql': {
        loaders: ['graphql-tag/loader'],
        as: '*.js',
      },
      '*.gql': {
        loaders: ['graphql-tag/loader'],
        as: '*.js',
      },
    },
  },
} satisfies NextConfig;

export default nextConfig;
