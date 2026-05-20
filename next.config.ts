import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/es',
        destination: '/es-es',
        permanent: true,
      },
      {
        source: '/es/:path*',
        destination: '/es-es/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
