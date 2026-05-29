// Libraries
import { faker } from '@faker-js/faker';
import { afterAll, describe, expect, it } from 'vitest';

// Application
import { UserRepository } from './user.ts';
import { UserAlreadyExistsError } from '../../domain/user/errors.ts';
import { pool } from '../../database/index.ts';

const repository = new UserRepository();

function buildUserRow(overrides: Partial<{ email: string }> = {}) {
  return {
    name: faker.person.fullName(),
    email: overrides.email ?? faker.internet.email(),
    passwordHash: 'placeholder-hash',
    phone: faker.phone.number({ style: 'international' }),
  };
}

describe('UserRepository (integration)', () => {
  afterAll(async () => {
    await pool.end();
  });

  it('should create a user', async () => {
    const user = await repository.create(buildUserRow());

    expect(user.id).toEqual(expect.any(String));
  });

  it('should throw UserAlreadyExistsError when the email is already in use', async () => {
    const email = faker.internet.email();

    await repository.create(buildUserRow({ email }));

    await expect(
      repository.create(buildUserRow({ email })),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
