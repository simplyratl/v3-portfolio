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
      "nikicaraznatovic-portfolio.s3.eu-central-1.amazonaws.com",
    ],
  },
};

export default nextConfig;
