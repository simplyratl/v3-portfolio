/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  compress: true,
  images: {
    domains: [
      "api.microlink.io", // Microlink Image Preview,
      "pbs.twimg.com",
      "images.unsplash.com",
      "assets.aceternity.com",
    ],
  },
};

export default nextConfig;
