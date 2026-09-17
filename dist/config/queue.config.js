"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueConfig = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const config_1 = require("@nestjs/config");
exports.QueueConfig = bullmq_1.BullModule.forRootAsync({
    imports: [config_1.ConfigModule],
    inject: [config_1.ConfigService],
    useFactory: async (configService) => ({
        connection: {
            host: configService.get('REDIS_HOST'),
            port: configService.get('REDIS_PORT'),
            redisOptions: {
                username: configService.get('REDIS_USERNAME'),
                password: configService.get('REDIS_PASSWORD'),
            }
        },
    }),
});
//# sourceMappingURL=queue.config.js.map