/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/voicevox/:path*',
        destination: 'https://api.su-shiki.com/v2/voicevox/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
