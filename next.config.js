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
      // Local mock images shipped with this repo
      { protocol: "https", hostname: "images.unsplash.com" },
      // Your WordPress media library, once WORDPRESS_URL is set in .env.local
      ...(wpHost ? [{ protocol: "https", hostname: wpHost }, { protocol: "http", hostname: wpHost }] : []),
    ],
  },
};

module.exports = nextConfig;
