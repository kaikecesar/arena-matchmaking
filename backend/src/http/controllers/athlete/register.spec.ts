// Libraries
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

// Application
import { app } from '../../../app.ts';
import { registerAndLogin } from '../../../test/helpers/auth.ts';
import { buildAthleteRegisterPayload } from '../../../test/builders/athlete.ts';

describe('Register Athlete (e2e)', () => {
  beforeAll(async () => await app.ready());
  afterAll(async () => await app.close());

  it('should be able to register an athlete', async () => {
    const agent = await registerAndLogin(app);

    const response = await agent
      .post('/api/v1/athletes')
      .send(buildAthleteRegisterPayload());

    expect(response.statusCode).toEqual(201);
  });
});
