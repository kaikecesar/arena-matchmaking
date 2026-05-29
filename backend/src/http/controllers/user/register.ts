// Libraries
import type { FastifyReply, FastifyRequest } from 'fastify';

// Application
import type { RegisterUserBody } from '../../schemas/user.ts';
import { makeRegisterUserUseCase } from '../../../use-cases/factories/index.ts';

export async function register(
  request: FastifyRequest<{ Body: RegisterUserBody }>,
  reply: FastifyReply,
) {
  const { name, email, password, phone } = request.body;

  const registerUser = makeRegisterUserUseCase();
  await registerUser.execute({ name, email, password, phone });

  return reply.status(201).send();
}
