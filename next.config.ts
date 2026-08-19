import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // basePath: process.env.BASEPATH,
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '192.168.1.177',
        port: '8000',
        pathname: '/storage/**'
      }
    ]
  },
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/admin',
        permanent: true
      }
    ]
  }
}

export default nextConfig
