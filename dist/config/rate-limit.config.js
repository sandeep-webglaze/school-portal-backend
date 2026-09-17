"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const throttler_1 = require("@nestjs/throttler");
const config_1 = require("@nestjs/config");
const nestjs_throttler_storage_redis_1 = require("nestjs-throttler-storage-redis");
exports.default = throttler_1.ThrottlerModule.forRootAsync({
    imports: [config_1.ConfigModule],
    inject: [config_1.ConfigService],
    useFactory: (configService) => ({
        storage: new nestjs_throttler_storage_redis_1.ThrottlerStorageRedisService({
            host: configService.get('REDIS_HOST'),
            port: configService.get('REDIS_PORT'),
            username: configService.get('REDIS_USERNAME'),
            password: configService.get('REDIS_PASSWORD'),
        }),
        throttlers: [
            {
                name: 'short',
                ttl: (0, throttler_1.seconds)(5),
                limit: 10,
            },
            {
                name: 'medium',
                ttl: (0, throttler_1.seconds)(30),
                limit: 50,
            },
            {
                name: 'long',
                ttl: (0, throttler_1.seconds)(120),
                limit: 200,
            }
        ]
    }),
});
//# sourceMappingURL=rate-limit.config.js.map