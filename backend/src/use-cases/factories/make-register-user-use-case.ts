// Application
import { UserRepository } from '../../repositories/drizzle/user.ts';
import { RegisterUserUseCase } from '../user/register.ts';

export function makeRegisterUserUseCaseUseCase() {
  const usersRepository = new UserRepository();
  const useCase = new RegisterUserUseCase(usersRepository);

  return useCase;
}
