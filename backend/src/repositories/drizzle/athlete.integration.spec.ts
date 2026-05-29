// Libraries
import { faker } from '@faker-js/faker';
import { afterAll, describe, expect, it } from 'vitest';

// Application
import { AthleteRepository } from './athlete.ts';
import { UserRepository } from './user.ts';
import {
  DocumentAlreadyInUseError,
  UserAlreadyHasAthleteError,
} from '../../domain/athlete/errors.ts';
import { pool } from '../../database/index.ts';
import {
  ATHLETE_DOCUMENT_TYPE_VALUES,
  ATHLETE_SEX_VALUES,
} from '../../shared/enums/athlete.ts';

const athleteRepository = new AthleteRepository();
const userRepository = new UserRepository();

async function createUser() {
  return userRepository.create({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    passwordHash: 'placeholder-hash',
    phone: faker.phone.number({ style: 'international' }),
  });
}

function buildAthleteRow(
  userId: string,
  overrides: Partial<{ documentValue: string }> = {},
) {
  return {
    userId,
    birthDate: '1995-01-01',
    sex: ATHLETE_SEX_VALUES[0],
    documentType: ATHLETE_DOCUMENT_TYPE_VALUES[0],
    documentValue: overrides.documentValue ?? faker.string.numeric(11),
    photoUrl: null,
  };
}

describe('AthleteRepository (integration)', () => {
  afterAll(async () => {
    await pool.end();
  });

  it('should create an athlete linked to a user', async () => {
    const user = await createUser();

    const athlete = await athleteRepository.create(buildAthleteRow(user.id));

    expect(athlete.id).toEqual(expect.any(String));
    expect(athlete.userId).toEqual(user.id);
  });

  it('should throw UserAlreadyHasAthleteError when the user already has an athlete profile', async () => {
    const user = await createUser();
    await athleteRepository.create(buildAthleteRow(user.id));

    await expect(
      athleteRepository.create(buildAthleteRow(user.id)),
    ).rejects.toBeInstanceOf(UserAlreadyHasAthleteError);
  });

  it('should throw DocumentAlreadyInUseError when the document belongs to another athlete', async () => {
    const firstUser = await createUser();
    const secondUser = await createUser();
    const sharedDocument = faker.string.numeric(11);

    await athleteRepository.create(
      buildAthleteRow(firstUser.id, { documentValue: sharedDocument }),
    );

    await expect(
      athleteRepository.create(
        buildAthleteRow(secondUser.id, { documentValue: sharedDocument }),
      ),
    ).rejects.toBeInstanceOf(DocumentAlreadyInUseError);
  });
});
