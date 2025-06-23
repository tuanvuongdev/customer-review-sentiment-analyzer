import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  env: {
    API_ENDPOINT_SERVER: process.env.API_ENDPOINT_SERVER,
    API_ENDPOINT_CLIENT: process.env.API_ENDPOINT_CLIENT,
  },
};

export default nextConfig;
