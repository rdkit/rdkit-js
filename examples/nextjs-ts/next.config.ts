import CopyPlugin from "copy-webpack-plugin";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack(config, { isServer }) {
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: "node_modules/@rdkit/rdkit/dist/RDKit_minimal.wasm",
            to: "static/chunks"
          }
        ]
      })
    );

    if (!isServer) {
      config.resolve.fallback = {
        fs: false
      };
    }

    return config;
  }
};

export default nextConfig;
