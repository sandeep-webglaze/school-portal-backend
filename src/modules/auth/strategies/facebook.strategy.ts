import { Strategy, VerifyCallback } from 'passport-facebook';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { EnvironmentVariables } from '@/src/config/env';
import { IUser } from '../../user/interface';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(private configService: ConfigService<EnvironmentVariables>) {
    super({
      clientID: configService.get('FACEBOOK_APP_ID'),
      clientSecret: configService.get('FACEBOOK_APP_SECRET'),
      callbackURL: configService.get('FACEBOOK_CALLBACK_URL'),
      profileFields: ['id', 'displayName', 'photos', 'email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    // You can perform actions based on the authenticated user here
    const { id, emails, name } = profile;
    const user: Partial<IUser> = {
      // provider: 'facebook',
      // providerId: id,
      mail: emails ? emails[0].value : null,
      name: name ? `${name.givenName} ${name.familyName}` : null,
    };

    // Pass the user to the controller
    done(null, user);
  }
}
