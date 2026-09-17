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
  // Allow all origins. `origin: true` reflects the request's Origin header,
  // which allows every site AND stays compatible with `credentials: true`
  // (the CORS spec forbids credentials together with a `*` wildcard).
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

  await app.listen(config.get('APP_PORT'));
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
