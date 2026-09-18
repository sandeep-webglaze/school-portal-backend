"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
const swagger_loader_1 = require("./lib/loaders/swagger.loader");
const app_security_loader_1 = require("./lib/loaders/app_security.loader");
const logger_loader_1 = require("./lib/loaders/logger.loader");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: logger_loader_1.Logger,
    });
    const config = app.get(config_1.ConfigService);
    app.enableCors({
        origin: true,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    });
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, transform: true }));
    (0, app_security_loader_1.AppSecurityLoader)(app);
    app.setGlobalPrefix(config.get('APP_ROUTE_PREFIX'), { exclude: ['metrics'] });
    (0, swagger_loader_1.SwaggerLoader)(app, config);
    const port = process.env.PORT || config.get('APP_PORT') || 8080;
    await app.listen(port, '0.0.0.0');
    return app.getUrl();
}
(async () => {
    try {
        const appUrl = await bootstrap();
        common_1.Logger.log(`App starting running at ${appUrl}`, 'BootStrapApp');
    }
    catch (err) {
        common_1.Logger.error(`Error : ${err}`, 'bootstrapApp');
    }
})();
//# sourceMappingURL=main.js.map