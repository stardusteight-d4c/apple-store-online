/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = {
  images: {
    domains: ['cdn.sanity.io', 'lh3.googleusercontent.com'],
  },
}
