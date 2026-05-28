// Libraries
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

// Application
import { app } from '../../../app.ts';
import { buildUserRegisterPayload } from '../../../test/builders/user.ts';

describe('Register User (e2e)', () => {
  beforeAll(async () => await app.ready());
  afterAll(async () => await app.close());

  it('should be able to register a user', async () => {
    const response = await request(app.server)
      .post('/api/v1/users')
      .send(buildUserRegisterPayload());

    expect(response.statusCode).toEqual(201);
  });
});
