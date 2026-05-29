// Libraries
import { faker } from '@faker-js/faker';

export interface UserRegisterPayload {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export function buildUserRegisterPayload(
  overrides: Partial<UserRegisterPayload> = {},
): UserRegisterPayload {
  return {
    name: faker.internet.username(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    phone: faker.phone.number({ style: 'international' }),
    ...overrides,
  };
}
