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

describe('Register (e2e)', () => {
  beforeAll(async () => await app.ready());
  afterAll(async () => await app.close());

  it('should be able to register an user', async () => {
    const response = await request(app.server)
      .post('/api/v1/users')
      .send({
        name: faker.internet.username(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        phone: faker.phone.number({ style: 'international' }),
      });

    expect(response.statusCode).toEqual(201);
  });
});
