"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigModule = void 0;
const config_1 = require("@nestjs/config");
const env_validation_1 = require("./env.validation");
const env_1 = require("./env");
exports.ConfigModule = config_1.ConfigModule.forRoot({
    isGlobal: true,
    validate: env_validation_1.validate,
    load: [() => new env_1.EnvironmentVariables()],
});
//# sourceMappingURL=config.module.js.map