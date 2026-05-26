// Libraries
import type { FastifyReply, FastifyRequest } from 'fastify';

// Application
import { UnauthorizedError } from '../domain/auth/errors.ts';

export async function authenticate(
  request: FastifyRequest,
  _reply: FastifyReply,
) {
  try {
    await request.jwtVerify({ onlyCookie: true });
  } catch {
    throw new UnauthorizedError();
  }
}
