// Libraries
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

// Application
import { app } from '../../../app.ts';
import { buildUserRegisterPayload } from '../../../test/builders/user.ts';

describe('Login (e2e)', () => {
  beforeAll(async () => await app.ready());
  afterAll(async () => await app.close());

  it('should be able to login', async () => {
    const user = buildUserRegisterPayload();

    await request(app.server).post('/api/v1/users').send(user);

    const response = await request(app.server).post('/api/v1/login').send({
      email: user.email,
      password: user.password,
    });

    expect(response.statusCode).toEqual(204);
  });
});
