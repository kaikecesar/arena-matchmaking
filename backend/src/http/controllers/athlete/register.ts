// Libraries
import type { FastifyReply, FastifyRequest } from 'fastify';

// Application
import type { RegisterAthleteBody } from '../../schemas/athlete.ts';
import { makeRegisterAthleteUseCase } from '../../../use-cases/factories/index.ts';

export async function register(
  request: FastifyRequest<{ Body: RegisterAthleteBody }>,
  reply: FastifyReply,
) {
  const { birthDate, documentType, documentValue, sex, photoUrl } =
    request.body;

  const registerAthlete = makeRegisterAthleteUseCase();
  await registerAthlete.execute({
    userId: request.user.sub,
    birthDate,
    documentType,
    documentValue,
    sex,
    photoUrl: photoUrl ?? null,
  });

  return reply.status(201).send();
}
