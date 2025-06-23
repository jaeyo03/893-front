// next.config.mjs
import bundleAnalyzerPkg from "@next/bundle-analyzer";

// analyzer 플러그인 초기화
const withBundleAnalyzer = bundleAnalyzerPkg({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'palgoosam-bucket.s3.ap-northeast-2.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'static.toss.im',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default withBundleAnalyzer(nextConfig);
