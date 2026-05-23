// Libraries
import type { FastifyReply, FastifyRequest } from 'fastify';

// Application
import { factoryRegisterUser } from '../../../use-cases/factories.ts';
import type { RegisterBody } from '../../schemas/user.ts';

export async function register(
  request: FastifyRequest<{ Body: RegisterBody }>,
  reply: FastifyReply,
) {
  const { name, email, password, phone } = request.body;

  const registerUser = factoryRegisterUser();
  await registerUser.execute({ name, email, password, phone });

  return reply.status(201).send();
}
