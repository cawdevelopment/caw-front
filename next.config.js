/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig


// /* eslint-disable @typescript-eslint/no-var-requires */
// const withTM = require('next-transpile-modules')([

// ]);

// module.exports = withTM({
//   swcMinify: false,
//   trailingSlash: true,
//   reactStrictMode: true,
//   env: {
//     NEXT_PUBLIC_ALCHEMY_HTTPS_KEY: process.env.NEXT_PUBLIC_ALCHEMY_HTTPS_KEY,
//     CAW: process.env.NEXT_CAW_SM_ADDRESS,
//     CAW_NAMES: process.env.NEXT_CAWNAMES_SM_ADDRESS,
//   },
// });
