import type { NextConfig } from "next";

const VOCALCOM_AI_HOST = [{ type: 'host' as const, value: 'vocalcom.ai' }];

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
      {
        source: '/',
        has: VOCALCOM_AI_HOST,
        destination: '/es-es',
        permanent: false,
      },
      {
        source: '/fr/:path*',
        has: VOCALCOM_AI_HOST,
        destination: '/es-es',
        permanent: false,
      },
      {
        source: '/fr',
        has: VOCALCOM_AI_HOST,
        destination: '/es-es',
        permanent: false,
      },
      {
        source: '/en/:path*',
        has: VOCALCOM_AI_HOST,
        destination: '/es-es',
        permanent: false,
      },
      {
        source: '/en',
        has: VOCALCOM_AI_HOST,
        destination: '/es-es',
        permanent: false,
      },
      {
        source: '/pt/:path*',
        has: VOCALCOM_AI_HOST,
        destination: '/es-es',
        permanent: false,
      },
      {
        source: '/pt',
        has: VOCALCOM_AI_HOST,
        destination: '/es-es',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
