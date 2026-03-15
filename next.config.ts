import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d18rkjvuv0otht.cloudfront.net",
      },
    ],
  },
};

export default nextConfig;
