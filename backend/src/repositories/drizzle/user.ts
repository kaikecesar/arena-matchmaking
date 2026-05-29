// Libraries
import { eq } from 'drizzle-orm';

// Application
import { database } from '../../database/index.ts';
import { usersTable } from '../../database/schema/users.ts';
import { UserAlreadyExistsError } from '../../domain/user/errors.ts';
import { isPgUniqueViolation } from '../../shared/db/postgres-errors.ts';
import type { IUserRepository, NewUser, User } from '../types/user.ts';

export class UserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const [user] = await database
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));
    return user ?? null;
  }

  async create(data: NewUser): Promise<User> {
    try {
      const [user] = await database.insert(usersTable).values(data).returning();

      if (!user) throw new Error('Failed to create user');

      return user;
    } catch (err) {
      if (isPgUniqueViolation(err, 'users_email_unique')) {
        throw new UserAlreadyExistsError();
      }
      throw err;
    }
  }
}
