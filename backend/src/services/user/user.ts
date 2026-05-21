// Libraries
import { hash } from 'bcryptjs';

// Application
import type { IUserRepository } from '../../repositories/types/user.ts';
import { UserAlreadyExistsError } from '../errors.ts';
import type { usersTable } from '../../database/schema/users.ts';
import { env } from '../../env/index.ts';

type User = typeof usersTable.$inferSelect;
export type SafeUser = Omit<User, 'passwordHash'>;

// Register
interface RegisterUserRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
}

interface RegisterUserResponse {
  user: SafeUser;
}

export class RegisterUser {
  constructor(private userRepository: IUserRepository) {}

  async execute({
    name,
    email,
    password,
    phone,
  }: RegisterUserRequest): Promise<RegisterUserResponse> {
    // Validate
    const userWithSameEmail = await this.userRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    // Create password hash
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
