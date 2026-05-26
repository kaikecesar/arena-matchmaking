// Libraries
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

// Application
import { env } from '../env/index.ts';
import * as schema from './schema/index.ts';

export const pool = new Pool({
  connectionString: env.DATABASE_URL,
  // ssl: true  // turn on when up to RDS on AWS
});

export const database = drizzle({ client: pool, schema });
