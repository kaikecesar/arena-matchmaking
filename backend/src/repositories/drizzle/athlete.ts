// Libraries
import { eq } from 'drizzle-orm';

// Application
import { database } from '../../database/index.ts';
import { athletesTable } from '../../database/schema/athletes.ts';
import { isPgUniqueViolation } from '../../shared/db/postgres-errors.ts';
import type {
  IAthleteRepository,
  NewAthlete,
  Athlete,
} from '../types/athlete.ts';
import {
  DocumentAlreadyInUseError,
  UserAlreadyHasAthleteError,
} from '../../domain/athlete/errors.ts';

export class AthleteRepository implements IAthleteRepository {
  async findById(id: string): Promise<Athlete | null> {
    const [athlete] = await database
      .select()
      .from(athletesTable)
      .where(eq(athletesTable.id, id));
    return athlete ?? null;
  }

  async create(data: NewAthlete): Promise<Athlete> {
    try {
      const [athlete] = await database
        .insert(athletesTable)
        .values(data)
        .returning();

      if (!athlete) throw new Error('Failed to create athlete.');

      return athlete;
    } catch (err) {
      if (isPgUniqueViolation(err, 'athletes_user_id_unique')) {
        throw new UserAlreadyHasAthleteError();
      }
      if (
        isPgUniqueViolation(err, 'athletes_document_type_document_value_unique')
      ) {
        throw new DocumentAlreadyInUseError();
      }
      throw err;
    }
  }
}
