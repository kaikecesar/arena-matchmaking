// Libraries
import type { FastifyInstance } from 'fastify';
import z from 'zod';

// Application
import { register, registerBodySchema } from './register.ts';
import { UserAlreadyExistsError } from '../../services/errors.ts';

export async function userRoutes(app: FastifyInstance) {
  app.post(
    '/users',
    {
      schema: {
        tags: ['Users'],
        summary: 'Register a new user',
        body: registerBodySchema,
        response: {
          201: z.null().describe('User registered successfully'),
          409: z
            .object({
              message: z
                .string()
                .describe(new UserAlreadyExistsError().message),
            })
            .describe('User already exists'),
        },
      },
    },
    register,
  );
}
