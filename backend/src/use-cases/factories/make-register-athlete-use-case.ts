// Application
import { AthleteRepository } from '../../repositories/drizzle/athlete.ts';
import { RegisterAthleteUseCase } from '../athlete/register.ts';

export function makeRegisterAthleteUseCase() {
  const athleteRepository = new AthleteRepository();
  const useCase = new RegisterAthleteUseCase(athleteRepository);

  return useCase;
}
