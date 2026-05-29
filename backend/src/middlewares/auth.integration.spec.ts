// Libraries
import fastify, { type FastifyInstance } from 'fastify';
import fastifyCookie from '@fastify/cookie';
import fastifyJwt from '@fastify/jwt';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

// Application
import { authenticate } from './auth.ts';
import { env } from '../env/index.ts';

async function buildTestApp(): Promise<FastifyInstance> {
  const app = fastify({ logger: false });

  await app.register(fastifyCookie);
  await app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    cookie: { cookieName: 'token', signed: false },
  });

  app.get('/protected', { preHandler: authenticate }, async (req) => ({
    sub: req.user.sub,
  }));

  await app.ready();
  return app;
}

describe('authenticate middleware (integration)', () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = await buildTestApp();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should reject the request when no cookie is present', async () => {
    const response = await request(app.server).get('/protected');

    expect(response.statusCode).toEqual(401);
    expect(response.body.code).toEqual('AUTH_UNAUTHORIZED');
  });

  it('should reject the request when the token is invalid', async () => {
    const response = await request(app.server)
      .get('/protected')
      .set('Cookie', 'token=not-a-valid-jwt');

    expect(response.statusCode).toEqual(401);
    expect(response.body.code).toEqual('AUTH_UNAUTHORIZED');
  });

  it('should populate request.user.sub when a valid token is provided', async () => {
    const fakeUserId = 'a8d3e6b8-1c2d-4f6e-9c3a-2b1d4f6e9c3a';
    const token = app.jwt.sign({ sub: fakeUserId });

    const response = await request(app.server)
      .get('/protected')
      .set('Cookie', `token=${token}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({ sub: fakeUserId });
  });
});
