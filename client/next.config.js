/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  serverRuntimeConfig: {
    NEXT_PUBLIC_ENTRYPOINT:
      process.env.NEXT_PUBLIC_ENTRYPOINT || 'http://localhost',
  },
}

module.exports = nextConfig
