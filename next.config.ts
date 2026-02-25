import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Performance optimizations */
  reactStrictMode: true,

  // Faster refresh in development
  experimental: {
    optimizePackageImports: ['react', 'react-dom'],
  },

  // Reduce overhead
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;
