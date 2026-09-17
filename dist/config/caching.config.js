"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CachingModule = void 0;
const cache_manager_1 = require("@nestjs/cache-manager");
const config_1 = require("@nestjs/config");
const redisStore = require("cache-manager-redis-store");
exports.CachingModule = cache_manager_1.CacheModule.registerAsync({
    imports: [config_1.ConfigModule],
    useFactory: async (configService) => ({
        max: 100,
        ttl: 10,
        isGlobal: true,
        store: redisStore,
        host: configService.get('REDIS_HOST'),
        port: configService.get('REDIS_PORT'),
        username: configService.get('REDIS_USERNAME'),
    }),
    inject: [config_1.ConfigService],
});
//# sourceMappingURL=caching.config.js.map