/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    "@portfolio/ui",
    "@react-three/drei",
    "@react-three/fiber",
    "@react-three/postprocessing",
    "three",
  ],
  serverExternalPackages: ["sql.js"],
  images: {
    domains: ["img.clerk.com"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
