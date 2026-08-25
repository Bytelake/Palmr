import fs from "fs";
import path from "path";
import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

/**
 * Resolve the file-tracing root for Next.js standalone output.
 *
 * In the git monorepo, apps/web lives two levels below the repo root, so
 * tracing must start there. In the Docker build the same sources are copied
 * to /app/web, where "../.." is the filesystem root and would nest
 * server.js under .next/standalone/app/web/ — breaking the image entrypoint
 * that expects /app/web/server.js.
 */
function resolveOutputFileTracingRoot(): string {
  const monorepoRoot = path.join(__dirname, "../..");
  if (fs.existsSync(path.join(monorepoRoot, "apps", "web", "package.json"))) {
    return monorepoRoot;
  }
  return __dirname;
}

const nextConfig: NextConfig = {
  output: "standalone",
  outputFileTracingRoot: resolveOutputFileTracingRoot(),
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
