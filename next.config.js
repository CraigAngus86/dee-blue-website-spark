
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
  },
  env: {
    // Make sure we export any public env vars if needed
  },
  // This is necessary to prevent Next.js from automatically dropping process.env 
  // variables that it thinks aren't used (false positives with dynamic access)
  experimental: {
    // Preserve all process.env variables using the proper Next.js 14 syntax
    outputFileTracingExcludes: ['**/.env*'],
  },
};

module.exports = nextConfig;
