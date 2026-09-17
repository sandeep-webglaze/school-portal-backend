import { Strategy, VerifyCallback } from 'passport-google-oauth2';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { EnvironmentVariables } from '@/src/config/env';
import { UserService } from '@/src/modules/user/user.service';
import { IUser } from '../../user/interface';
import { PLATFORMS, USER_ROLE } from '@/src/lib/constants';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(
        private configService: ConfigService<EnvironmentVariables>,
        private userService: UserService,
    ) {
        super({
            clientID: configService.get('GOOGLE_CLIENT_ID'),
            clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
            callbackURL: configService.get('GOOGLE_CALLBACK_URL'),
            scope: [
                'profile', 'email'
            ],
            passReqToCallback: true,
        });
    }

    async validate(
        req: any,
        _accessToken: string,
        _refreshToken: string,
        profile: any,
        done: VerifyCallback,
    ): Promise<any> {

        const { id, name, emails, _json } = profile;

        const user: Partial<IUser> = {
            // provider: 'google',
            // providerId: id,
            mail: emails[0].value,
            name: name.givenName + (name.familyName ? ` ${name.familyName}` : ""),
            imageUrl: _json.picture,
            platform: PLATFORMS.EDHIPPO // for now only edhippo site has google sign in with out google token
        };

        req['__redirectUrl'] = req.query.redirectUrl || '/'

        done(null, user);
    }
}