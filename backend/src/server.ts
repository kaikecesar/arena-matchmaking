// Libraries
import fastify from 'fastify';

// Application
import { env } from './env/index.ts';

const app = fastify();

app.listen({ host: '0.0.0.0', port: env.PORT }, () =>
  console.log('🚀 HTTP Server Running!'),
);
