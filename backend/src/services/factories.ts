// Application
import { UserRepository } from '../repositories/user.ts';
import { RegisterUser } from './user/user.ts';

export function factoryRegisterUser() {
  const usersRepository = new UserRepository();
  const useCase = new RegisterUser(usersRepository);

  return useCase;
}
