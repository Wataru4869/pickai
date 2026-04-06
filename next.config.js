/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // non-www → www の永続リダイレクト（308 = Next.js の permanent: true）
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'aierabi.jp' }],
        destination: 'https://www.aierabi.jp/:path*',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
