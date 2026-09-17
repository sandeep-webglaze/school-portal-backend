import { CacheModule } from "@nestjs/cache-manager";
import { ConfigModule, ConfigService } from "@nestjs/config";
import * as redisStore from 'cache-manager-redis-store';

import { EnvironmentVariables } from "./env";

export const CachingModule = CacheModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService<EnvironmentVariables>) => ({
        max: 100,
        ttl: 10, // seconds
        isGlobal: true,
        store: redisStore,
        host: configService.get('REDIS_HOST'),
        port: configService.get('REDIS_PORT'),
        username: configService.get('REDIS_USERNAME'), // new property
        // password: configService.get('REDIS_PASSWORD'), // new property
        // no_ready_check: true, // new property
    }),
    inject: [ConfigService],
});
