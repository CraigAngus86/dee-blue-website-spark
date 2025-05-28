/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'res.cloudinary.com',
      'placehold.co',
      'cdn.sanity.io',
      'bbbxhwaixjjxgboeiktq.supabase.co'
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  env: {
    // Make sure we export any public env vars if needed
  },
  // This is necessary to prevent Next.js from automatically dropping process.env 
  // variables that it thinks aren't used (false positives with dynamic access)
  experimental: {
    // Properly formatted experimental config
    outputFileTracingExcludes: {
      '*': ['.env*']
    }
  },
};
module.exports = nextConfig;
