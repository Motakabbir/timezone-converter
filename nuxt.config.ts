export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/image',
    'nuxt-simple-sitemap',
    'nuxt-simple-robots',
    '@vite-pwa/nuxt'
  ],

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      title: 'Time Zone Converter',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Convert time across different time zones easily with our modern time zone converter tool.' },
        { property: 'og:title', content: 'Time Zone Converter' },
        { property: 'og:description', content: 'Convert time across different time zones easily with our modern time zone converter tool.' },
        { property: 'og:type', content: 'website' },
        { name: 'theme-color', content: '#0284c7' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light'
  },

  image: {
    quality: 80,
    format: ['webp']
  },

  site: {
    url: 'https://timezone-converter.com'
  },

  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Time Zone Converter',
      short_name: 'TimeZones',
      theme_color: '#0284c7',
      background_color: '#ffffff',
      display: 'standalone',
      orientation: 'portrait',
      scope: '/',
      start_url: '/',
      icons: [
        {
          src: 'icons/icon-72x72.png',
          sizes: '72x72',
          type: 'image/png'
        },
        {
          src: 'icons/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'icons/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable'
        }
      ]
    },
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,svg,ico}']
    }
  },

  experimental: {
    payloadExtraction: true,
    renderJsonPayloads: true,
    viewTransition: true
  },

  routeRules: {
    '/': { prerender: true },
    '/about': { prerender: true },
    '/privacy': { prerender: true },
    '/terms': { prerender: true }
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/']
    },
    compressPublicAssets: true
  },

  build: {
    transpile: ['luxon']
  },

  vite: {
    build: {
      cssMinify: true,
      rollupOptions: {
        output: {
          manualChunks: {
            luxon: ['luxon'],
            webVitals: ['web-vitals']
          }
        }
      }
    },
    optimizeDeps: {
      include: ['luxon', 'web-vitals']
    }
  },

  typescript: {
    strict: true,
    typeCheck: true
  },

  compatibilityDate: '2025-02-26'
})