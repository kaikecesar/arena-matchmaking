// Libraries
import request from 'supertest';
import type { FastifyInstance } from 'fastify';

// Application
import { buildUserRegisterPayload } from '../builders/user.ts';

export async function registerAndLogin(app: FastifyInstance) {
  const agent = request.agent(app.server);
  const user = buildUserRegisterPayload();

  await agent.post('/api/v1/users').send(user);
  await agent.post('/api/v1/login').send({
    email: user.email,
    password: user.password,
  });

  return agent;
}
