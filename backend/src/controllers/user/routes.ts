// Libraries
import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import z from 'zod';

// Application
import { register, registerBodySchema } from './register.ts';
import { UserAlreadyExistsError } from '../../services/errors.ts';

export async function userRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/users',
    {
      schema: {
        tags: ['Users'],
        summary: 'Register a new user',
        body: registerBodySchema,
        response: {
          201: z.null(),
          409: z.object({ message: new UserAlreadyExistsError().message }),
        },
      },
    },
    register,
  );
}
