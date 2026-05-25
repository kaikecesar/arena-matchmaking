// Libraries
import { defineConfig } from 'drizzle-kit';

// Application
import { env } from './src/env/index.ts';

export default defineConfig({
  out: './src/database/migrations',
  schema: './src/database/schema/index.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  verbose: true,
  strict: true,
});
