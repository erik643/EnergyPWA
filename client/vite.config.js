import { fileURLToPath, URL } from 'url';
import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';
import manifest from './mainfest.js';
import { resolve } from 'path';
import { rm } from 'node:fs/promises';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8080,
    proxy: {
      '/energy': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/images': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/img': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/webfonts': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/user': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/users': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
  preview: {
    port: 5555,
    // proxy: {
    //   '/energy': {
    //     target: 'http://localhost:3000',
    //     changeOrigin: true,
    //   },
    // },
  },
  build: {
    outDir: '../Server/public',
    emptyOutDir: false,
  },
  plugins: [
    {
      name: 'Cleaning assets folder',
      async buildStart() {
        // eslint-disable-next-line no-undef
        await rm(resolve(__dirname, '../Server/public/assets'), { recursive: true, force: true });
      },
    },
    vue({
      template: { transformAssetUrls },
    }),
    quasar({
      sassVariables: 'src/quasar-variables.sass',
    }),

    VitePWA({
      registerType: 'autoUpdate',
      manifest,
      includeAssets: ['**/*.{js,css,html,jpg,ico,png,ttf,woff2}'],
      workbox: {
        mode: 'development',
        runtimeCaching: [
          {
            urlPattern: /.*images\/uploads\/*.*.png/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'Eriks-Bilder',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 1, // <== 1 day
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: '/energy',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'Eriks-Energys',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 1, // <== 1 day
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
