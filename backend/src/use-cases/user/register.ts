// Libraries
import { hash } from 'bcryptjs';

// Application
import type { IUserRepository } from '../../repositories/types/user.ts';
import type { usersTable } from '../../database/schema/users.ts';
import { env } from '../../env/index.ts';

type User = typeof usersTable.$inferSelect;
export type SafeUser = Omit<User, 'passwordHash'>;

interface RegisterUserUseCaseRequest {
  name: string;
  email: string;
  password: string;
  phone: string | null;
}

interface RegisterUserUseCaseResponse {
  user: SafeUser;
}

export class RegisterUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({
    name,
    email,
    password,
    phone,
  }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
    const passwordHash = await hash(
      password,
      env.NODE_ENV === 'production' ? 12 : 6,
    );

    const user = await this.userRepository.create({
      name,
      email,
      passwordHash,
      phone,
    });

    const { passwordHash: _, ...safeUser } = user;

    return { user: safeUser };
  }
}
