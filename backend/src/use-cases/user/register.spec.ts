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
import { RegisterUserUseCase } from './register.ts';

describe('User use case', () => {
  describe('register', () => {
    let userRepository: InMemoryUserRepository;
    let registerUser: RegisterUserUseCase;

    beforeEach(() => {
      userRepository = new InMemoryUserRepository();
      registerUser = new RegisterUserUseCase(userRepository);
    });

    it('should be able to register an user', async () => {
      const fakePassword = faker.internet.password();

      const { user } = await registerUser.execute({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: fakePassword,
        phone: faker.phone.number(),
      });

      expect(user.id).toEqual(expect.any(String));
    });
  });
});
