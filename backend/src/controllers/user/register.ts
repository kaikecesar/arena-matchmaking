// Libraries
import type { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';

// Application
import { factoryRegisterUser } from '../../services/factories.ts';
import { UserAlreadyExistsError } from '../../services/errors.ts';

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string().min(2).trim(),
    email: z.string().email().toLowerCase().trim(),
    password: z.string().min(8).max(72),
    phone: z.number().nullable(),
  });

  const { name, email, password, phone } = registerBodySchema.parse(
    request.body,
  );

  try {
    const registerUser = factoryRegisterUser();
    await registerUser.execute({ name, email, password, phone });
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }

    throw error; // TODO: fix me
  }

  return reply.status(201).send();
}
