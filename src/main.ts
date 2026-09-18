import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger as NestLogger, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';
import { SwaggerLoader } from './lib/loaders/swagger.loader';
import { EnvironmentVariables } from './config/env';
import { AppSecurityLoader } from './lib/loaders/app_security.loader';
import { NODE_ENVIRONMENT } from './lib/constants';
import { Logger } from './lib/loaders/logger.loader';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: Logger,
  });
  const config: ConfigService<EnvironmentVariables> = app.get(ConfigService);

  // Apply Cors policy
  app.enableCors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  });

  /**
   * Apply MiddleWare to the application
   */
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // Add Security for api's
  AppSecurityLoader(app);

  // set prefix to all routes
  app.setGlobalPrefix(config.get('APP_ROUTE_PREFIX'), { exclude: ['metrics'] });

  // enable Application Swagger Documentation
  SwaggerLoader(app, config);

  // Listen on the host platform's PORT (e.g. Render/Heroku set process.env.PORT).
  // Fall back to APP_PORT from env, then 8080 for local dev. Bind 0.0.0.0 so the
  // container's port is reachable.
  const port = process.env.PORT || config.get('APP_PORT') || 8080;
  await app.listen(port as number, '0.0.0.0');
  return app.getUrl();
}

(async (): Promise<void> => {
  try {
    const appUrl = await bootstrap();
    NestLogger.log(`App starting running at ${appUrl}`, 'BootStrapApp');
  } catch (err) {
    NestLogger.error(`Error : ${err}`, 'bootstrapApp');
  }
})();
