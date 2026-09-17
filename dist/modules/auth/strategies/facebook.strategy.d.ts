import { VerifyCallback } from 'passport-facebook';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '@/src/config/env';
declare const FacebookStrategy_base: new (...args: any[]) => any;
export declare class FacebookStrategy extends FacebookStrategy_base {
    private configService;
    constructor(configService: ConfigService<EnvironmentVariables>);
    validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any>;
}
export {};
