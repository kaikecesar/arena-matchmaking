// Application
import { app } from './app.ts';
import { env } from './env/index.ts';

app.listen({ host: '0.0.0.0', port: env.PORT }, () => {
  app.log.info('🚀 HTTP Server Running!');
  app.log.info(`📄 Docs available at http://localhost:${env.PORT}/docs`);
});
