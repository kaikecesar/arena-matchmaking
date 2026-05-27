// Libraries
import request from 'supertest';
import {
  afterAll,
  beforeAll,
  describe,
  expect,
  it,
} from 'vitest';
import { faker } from '@faker-js/faker';

// Application
import { app } from '../../../app.ts';

describe('Login (e2e)', () => {
  beforeAll(async () => await app.ready());
  afterAll(async () => await app.close());

  it('should be able to login', async () => {
    const fakeUserEmail = faker.internet.email();
    const fakeUserPassword = faker.internet.password();

    await request(app.server)
      .post('/api/v1/users')
      .send({
        name: faker.internet.username(),
        email: fakeUserEmail,
        password: fakeUserPassword,
        phone: faker.phone.number({ style: 'international' }),
      });

    const response = await request(app.server).post('/api/v1/login').send({
      email: fakeUserEmail,
      password: fakeUserPassword,
    });

    expect(response.statusCode).toEqual(204);
  });
});
