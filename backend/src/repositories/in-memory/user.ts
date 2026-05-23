// Application
import { randomUUID } from 'node:crypto';
import type { IUserRepository, NewUser, User } from '../types/index.ts';

export class InMemoryUserRepository implements IUserRepository {
  public records: User[] = [];

  async create(data: NewUser): Promise<User> {
    const user: User = {
      name: data.name,
      email: data.email,
      passwordHash: data.passwordHash,
      phone: data.phone ?? null,
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
      emailVerifiedAt: null,
    };

    this.records.push(user);

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.records.find((record) => record.email === email);

    return user ?? null;
  }
}
