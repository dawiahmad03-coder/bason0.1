import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "frame-ancestors 'self' https://warpcast.com https://www.warpcast.com https://*.warpcast.com https://farcaster.xyz https://www.farcaster.xyz https://*.farcaster.xyz",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
