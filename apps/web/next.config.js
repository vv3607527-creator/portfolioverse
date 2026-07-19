/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    "@portfolio/ui",
    "@react-three/drei",
    "@react-three/fiber",
    "@react-three/postprocessing",
    "three",
  ],
  experimental: {
    serverComponentsExternalPackages: ["@portfolio/db", "sql.js"],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = [...config.externals, "sql.js"];
    }
    return config;
  },
  images: {
    domains: ["img.clerk.com"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
