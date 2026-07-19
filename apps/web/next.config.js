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
    serverComponentsExternalPackages: ["@portfolio/db"],
    outputFileTracingIncludes: {
      "/**": [
        "./node_modules/sql.js/dist/sql-wasm.js",
        "./node_modules/sql.js/dist/sql-wasm.wasm",
      ],
    },
  },
  images: {
    domains: ["img.clerk.com"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
