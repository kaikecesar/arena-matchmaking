// Libraries
import fastify from 'fastify';
import fastifySwagger from '@fastify/swagger';
import scalarPlugin from '@scalar/fastify-api-reference';
import fastifyRateLimit from '@fastify/rate-limit';
import {
  serializerCompiler,
  validatorCompiler,
  jsonSchemaTransform,
  hasZodFastifySchemaValidationErrors,
} from 'fastify-type-provider-zod';
import fastifyCookie from '@fastify/cookie';
import fastifyJwt from '@fastify/jwt';

// Application
import { env } from './env/index.ts';
import { pool } from './database/index.ts';
import { AppError } from './shared/errors/app-error.ts';
import { userRoutes } from './http/controllers/user/routes.ts';
import { authRoutes } from './http/controllers/auth/routes.ts';

const isProd = env.NODE_ENV === 'production';

export const app = fastify({
  logger: isProd
    ? true
    : {
        level: 'debug',
        transport: {
          target: 'pino-pretty',
          options: { translateTime: 'HH:MM:ss', ignore: 'pid,hostname' },
        },
      },
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCookie);

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'token',
    signed: false,
  },
});

app.addHook('onClose', async () => {
  await pool.end();
});

await app.register(fastifyRateLimit, {
  max: 100,
  timeWindow: '1 minute',
});

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

app.register(userRoutes, { prefix: '/api/v1' });
app.register(authRoutes, { prefix: '/api/v1' });

app.setErrorHandler((error, request, reply) => {
  if (hasZodFastifySchemaValidationErrors(error)) {
    return reply.status(400).send({
      code: 'VALIDATION_ERROR',
      message: 'Request validation failed.',
      issues: error.validation.map((issue) => ({
        path: issue.instancePath.split('/').filter(Boolean),
        message: issue.message ?? 'Invalid value',
      })),
    });
  }

  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({
      code: error.code,
      message: error.message,
    });
  }

  request.log.error(error);

  // TODO: ship to external observability (Datadog/Sentry) in production

  return reply.status(500).send({
    code: 'INTERNAL_SERVER_ERROR',
  });
});
