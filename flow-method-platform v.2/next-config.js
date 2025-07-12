/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '/flow-method-platform' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/flow-method-platform' : '',
  experimental: {
    appDir: true
  }
}

module.exports = nextConfig