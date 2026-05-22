// Libraries
import fastify from 'fastify';
import fastifySwagger from '@fastify/swagger';
import scalarPlugin from '@scalar/fastify-api-reference';
import { ZodError } from 'zod';
import {
  serializerCompiler,
  validatorCompiler,
  jsonSchemaTransform,
} from 'fastify-type-provider-zod';

// Application
import { env } from './env/index.ts';
import { userRoutes } from './controllers/user/routes.ts';

export const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

// Generate spec OpenAPI
await app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Arena Matchmaking API',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
});

await app.register(scalarPlugin, {
  routePrefix: '/docs',
});

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
