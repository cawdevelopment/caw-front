/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [ 'images.unsplash.com', 'https://pbs.twimg.com', 'https://picsum.photos', ],
  },
  env: {
    ALCHEMY_API_KEY: process.env.ALCHEMY_API_KEY,
    CAW: process.env.CAW_SM_ADDRESS,
    CAW_NAMES: process.env.CAWNAMES_SM_ADDRESS,
  },
}

module.exports = nextConfig