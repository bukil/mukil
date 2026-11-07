module.exports = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/models/optimized/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }
        ]
      }
    ]
  }
}
