/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    "@portfolio/db",
    "@portfolio/ui",
    "@react-three/drei",
    "@react-three/fiber",
    "@react-three/postprocessing",
    "three",
  ],
  experimental: {
    serverComponentsExternalPackages: [],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Force sql.js to be treated as CommonJS (not ESM)
      // sql.js has "exports" in package.json without a "require" condition,
      // which makes webpack treat it as ESM, but the code uses module.exports
      config.module.rules.push({
        test: /node_modules[\\/]\.pnpm[\\/]sql\.js@[^\\]+[\\/]node_modules[\\/]sql\.js[\\/]dist[\\/]sql-wasm\.js$/,
        type: "javascript/dynamic",
      });
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
