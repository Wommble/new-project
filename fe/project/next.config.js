/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "http://localhost:3000/",
      "https://firebasestorage.googleapis.com/",
    ],
  },
};

module.exports = nextConfig;
