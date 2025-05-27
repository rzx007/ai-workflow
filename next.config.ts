/** @type {import('next').NextConfig} */
const config = {
  serverExternalPackages: ["@mastra/*"],
  // 其他配置保持不变
  reactStrictMode: true,
  swcMinify: true,
};

export default config;
