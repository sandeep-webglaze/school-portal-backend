import { EnvironmentVariables } from '@/src/config/env';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
export declare function SwaggerLoader(app: INestApplication, config: ConfigService<EnvironmentVariables>): void;
