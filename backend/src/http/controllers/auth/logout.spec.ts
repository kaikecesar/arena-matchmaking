// Libraries
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

// Application
import { app } from '../../../app.ts';
import { registerAndLogin } from '../../../test/helpers/auth.ts';

describe('Logout (e2e)', () => {
  beforeAll(async () => await app.ready());
  afterAll(async () => await app.close());

  it('should be able to logout', async () => {
    const agent = await registerAndLogin(app);

    const response = await agent.post('/api/v1/logout').send();

    expect(response.statusCode).toEqual(204);
  });
});
