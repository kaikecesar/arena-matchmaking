// Libraries
import type { FastifyInstance } from 'fastify';

// Application
import { register } from './register.ts';

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', register);
}
