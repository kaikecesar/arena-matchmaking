// Libraries
import fastify from 'fastify';

const app = fastify();

const start = async () => {
  await app.listen({ port: 3000, host: '0.0.0.0' });
  console.log('Server running on port 3000');
};

start().catch(console.error);
