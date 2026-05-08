import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.taboola.com" },
      { protocol: "http", hostname: "cdn.taboola.com" },
      { protocol: "https", hostname: "**.taboola.com" },
      { protocol: "https", hostname: "images.outbrain.com" },
      { protocol: "https", hostname: "**.outbrain.com" },
      { protocol: "https", hostname: "**.outbrainimg.com" },
      { protocol: "https", hostname: "**.mgid.com" },
      { protocol: "https", hostname: "servicer.mgid.com" },
      { protocol: "https", hostname: "i.mgid.com" },
      { protocol: "https", hostname: "**.revcontent.com" },
      { protocol: "https", hostname: "img.revcontent.com" },
      { protocol: "https", hostname: "trends.revcontent.com" },
      { protocol: "https", hostname: "**.cloudfront.net" },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
