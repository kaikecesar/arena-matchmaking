// Application
import { athletesTable } from '../../database/schema/athletes.ts';

export type Athlete = typeof athletesTable.$inferSelect;
export type NewAthlete = typeof athletesTable.$inferInsert;

export interface IAthleteRepository {
  create(data: NewAthlete): Promise<Athlete>;
  findById(id: string): Promise<Athlete | null>;
}
