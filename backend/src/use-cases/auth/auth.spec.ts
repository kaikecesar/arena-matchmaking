// Libraries
import { faker } from '@faker-js/faker';
import {
  describe,
  it,
  beforeEach,
  expect,
} from 'vitest';

// Application
import { InMemoryUserRepository } from '../../repositories/in-memory/user.ts';
import { AuthUseCase } from './auth.ts';
import { InvalidCredentialsError } from '../../domain/auth/errors.ts';
import { hash } from 'bcryptjs';

describe('auth use case', () => {
  describe('auth', () => {
    let userRepository: InMemoryUserRepository;
    let auth: AuthUseCase;

    beforeEach(() => {
      userRepository = new InMemoryUserRepository();
      auth = new AuthUseCase(userRepository);
    });

    it('should be able to authenticate an user', async () => {
      const fakePassword = faker.internet.password();
      const fakeEmail = faker.internet.email();

      await userRepository.create({
        name: faker.person.fullName(),
        email: fakeEmail,
        passwordHash: await hash(fakePassword, 6),
        phone: faker.phone.number(),
      });

      const { user } = await auth.execute({
        email: fakeEmail,
        password: fakePassword,
      });

      expect(user.id).toEqual(expect.any(String));
    });

    it('should not be able to authenticate with wrong e-mail', async () => {
      await expect(() =>
        auth.execute({
          email: faker.internet.email(),
          password: faker.internet.password(),
        }),
      ).rejects.toBeInstanceOf(InvalidCredentialsError);
    });

    it('should not be able to authenticate with wrong password', async () => {
      await userRepository.create({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        passwordHash: await hash(faker.internet.password(), 6),
        phone: faker.phone.number(),
      });

      await expect(() =>
        auth.execute({
          email: faker.internet.email(),
          password: faker.internet.password(),
        }),
      ).rejects.toBeInstanceOf(InvalidCredentialsError);
    });
  });
});
