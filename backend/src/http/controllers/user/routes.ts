// Libraries
import type { FastifyInstance } from 'fastify';
import z from 'zod';

// Application
import { register } from './register.ts';
import { registerBodySchema } from '../../schemas/user.ts';
import {
  errorResponseSchema,
  validationErrorResponseSchema,
} from '../../schemas/errors.ts';

export async function userRoutes(app: FastifyInstance) {
  app.post(
    '/users',
    {
      config: {
        rateLimit: { max: 5, timeWindow: '1 minute' },
      },
      schema: {
        tags: ['Users'],
        summary: 'Register a new user',
        body: registerBodySchema,
        response: {
          201: z
            .object({ id: z.string().uuid() })
            .describe('User registered successfully'),
          400: validationErrorResponseSchema.describe('Validation error'),
          409: errorResponseSchema.describe('User already exists'),
          422: errorResponseSchema.describe('Domain validation error'),
          429: errorResponseSchema.describe('Too many requests'),
          500: errorResponseSchema.describe('Internal server error'),
        },
      },
    },
    register,
  );
}
