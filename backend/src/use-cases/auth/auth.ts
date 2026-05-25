// Libraries
import { compare } from 'bcryptjs';

// Application
import type { IUserRepository } from '../../repositories/types/user.ts';
import type { usersTable } from '../../database/schema/users.ts';
import { InvalidCredentialsError } from '../../domain/auth/errors.ts';

type User = typeof usersTable.$inferSelect;
export type SafeUser = Omit<User, 'passwordHash'>;

interface AuthUseCaseRequest {
  email: string;
  password: string;
}

interface AuthUseCaseResponse {
  user: SafeUser;
}

export class AuthUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({
    email,
    password,
  }: AuthUseCaseRequest): Promise<AuthUseCaseResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new InvalidCredentialsError();

    const doesPasswordMatches = await compare(password, user.passwordHash);

    if (!doesPasswordMatches) throw new InvalidCredentialsError();

    const { passwordHash: _unUsedPasswordHash, ...safeUser } = user;

    return { user: safeUser };
  }
}
