// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'images.unsplash.com',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: '*.supabase.co',
            port: '',
            pathname: '/storage/v1/object/public/**',
          },
        ],
      },
    
    // Optimizaciones de performance
    compiler: {
      removeConsole: process.env.NODE_ENV === 'production',
    },
    
    // Configuración experimental
    experimental: {
      appDir: true,
      optimizeCss: true,
    },
    
    // Headers de seguridad
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: [
            {
              key: 'X-Frame-Options',
              value: 'DENY'
            },
            {
              key: 'X-Content-Type-Options',
              value: 'nosniff'
            },
            {
              key: 'Referrer-Policy',
              value: 'origin-when-cross-origin'
            }
          ]
        }
      ]
    }
  }
  
  module.exports = nextConfig