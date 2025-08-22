/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Development server configuration to handle potential fetch issues
  experimental: {
    instrumentationHook: false,
  },
  // Webpack configuration for better HMR handling
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      // Improve HMR reliability
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      }
    }
    return config
  },
}