
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
    // Enable or disable various experiments
    serverActions: true,
  },
};

module.exports = nextConfig;
