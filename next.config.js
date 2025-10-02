/** @type {import('next').NextConfig} */
const nextConfig = {
  // Skip linting during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // Basic image config
  images: {
    dangerouslyAllowSVG: true,
  },
}

module.exports = nextConfig
