import('next').NextConfig
const nextConfig = {  
}

// next.config.js
module.exports = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://localhost:8081/:path*', // Substitua pelo URL da API externa
        },
      ]
    },
  }