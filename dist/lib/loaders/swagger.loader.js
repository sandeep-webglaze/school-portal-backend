"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwaggerLoader = SwaggerLoader;
const swagger_1 = require("@nestjs/swagger");
const basicAuth = require("express-basic-auth");
const constants_1 = require("../constants");
function SwaggerLoader(app, config) {
    const environment = config.get('NODE_ENV');
    const appName = config.get('APP_NAME');
    const swaggerPath = config.get('SWAGGER_PATH') ?? "swagger";
    const swaggerUser = config.get('SWAGGER_USER');
    const swaggerPassword = config.get('SWAGGER_PASSWORD');
    if (environment == constants_1.NODE_ENVIRONMENT.PRODUCTION) {
        app.use([`/${swaggerPath}/*`, `/${swaggerPath}-json`,], basicAuth({
            challenge: true,
            users: { [swaggerUser]: swaggerPassword },
        }));
    }
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle(appName)
        .setDescription(`${appName} swagger API description`)
        .setVersion('1.0')
        .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'JWT_Auth')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup(swaggerPath, app, document);
}
//# sourceMappingURL=swagger.loader.js.map