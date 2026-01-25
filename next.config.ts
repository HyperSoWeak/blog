import type { NextConfig } from "next";
import { repoName } from "./src/lib/config";

const isExport = process.env.EXPORT_MODE === "true";
const isProd = process.env.NODE_ENV === "production";

// Consistent basePath for all production builds (local or CI)
const BASE_PATH = isProd ? repoName : "";

const nextConfig: NextConfig = {
  /* config options here */
  output: isExport ? "export" : undefined,
  basePath: BASE_PATH,
  env: {
    // Inject it just in case, though src/lib/config.ts calculates it too
    NEXT_PUBLIC_BASE_PATH: BASE_PATH,
  },
  reactCompiler: true,
  images: {
    unoptimized: true,
  },
  // Ensure trailing slashes for static export routing
  trailingSlash: true,
};

export default nextConfig;
