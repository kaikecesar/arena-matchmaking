// Libraries
import type { FastifyReply, FastifyRequest } from 'fastify';

export async function logout(_request: FastifyRequest, reply: FastifyReply) {
  reply.clearCookie('token', { path: '/' });

  return reply.status(204).send();
}
