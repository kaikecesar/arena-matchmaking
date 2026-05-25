// Libraries
import type { FastifyReply, FastifyRequest } from 'fastify';

// Application
import type { RegisterBody } from '../../schemas/user.ts';
import { makeRegisterUserUseCaseUseCase } from '../../../use-cases/factories/index.ts';

export async function register(
  request: FastifyRequest<{ Body: RegisterBody }>,
  reply: FastifyReply,
) {
  const { name, email, password, phone } = request.body;

  const registerUser = makeRegisterUserUseCaseUseCase();
  await registerUser.execute({ name, email, password, phone });

  return reply.status(201).send();
}
