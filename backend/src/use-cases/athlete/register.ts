// Application
import type { IAthleteRepository } from '../../repositories/types/athlete.ts';
import type { athletesTable } from '../../database/schema/athletes.ts';
import type {
  AthleteSex,
  AthleteDocumentType,
} from '../../shared/enums/athlete.ts';

type Athlete = typeof athletesTable.$inferSelect;
export type SafeAthlete = Omit<Athlete, 'documentValue' | 'documentType'>;

interface RegisterAthleteUseCaseRequest {
  userId: string;
  birthDate: string;
  sex: AthleteSex;
  documentType: AthleteDocumentType;
  documentValue: string;
  photoUrl: string | null;
}

interface RegisterAthleteUseCaseResponse {
  athlete: SafeAthlete;
}

export class RegisterAthleteUseCase {
  constructor(private athleteRepository: IAthleteRepository) {}

  async execute({
    userId,
    birthDate,
    sex,
    documentType,
    documentValue,
    photoUrl,
  }: RegisterAthleteUseCaseRequest): Promise<RegisterAthleteUseCaseResponse> {
    const athlete = await this.athleteRepository.create({
      userId,
      birthDate,
      sex,
      documentType,
      documentValue,
      photoUrl,
    });

    const {
      documentValue: _unUsedDocumentValue,
      documentType: _unUsedDocumentType,
      ...SafeAthlete
    } = athlete;

    return { athlete: SafeAthlete };
  }
}
