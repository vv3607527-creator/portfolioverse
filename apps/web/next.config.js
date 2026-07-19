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
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Force sql.js to be treated as CommonJS (not ESM)
      // sql.js has an "exports" field in package.json that makes webpack treat it as ESM,
      // but its code uses module.exports which crashes when bundled as ESM
      config.module.rules.push({
        test: /node_modules[\\/].*sql\.js[\\/].*sql-wasm\.js$/,
        type: "javascript/auto",
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
