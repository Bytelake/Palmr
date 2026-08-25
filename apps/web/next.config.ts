import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  output: "standalone",
  // Disable remote image optimization to avoid Image Optimizer exposure
  // (Palmr does not use next/image for remote assets).
  images: {
    unoptimized: true,
    remotePatterns: [],
  },
  serverExternalPackages: [],
  experimental: {
    serverActions: {
      bodySizeLimit: "1pb",
    },
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
