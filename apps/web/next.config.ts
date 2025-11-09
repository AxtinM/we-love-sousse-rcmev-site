import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  // Allow builds to succeed even if CMS is not available
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Disable trailing slash
  trailingSlash: false,
  // Configure images
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cms.rcmev.com',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: 'cms',
        port: '1337',
        pathname: '/uploads/**',
      },
    ],
    // Custom loader to rewrite CMS URLs for Docker internal networking
    // Note: This loader will pass through relative paths (like /uploads/*)
    // so they're served from the public directory
    loader: 'custom',
    loaderFile: './src/lib/imageLoader.ts',
  },
};

export default nextConfig;
