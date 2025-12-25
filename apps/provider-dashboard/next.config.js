/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@zoo/ui', '@zoo/types'],
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:4000/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
