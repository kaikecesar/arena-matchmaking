/// <reference types="vitest/config" />

import { fileURLToPath } from 'node:url'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3333',
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    server: {
      deps: {
        inline: ['styled-components'],
      },
    },
    css: true,
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
    exclude: ['src/tests/e2e/**', 'node_modules/**'],
    coverage: {
      reporter: ['text', 'html'],
      exclude: ['src/setupTests.ts', 'src/tests/e2e/**'],
    },
  },
})
