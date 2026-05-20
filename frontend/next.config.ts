import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "loansarathi.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/admin/:path*',
        destination: 'http://127.0.0.1:7001/api/admin/:path*',
      },
      {
        source: '/api/gallery/:path*',
        destination: 'http://127.0.0.1:7001/api/gallery/:path*',
      },
    ];
  },
};

export default nextConfig;
