import path from 'path';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  server: {
    host: '::',
    port: 3000,
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'assets/apple-touch-icon.png'],
      manifestFilename: 'manifest.webmanifest',
      manifest: {
        name: 'Linqo',
        short_name: 'Linqo',
        description: 'Open chats without saving contacts.',
        id: '/',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        background_color: '#0b141a',
        theme_color: '#52c658',
        icons: [
          {
            src: '/assets/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/assets/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/assets/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
        screenshots: [
          {
            src: '/assets/screenshot-wide.png',
            sizes: '1024x1024',
            type: 'image/png',
            form_factor: 'wide',
            label: 'Desktop preview',
          },
          {
            src: '/assets/screenshot-mobile.png',
            sizes: '512x512',
            type: 'image/png',
            label: 'Mobile preview',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
