// Libraries
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { faker } from '@faker-js/faker';

// Application
import { app } from '../../../app.ts';

describe('Logout (e2e)', () => {
  beforeAll(async () => await app.ready());
  afterAll(async () => await app.close());

  it('should be able to logout', async () => {
    const fakeUserEmail = faker.internet.email();
    const fakeUserPassword = faker.internet.password();
    const agent = request.agent(app.server);

    await agent.post('/api/v1/users').send({
      name: faker.internet.username(),
      email: fakeUserEmail,
      password: fakeUserPassword,
      phone: faker.phone.number({ style: 'international' }),
    });

    await agent.post('/api/v1/login').send({
      email: fakeUserEmail,
      password: fakeUserPassword,
    });

    const response = await agent.post('/api/v1/logout').send();

    expect(response.statusCode).toEqual(204);
  });

  it('should not be able to logout without a token', async () => {
    const response = await request(app.server).post('/api/v1/logout').send();

    expect(response.statusCode).toEqual(401);
    expect(response.body.code).toEqual('AUTH_UNAUTHORIZED');
  });
});
