import { BullModule } from "@nestjs/bullmq";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { EnvironmentVariables } from "./env";

export const QueueConfig = BullModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService<EnvironmentVariables>) => ({
        connection: {
            host: configService.get('REDIS_HOST'),
            port: configService.get('REDIS_PORT'),
            redisOptions: {
                username: configService.get('REDIS_USERNAME'), // new property
                password: configService.get('REDIS_PASSWORD'), // new property
            }
        },
    }),
});
