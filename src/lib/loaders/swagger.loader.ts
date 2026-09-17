import { EnvironmentVariables } from '@/src/config/env';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';
import { NODE_ENVIRONMENT } from '../constants';

export function SwaggerLoader(app: INestApplication, config: ConfigService<EnvironmentVariables>) {

    const environment = config.get<NODE_ENVIRONMENT>('NODE_ENV');
    const appName = config.get('APP_NAME');
    const swaggerPath = config.get('SWAGGER_PATH') ?? "swagger";
    const swaggerUser = config.get('SWAGGER_USER');
    const swaggerPassword = config.get('SWAGGER_PASSWORD');

    // enable in production
    if (environment == NODE_ENVIRONMENT.PRODUCTION) {
        // set password authentication for accessing docs
        app.use(
            [`/${swaggerPath}/*`, `/${swaggerPath}-json`,],
            basicAuth({
                challenge: true,
                users: { [swaggerUser]: swaggerPassword },
            }),
        );
    }

    const swaggerConfig = new DocumentBuilder()
        .setTitle(appName)
        .setDescription(`${appName} swagger API description`)
        .setVersion('1.0')
        .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'JWT_Auth')
        .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);

    SwaggerModule.setup(swaggerPath, app, document);
}
