import { fileURLToPath, URL } from 'url';
import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';
import manifest from './mainfest.js';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8080,
  },
  
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),
    quasar({
      sassVariables: 'src/quasar-variables.sass',
    }),

    VitePWA({
      registerType: 'autoUpdate',
      manifest,
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,jpg,ttf,woff2,png}'],
        mode: 'dev',
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
