// Nest import
import { ConfigModule as NestjsConfigModule } from '@nestjs/config';
import { validate } from './env.validation';
import { EnvironmentVariables } from './env';

// Project import

export const ConfigModule = NestjsConfigModule.forRoot({
  // envFilePath: `${process.cwd()}/.env.${process.env.NODE_ENV ?? 'development'}`,
  isGlobal: true,
  validate,
  load: [() => new EnvironmentVariables()],
});
