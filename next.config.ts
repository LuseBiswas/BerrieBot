import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Add image optimization settings
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Increase the limit for image optimization
    minimumCacheTTL: 60,
  },

};

export default nextConfig;
