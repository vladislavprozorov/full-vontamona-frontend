import type { NextConfig } from "next";

// Bundle Analyzer (только для production build)
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const isPagesExport = process.env.EXPORT === "true";

const nextConfig: NextConfig = {
  // Static export для GitHub Pages
  ...(isPagesExport && {
    output: "export",
    trailingSlash: true,
    // Если репо НЕ username.github.io, нужен basePath = '/имя-репо'
    // basePath: '/full-vontamona-frontend',
    // assetPrefix: '/full-vontamona-frontend/',
    images: {
      unoptimized: true, // GitHub Pages не поддерживает next/image optimization
    },
  }),
};

export default withBundleAnalyzer(nextConfig);
