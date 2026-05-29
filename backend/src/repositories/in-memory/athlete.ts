// Application
import { randomUUID } from 'node:crypto';
import type {
  IAthleteRepository,
  NewAthlete,
  Athlete,
} from '../types/index.ts';

export class InMemoryAthleteRepository implements IAthleteRepository {
  public records: Athlete[] = [];

  async create(data: NewAthlete): Promise<Athlete> {
    const athlete: Athlete = {
      id: randomUUID(),
      userId: data.userId,
      birthDate: data.birthDate,
      sex: data.sex,
      documentType: data.documentType,
      documentValue: data.documentValue,
      photoUrl: data.photoUrl ?? null,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
    };

    this.records.push(athlete);

    return athlete;
  }

  async findById(id: string): Promise<Athlete | null> {
    const athlete = this.records.find((record) => record.id === id);

    return athlete ?? null;
  }
}
