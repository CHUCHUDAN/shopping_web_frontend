import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  server: {
    host: true,
    watch: {
      usePolling: true,
    },
  },
  plugins: [
    vue(),
  ],
  base: "/shopping_web_frontend/",
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
