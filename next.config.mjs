/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: "/eParivar", // staging
  assetPrefix: "/eParivar", // staging
  reactStrictMode: true,
  images: {
    domains: ["localhost", "himstaging2.hp.gov.in"], // staging
    // domains: ["localhost", ""], // local
  },
};

export default nextConfig;
