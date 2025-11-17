import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    reactCompiler: true,
  },
  images: {
    remotePatterns: [new URL("https://files.stripe.com/**")],
  },
};

export default nextConfig;
