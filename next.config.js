/** @type {import('next').NextConfig} */
const wpHost = (() => {
  try {
    return process.env.WORDPRESS_URL ? new URL(process.env.WORDPRESS_URL).hostname : null;
  } catch {
    return null;
  }
})();

const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
  },
};

module.exports = nextConfig;

