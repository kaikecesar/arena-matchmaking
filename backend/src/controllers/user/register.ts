// Libraries
import type { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';

// Application
import { factoryRegisterUser } from '../../services/factories.ts';
import {
  UserAlreadyExistsError,
  InvalidNameError,
  InvalidEmailError,
  PasswordTooShortError,
  PasswordTooLongError,
} from '../../services/errors.ts';

export const registerBodySchema = z.object({
  name: z.string().min(2, new InvalidNameError().message).trim(),
  email: z.string().email(new InvalidEmailError().message).toLowerCase().trim(),
  password: z
    .string()
    .min(8, new PasswordTooShortError().message)
    .max(72, new PasswordTooLongError().message),
  phone: z.number().nullable(),
});

type RegisterBody = z.infer<typeof registerBodySchema>;

export async function register(
  request: FastifyRequest<{ Body: RegisterBody }>,
  reply: FastifyReply,
) {
  const { name, email, password, phone } = request.body;

  try {
    const registerUser = factoryRegisterUser();
    await registerUser.execute({ name, email, password, phone });
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }

  return reply.status(201).send();
}
