
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'dlkpaw2a0.cloudinary.com', // Cloudinary domain
      'cdn.sanity.io', // Sanity CDN domain
      'res.cloudinary.com' // Cloudinary general domain
    ],
    formats: ['image/avif', 'image/webp']
  },
  experimental: {
    // Updated from serverActions: true to proper object format
    serverActions: {
      allowedOrigins: ['localhost:3000', '*.lovableproject.com', '*.lovable.app'],
      allowedForwardedHosts: ['localhost:3000', '*.lovableproject.com', '*.lovable.app']
    },
  },
};

module.exports = nextConfig;
