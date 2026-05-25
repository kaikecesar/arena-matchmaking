// Libraries
import type { FastifyReply, FastifyRequest } from 'fastify';
import jwt from 'jsonwebtoken';

// Application
import type { AuthBody } from '../../schemas/auth.ts';
import { makeAuthUseCase } from '../../../use-cases/factories/index.ts';
import { env } from '../../../env/index.ts';

export async function login(
  request: FastifyRequest<{ Body: AuthBody }>,
  reply: FastifyReply,
) {
  const { email, password } = request.body;

  const auth = makeAuthUseCase();
  const { user } = await auth.execute({ email, password });
  const token = jwt.sign({ userId: user.id }, env.JWT_SECRET);

  reply.setCookie('token', token, {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return reply.status(204).send();
}
