import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.gstatic.com",
        pathname: "/**",
      },
      // ...any other domains you already have
    ],
  },
};

export default nextConfig;
