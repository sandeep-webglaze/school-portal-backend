"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const env_1 = require("./env");
const validate = (config) => {
    const validatedConfig = (0, class_transformer_1.plainToClass)(env_1.EnvironmentVariables, config, {
        enableImplicitConversion: true,
    });
    const errors = (0, class_validator_1.validateSync)(validatedConfig, {
        skipMissingProperties: false,
    });
    if (errors.length > 0) {
        throw new Error(errors.toString());
    }
    return validatedConfig;
};
exports.validate = validate;
//# sourceMappingURL=env.validation.js.map