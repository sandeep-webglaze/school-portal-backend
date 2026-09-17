import { VerifyCallback } from 'passport-google-oauth2';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '@/src/config/env';
import { UserService } from '@/src/modules/user/user.service';
declare const GoogleStrategy_base: new (...args: any[]) => any;
export declare class GoogleStrategy extends GoogleStrategy_base {
    private configService;
    private userService;
    constructor(configService: ConfigService<EnvironmentVariables>, userService: UserService);
    validate(req: any, _accessToken: string, _refreshToken: string, profile: any, done: VerifyCallback): Promise<any>;
}
export {};
