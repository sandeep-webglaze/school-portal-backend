"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtConfig = void 0;
const config_1 = require("@nestjs/config");
exports.jwtConfig = {
    global: true,
    imports: [config_1.ConfigModule],
    inject: [config_1.ConfigService],
    useFactory: async (config) => ({
        secret: config.getOrThrow('JWT_SECRET'),
    }),
};
//# sourceMappingURL=jwt.config.js.map