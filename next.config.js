/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https', 
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'bbbxhwaixjjxgboeiktq.supabase.co',
      }
    ],
  },
  env: {
    // Make sure we export any public env vars if needed
  },
  experimental: {
    outputFileTracingExcludes: {
      '*': ['.env*']
    }
  },
};
module.exports = nextConfig;
