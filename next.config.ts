import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
      };
      config.resolve.alias = {
        ...config.resolve.alias,
        'react-native$': false,
        'react-native-sqlite-storage': false,
        'react-native-fs': false,
        'react-native-fetch-blob': false,
      };
    }
    // Also ignore these for server-side bundling where they might fail
    config.externals = [...(config.externals || []), "react-native-sqlite-storage", "react-native-fs", "react-native-fetch-blob", "react-native"];
    return config;
  },
};

export default nextConfig;
