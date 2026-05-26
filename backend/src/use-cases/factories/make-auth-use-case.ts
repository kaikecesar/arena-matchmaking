// Application
import { UserRepository } from '../../repositories/user.ts';
import { AuthUseCase } from '../auth/auth.ts';

export function makeAuthUseCase() {
  const usersRepository = new UserRepository();
  const useCase = new AuthUseCase(usersRepository);

  return useCase;
}
