import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,
  // 画像最適化の設定
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "images.microcms-assets.io",
      },
    ],
  },
  compiler: {
    // 本番環境ではconsole.logを削除する
    removeConsole: process.env.NODE_ENV === "production",
  },
};
export default nextConfig;
