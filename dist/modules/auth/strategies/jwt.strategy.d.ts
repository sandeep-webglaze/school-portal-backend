import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '@/src/config/env';
import { AuthService } from '../auth.service';
import { IPayload } from '../interface';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    private authService;
    constructor(configService: ConfigService<EnvironmentVariables>, authService: AuthService);
    validate(payload?: IPayload): Promise<import("../../user/interface").IUserObj>;
}
export {};
