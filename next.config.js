
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
    // Properly formatted experimental config
    outputFileTracingExcludes: {
      '*': ['.env*']
    }
  },
};

module.exports = nextConfig;
