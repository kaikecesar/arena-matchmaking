// Libraries
import type { FastifyInstance } from 'fastify';
import z from 'zod';

// Application
import { register } from './register.ts';
import { registerAthleteBodySchema } from '../../schemas/athlete.ts';
import {
  errorResponseSchema,
  validationErrorResponseSchema,
} from '../../schemas/errors.ts';
import { authenticate } from '../../../middlewares/auth.ts';

export async function athleteRoutes(app: FastifyInstance) {
  app.addHook('onRequest', authenticate);

  app.post(
    '/athletes',
    {
      config: {
        rateLimit: { max: 5, timeWindow: '1 minute' },
      },
      schema: {
        tags: ['Athletes'],
        summary: 'Register a new athlete profile for the authenticated user',
        body: registerAthleteBodySchema,
        response: {
          201: z.null(),
          400: validationErrorResponseSchema.describe('Validation error'),
          401: errorResponseSchema.describe('Authentication required'),
          409: errorResponseSchema.describe(
            'User already has an athlete profile or document already in use',
          ),
          429: errorResponseSchema.describe('Too many requests'),
          500: errorResponseSchema.describe('Internal server error'),
        },
      },
    },
    register,
  );
}
