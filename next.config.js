const withPWA = require('next-pwa')({
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
    runtimeCaching: [
        {
            urlPattern: /^https:\/\/.*\.supabase\.co\/.*/i,
            handler: 'NetworkFirst',
            options: {
                cacheName: 'supabase-cache',
                expiration: {
                    maxEntries: 32,
                    maxAgeSeconds: 24 * 60 * 60 // 24 hours
                }
            }
        },
        {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/i,
            handler: 'CacheFirst',
            options: {
                cacheName: 'image-cache',
                expiration: {
                    maxEntries: 64,
                    maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
                }
            }
        }
    ]
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    i18n: {
        locales: ['en', 'hi', 'gu', 'mr', 'pa', 'ta'],
        defaultLocale: 'hi',
        localeDetection: false
    },
    images: {
        domains: ['*.supabase.co'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.supabase.co'
            }
        ]
    }
};

module.exports = withPWA(nextConfig);
