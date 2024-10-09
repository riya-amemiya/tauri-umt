/** @type {import('next').NextConfig} */
const nextConfig = {
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
  experimental: {
    instrumentationHook: true,
  },
};
export default nextConfig;
