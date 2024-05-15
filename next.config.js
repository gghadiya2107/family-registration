// next.config.js
const { i18n } = require('./next-i18next.config')

const nextConfig = {
  reactStrictMode: true,
  basePath: "/urbanregister", // staging
  assetPrefix: "/urbanregister", // staging
  reactStrictMode: true,
  images: {
    domains: ["localhost", "himstaging2.hp.gov.in"], // staging
    // domains: ["localhost", ""], // local
  },
  flags: {
    DEV_SSR: false,
  },
  i18n
};

module.exports = nextConfig;
