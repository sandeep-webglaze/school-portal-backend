import { ThrottlerModule, seconds } from "@nestjs/throttler";
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerStorageRedisService } from "nestjs-throttler-storage-redis";

import { EnvironmentVariables } from "./env";

export default ThrottlerModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService<EnvironmentVariables>) => (
        {
            storage: new ThrottlerStorageRedisService(
                {
                    host: configService.get('REDIS_HOST'),
                    port: configService.get('REDIS_PORT'),
                    username: configService.get('REDIS_USERNAME'), // new property
                    password: configService.get('REDIS_PASSWORD'), // new property
                }
            ),
            throttlers: [
                {
                    name: 'short',
                    ttl: seconds(5),
                    limit: 10,
                },
                {
                    name: 'medium',
                    ttl: seconds(30),
                    limit: 50,
                },
                {
                    name: 'long',
                    ttl: seconds(120),
                    limit: 200,
                }
            ]
        }
    ),
});
