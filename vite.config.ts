import { svelte } from '@sveltejs/vite-plugin-svelte';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import svgr from "vite-plugin-svgr";
// https://vite.dev/config/
export default defineConfig({
   server: {
    hmr: true,
    host: "0.0.0.0",
  },
  plugins: [
    svelte(),
    svgr(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'logo_an.svg', 'robots.txt'],
      manifest: { 
        name: 'Akmad Nudin — Full Stack Engineer',
        short_name: 'AN Dev',
        description: 'Portfolio of Akmad Nudin — Full Stack Engineer',
        theme_color: '#0B0F1A',
        background_color: '#0B0F1A',
        display: 'standalone',
        start_url: '/',
        icons: [
          { src: '/pwa-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/pwa-512.png', sizes: '512x512', type: 'image/png' },
          { src: '/pwa-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
        screenshots: [
          { src: '/screenshot/mobile.png', sizes: '540x720', type: 'image/png' },
          { src: '/screenshot/desktop.png', sizes: '1280x720', type: 'image/png', form_factor: 'wide' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,jpg,webp,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/[^/]+\.supabase\.co\/rest\/v1\//,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'portfolio-data',
              expiration: { maxEntries: 80, maxAgeSeconds: 86400 },
              networkTimeoutSeconds: 5,
            },
          },
        ],
      },
    }),
  ],
})
