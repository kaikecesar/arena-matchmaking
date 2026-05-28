// Libraries
import { faker } from '@faker-js/faker';
import { describe, it, beforeEach, expect } from 'vitest';

// Application
import { InMemoryAthleteRepository } from '../../repositories/in-memory/athlete.ts';
import { RegisterAthleteUseCase } from './register.ts';
import {
  ATHLETE_DOCUMENT_TYPE_VALUES,
  ATHLETE_SEX_VALUES,
} from '../../shared/enums/athlete.ts';

type RegisterInput = Parameters<RegisterAthleteUseCase['execute']>[0];

function buildInput(overrides: Partial<RegisterInput> = {}): RegisterInput {
  return {
    userId: faker.string.uuid(),
    birthDate: '1995-01-01',
    sex: ATHLETE_SEX_VALUES[0],
    documentType: ATHLETE_DOCUMENT_TYPE_VALUES[0],
    documentValue: faker.string.numeric(11),
    photoUrl: null,
    ...overrides,
  };
}

describe('Athlete use case', () => {
  describe('register', () => {
    let athleteRepository: InMemoryAthleteRepository;
    let registerAthlete: RegisterAthleteUseCase;

    beforeEach(() => {
      athleteRepository = new InMemoryAthleteRepository();
      registerAthlete = new RegisterAthleteUseCase(athleteRepository);
    });

    it('should be able to register an athlete', async () => {
      const { athlete } = await registerAthlete.execute(buildInput());

      expect(athlete.id).toEqual(expect.any(String));
    });

    it('should not expose sensitive document fields in the response', async () => {
      const { athlete } = await registerAthlete.execute(buildInput());

      expect(athlete).not.toHaveProperty('documentValue');
      expect(athlete).not.toHaveProperty('documentType');
    });
  });
});
