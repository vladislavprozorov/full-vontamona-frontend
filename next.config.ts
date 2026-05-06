import type { NextConfig } from "next";

// Bundle Analyzer (только для production build)
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90],
  },
};

export default withBundleAnalyzer(nextConfig);
