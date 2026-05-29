// Libraries
import { faker } from '@faker-js/faker';

// Application
import {
  ATHLETE_DOCUMENT_TYPE_VALUES,
  ATHLETE_SEX_VALUES,
} from '../../shared/enums/athlete.ts';

export interface AthleteRegisterPayload {
  birthDate: string;
  sex: (typeof ATHLETE_SEX_VALUES)[number];
  documentType: (typeof ATHLETE_DOCUMENT_TYPE_VALUES)[number];
  documentValue: string;
  photoUrl?: string;
}

export function buildAthleteRegisterPayload(
  overrides: Partial<AthleteRegisterPayload> = {},
): AthleteRegisterPayload {
  return {
    birthDate: faker.date.past({ years: 30 }).toISOString().split('T')[0]!,
    sex: ATHLETE_SEX_VALUES[0],
    documentType: ATHLETE_DOCUMENT_TYPE_VALUES[0],
    documentValue: faker.string.numeric(11),
    ...overrides,
  };
}
