import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModuleAsyncOptions } from '@nestjs/jwt';
import { EnvironmentVariables } from './env';

export const jwtConfig: JwtModuleAsyncOptions = {
    global: true,
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (config: ConfigService<EnvironmentVariables>) => ({
        secret: config.getOrThrow<string>('JWT_SECRET'),
        // signOptions: { expiresIn: "7d" }
    }),
};
