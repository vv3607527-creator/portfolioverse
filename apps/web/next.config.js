/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    "@portfolio/ui",
    "@portfolio/db",
    "@react-three/drei",
    "@react-three/fiber",
    "@react-three/postprocessing",
    "three",
  ],
  images: {
    domains: ["img.clerk.com"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
