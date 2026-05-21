// Libraries
import fastify from 'fastify';
import { ZodError } from 'zod';

// Application
import { env } from './env/index.ts';
import { userRoutes } from './controllers/user/routes.ts';

export const app = fastify();

app.register(userRoutes);

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error.',
      issues: error.format(),
    });
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error);
  } else {
    // TODO: should log to a external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({
    message: 'Internal server error.',
  });
});
