/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [ 'images.unsplash.com', 'https://pbs.twimg.com', 'https://picsum.photos', 'https://caw.is', 'https://nightly-eyes.vercel' | 'https://teh-eyes.vercel' ],
  },
  env: {
    NETWORK: process.env.NETWORK,
    INFURA_API_KEY: process.env.INFURA_API_KEY,
    ALCHEMY_API_KEY: process.env.ALCHEMY_API_KEY,
    CAW_CONTRACT: process.env.CAW_CONTRACT,
    CAW_NAME_CONTRACT: process.env.CAW_NAME_CONTRACT,
    CAW_NAME_MINTER_CONTRACT: process.env.CAW_NAME_MINTER_CONTRACT,
    MINTABLE_CAW_CONTRACT: process.env.MINTABLE_CAW_CONTRACT,
  },
}

module.exports = nextConfig