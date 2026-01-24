import type { NextConfig } from "next";

const isExport = process.env.EXPORT_MODE === "true";

const nextConfig: NextConfig = {
  /* config options here */
  output: isExport ? "export" : undefined,
  basePath: isExport ? "/blog" : "",
  reactCompiler: true,
  images: {
    unoptimized: true,
  },
  // Ensure trailing slashes for static export routing
  trailingSlash: true,
};

export default nextConfig;
