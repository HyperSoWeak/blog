import type { NextConfig } from "next";

const isExport = process.env.EXPORT_MODE === "true";
const BASE_PATH = isExport ? "/blog" : "";

const nextConfig: NextConfig = {
  /* config options here */
  output: isExport ? "export" : undefined,
  basePath: BASE_PATH,
  env: {
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
