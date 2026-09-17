import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { EnvironmentVariables } from '@/src/config/env';
import { AuthService } from '../auth.service';
import { IPayload } from '../interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private configService: ConfigService<EnvironmentVariables>,
        private authService: AuthService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: configService.get('JWT_SECRET'),
        });
    }

    async validate(payload?: IPayload) {
        // 💡 We're assigning the payload to the request object here
        // so that we can access it in our route handlers
        return await this.authService.validateUserFromJwtPayload(payload);
    }
}
