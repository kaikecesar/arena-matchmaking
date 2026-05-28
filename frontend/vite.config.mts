/// <reference types="vitest/config" />

import { fileURLToPath } from 'node:url'

import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiProxyTarget = env.VITE_API_PROXY_TARGET?.trim()

  if (command === 'serve' && !apiProxyTarget) {
    throw new Error(
      'Defina VITE_API_PROXY_TARGET no .env (URL do backend para o proxy /api).',
    )
  }

  return {
    plugins: [react()],
    server: {
      proxy: !apiProxyTarget
        ? undefined
        : {
            '/api': {
              target: apiProxyTarget,
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
  }
})
