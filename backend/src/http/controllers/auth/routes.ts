// Libraries
import type { FastifyInstance } from 'fastify';
import z from 'zod';

// Application
import { login } from './login.ts';
import { logout } from './logout.ts';
import { loginBodySchema } from '../../schemas/auth.ts';
import { errorResponseSchema } from '../../schemas/errors.ts';
import { authenticate } from '../../../middlewares/auth.ts';

export async function authRoutes(app: FastifyInstance) {
  app.post(
    '/login',
    {
      config: {
        rateLimit: { max: 5, timeWindow: '1 minute' },
      },
      schema: {
        tags: ['Login'],
        summary: 'Access application resources',
        body: loginBodySchema,
        response: {
          204: z.null(),
          401: errorResponseSchema.describe('Invalid credentials provided'),
          429: errorResponseSchema.describe('Too many requests'),
          500: errorResponseSchema.describe('Internal server error'),
        },
      },
    },
    login,
  );

  app.post(
    '/logout',
    {
      preHandler: authenticate,
      schema: {
        tags: ['Logout'],
        summary: 'Revoke access to application resources',
        response: {
          204: z.null(),
          401: errorResponseSchema.describe('Authentication required'),
          500: errorResponseSchema.describe('Internal server error'),
        },
      },
    },
    logout,
  );
}
