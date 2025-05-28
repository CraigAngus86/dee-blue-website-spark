/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
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
