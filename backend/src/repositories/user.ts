// Libraries
import { eq } from 'drizzle-orm';

// Application
import { database } from '../database/index.ts';
import { usersTable } from '../database/schema/users.ts';
import type { IUserRepository, NewUser, User } from './types/user.ts';

export class UserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const [user] = await database
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));
    return user ?? null;
  }

  async create(data: NewUser): Promise<User> {
    const [user] = await database.insert(usersTable).values(data).returning();

    if (!user) throw new Error('Failed to create user');

    return user;
  }
}
