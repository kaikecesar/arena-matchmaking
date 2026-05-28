// Libraries
import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    dir: 'src',
    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          dir: 'src/use-cases',
          exclude: ['**/*.integration.spec.ts'],
        },
      },
      {
        extends: true,
        test: {
          name: 'integration',
          dir: 'src',
          include: ['**/*.integration.spec.ts'],
          environment: './src/test/vitest-environment-drizzle.ts',
        },
      },
      {
        extends: true,
        test: {
          name: 'e2e',
          dir: 'src/http/controllers',
          exclude: ['**/*.integration.spec.ts'],
          environment: './src/test/vitest-environment-drizzle.ts',
        },
      },
    ],
  },
});
