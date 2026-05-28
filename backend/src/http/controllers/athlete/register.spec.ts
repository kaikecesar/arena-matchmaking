// Libraries
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { faker } from '@faker-js/faker';

// Application
import { app } from '../../../app.ts';
import {
  ATHLETE_DOCUMENT_TYPE_VALUES,
  ATHLETE_SEX_VALUES,
} from '../../../shared/enums/athlete.ts';

function buildAthletePayload(overrides: Record<string, unknown> = {}) {
  return {
    birthDate: faker.date.past({ years: 30 }).toISOString().split('T')[0],
    sex: ATHLETE_SEX_VALUES[0],
    documentType: ATHLETE_DOCUMENT_TYPE_VALUES[0],
    documentValue: faker.string.numeric(11),
    ...overrides,
  };
}

async function registerAndLogin() {
  const agent = request.agent(app.server);
  const email = faker.internet.email();
  const password = faker.internet.password();

  await agent.post('/api/v1/users').send({
    name: faker.internet.username(),
    email,
    password,
    phone: faker.phone.number({ style: 'international' }),
  });

  await agent.post('/api/v1/login').send({ email, password });

  return agent;
}

describe('Register Athlete (e2e)', () => {
  beforeAll(async () => await app.ready());
  afterAll(async () => await app.close());

  it('should be able to register an athlete', async () => {
    const agent = await registerAndLogin();

    const response = await agent
      .post('/api/v1/athletes')
      .send(buildAthletePayload());

    expect(response.statusCode).toEqual(201);
  });

  it('should not be able to register an athlete without authentication', async () => {
    const response = await request(app.server)
      .post('/api/v1/athletes')
      .send(buildAthletePayload());

    expect(response.statusCode).toEqual(401);
    expect(response.body.code).toEqual('AUTH_UNAUTHORIZED');
  });

  it('should not be able to register a second athlete for the same user', async () => {
    const agent = await registerAndLogin();

    await agent.post('/api/v1/athletes').send(buildAthletePayload());

    const response = await agent
      .post('/api/v1/athletes')
      .send(buildAthletePayload());

    expect(response.statusCode).toEqual(409);
    expect(response.body.code).toEqual('ATHLETE_ALREADY_REGISTERED');
  });
});
