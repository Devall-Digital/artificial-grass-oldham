/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['artificialgrassoldham.co.uk'],
    formats: ['image/avif', 'image/webp'],
  },
  // Enable static exports for better performance
  output: 'standalone',
}

module.exports = nextConfig