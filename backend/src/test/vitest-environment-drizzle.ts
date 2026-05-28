// Core
import { randomUUID } from 'node:crypto';
import { resolve } from 'node:path';

// Libraries
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Client } from 'pg';
import type { Environment } from 'vitest/environments';

function buildTestDatabaseUrl(databaseName: string): string {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL must be set to run e2e tests');
  }

  const url = new URL(process.env.DATABASE_URL);
  url.pathname = `/${databaseName}`;

  return url.toString();
}

export default <Environment>{
  name: 'drizzle',
  viteEnvironment: 'ssr',
  async setup() {
    const baseDatabaseUrl = process.env.DATABASE_URL;
    const databaseName = `test_${randomUUID().replace(/-/g, '_')}`;

    const adminClient = new Client({ connectionString: baseDatabaseUrl });
    await adminClient.connect();
    await adminClient.query(`CREATE DATABASE "${databaseName}"`);
    await adminClient.end();

    const testDatabaseUrl = buildTestDatabaseUrl(databaseName);
    process.env.DATABASE_URL = testDatabaseUrl;

    const migrationClient = new Client({ connectionString: testDatabaseUrl });
    await migrationClient.connect();
    await migrate(drizzle(migrationClient), {
      migrationsFolder: resolve(import.meta.dirname, '../database/migrations'),
    });
    await migrationClient.end();

    return {
      async teardown() {
        const teardownClient = new Client({
          connectionString: baseDatabaseUrl,
        });
        await teardownClient.connect();
        await teardownClient.query(
          `DROP DATABASE IF EXISTS "${databaseName}" WITH (FORCE)`,
        );
        await teardownClient.end();

        process.env.DATABASE_URL = baseDatabaseUrl;
      },
    };
  },
};
