import { Cache } from 'cache-manager';
import axios, { AxiosInstance } from 'axios';
import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { EnvironmentVariables } from '@/src/config/env';
import { UserAlreadyExistsException } from '@/src/lib/exceptions';
import {
  PLATFORMS,
  USER_ROLE,
  USER_STATUS,
  USER_VERIFICATION_STATUS,
} from '@/src/lib/constants';
import { MailEvents } from '../mails-handler/events';
import { SendOtpDto } from '../otp/dto/send-otp.dto';
import { OtpService } from '../otp/otp.service';
import { IUser, IUserDocument, IUserObj } from '../user/interface';
import { UserService } from '../user/user.service';
import { comparePassword } from '../user/entities/user.entity';
import {
  CreateUserDto,
  UserRegistrationDto,
} from '../user/dto/create-user.dto';
import { IPayload } from './interface';
import {
  CreateForgotSessionDto,
  LoginDto,
  OtpLoginDto,
  OtpLoginDtoFireBase,
  OtpLoginDtoFireBaseGoogle,
  ResetPasswordDto,
} from './dto/login.dto';
import * as crypto from 'crypto';
import { SMSService } from '@/src/lib/shared';

@Injectable()
export class AuthService {
  private googleApiClient: AxiosInstance;
  constructor(
    private configService: ConfigService<EnvironmentVariables>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly jwtService: JwtService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly otpService: OtpService,
    private readonly mailEvents: MailEvents,
    private readonly smsService: SMSService,
  ) {
    this.googleApiClient = axios.create({
      baseURL: this.configService.get<string>('GOOGLE_API_URL'),
    });
  }

  private async findUser(filter: { phoneNumber?: string; mail?: string }) {
    const user = await this.userService.findOne({
      phoneNumber: filter.phoneNumber,
      mail: filter.mail,
    });

    if (!user) {
      throw new NotFoundException('No user found with provided mail');
    }

    if (user.status != USER_STATUS.ACTIVE)
      throw new ForbiddenException('Account is blocked');

    if (user.verificationStatus != USER_VERIFICATION_STATUS.VERIFIED)
      throw new ForbiddenException(
        `Account verification is ${user.verificationStatus}`,
      );

    return user;
  }

  async validatePassword(
    currentPassword: string,
    password: string,
  ): Promise<void | HttpException> {
    const isValidPassword = await comparePassword({
      currentPassword: currentPassword,
      comparePassword: password,
    }).catch(() => {
      throw new HttpException('Invalid Password', 400);
    });

    if (!isValidPassword) throw new HttpException('Invalid Password', 400);
  }

  private decryptHashedPassword(encryptedPassword: string) {
    try {
      const privateKey = this.configService.get('PASSWORD_SECRET');
      console.log('privateKey==>', privateKey);
      const decryptedData = crypto.privateDecrypt(
        privateKey,
        Buffer.from(encryptedPassword, 'hex'),
      );
      return decryptedData.toString('utf-8');
    } catch (error) {
      throw error;
    }
  }

  async generateAccessToken(user: IUserDocument) {
    const payload: IPayload = {
      sub: user._id,
      name: user.name,
    };
    return await this.jwtService.signAsync(payload);
  }

  extractTokenPayload(token: string): IPayload | undefined {
    if (!token || token === '') return;
    return this.jwtService.decode<IPayload>(token);
  }

  getBearerTokenFromHeader(header: string) {
    return header.split(' ')[1];
  }

  async adminSignIn(loginDto: LoginDto) {
    const user = await this.findUser({ mail: loginDto.mail });

    user.lastLoginAt = new Date();
    await user.save();

    await this.validatePassword(user.password, loginDto.password);

    const { password, ...userBody } = user.toJSON();
    const access_token = await this.generateAccessToken(user);

    return {
      ...userBody,
      access_token,
    };
  }

  async userAuthUsingGoogleToken(google_token: string) {
    try {
      const googleResp = await this.googleApiClient.get('/oauth2/v3/userinfo', {
        params: { access_token: google_token },
      });

      if (googleResp.status > 300 || googleResp.data == null)
        throw new UnauthorizedException('Failed to fetch user data');

      const { given_name, email, picture } = googleResp.data;

      const user: Partial<IUser> = {
        mail: email,
        name: given_name,
        imageUrl: picture,
        platform: PLATFORMS.EDHIPPO_APP, // only app user provide google access token
      };

      return this.userOAuthRegistration(user as any);
    } catch (error) {
      throw new UnauthorizedException('Failed to fetch user data');
    }
  }

  async userOAuthRegistration(userDto: CreateUserDto) {
    // if new user created make it normal user
    userDto.role = USER_ROLE.USER;
    userDto.verificationStatus = USER_VERIFICATION_STATUS.VERIFIED;

    let user = await this.userService.findOrCreateUser(userDto);

    user.lastLoginAt = new Date();
    await user.save();

    const { password, ...userDate } = user.toJSON();

    // only normal users can perform OAuth authentication
    if (user.role !== USER_ROLE.USER)
      throw new ForbiddenException('Forbidden resource, Invalid access');

    const access_token = await this.generateAccessToken(user);

    return { ...userDate, access_token };
  }

  validateUserFromAuthHeader(authHeader: string) {
    const token = this.getBearerTokenFromHeader(authHeader);
    const payload = this.extractTokenPayload(token);
    return this.validateUserFromJwtPayload(payload);
  }

  async validateUserFromJwtPayload(payload?: IPayload) {
    if (payload == null) throw new BadRequestException('Invalid Token');

    // 💡 We're assigning the payload to the request object here
    // so that we can access it in our route handlers

    const userId = payload.sub;

    let user = await this.cacheManager.get<IUserObj>(
      `auth:details:user:${userId}`,
    );

    if (user == null) {
      const userData = await this.userService.findOneById(userId);
      if (userData != null) {
        user = userData.toJSON<IUserObj>();
        user._id = user.id ?? user._id?.toString();
        await this.cacheManager.set(
          `auth:details:user:${user._id?.toString()}`,
          user,
          120,
        ); // cache user for 2 min
      }
    }
    if (!user) throw new UnauthorizedException();
    // if (user.verificationStatus != USER_VERIFICATION_STATUS.VERIFIED)
    //   throw new UnauthorizedException(`Unverified account`);

    // Allow only active users
    if (user.status != USER_STATUS.ACTIVE)
      throw new UnauthorizedException('User is blocked');

    return user;
  }

  async sendOtpForLoginOrRegister(body: SendOtpDto) {
    const user = await this.userService.findOne({
      phoneNumber: body.phoneNumber,
    });

    const otp = await this.otpService.generateAndSaveOtpForPhone({
      ...body,
      userId: user?._id,
    });

    // send OTP to users phoneNumber
    if (otp.created) {
      this.smsService.sendSms(otp.data.phoneNumber, otp.data.otp);
    }

    return {
      ...body,
      name: user?.name,
      timeout: otp.data.timeout,
    };
  }

  async verifyRegistrationOtp(body: OtpLoginDto) {
    return await this.userService.verifyAndCreateUser(body);
  }

  /**
   * ######################################################
   *              Forgot Password Services
   * ######################################################
   */

  async sendForgotOtp(mail: string) {
    const user = await this.findUser({ mail });
    if (!user) throw new NotFoundException('User Not Found!');

    const otp = await this.otpService.generateAndSaveOtpForEmail({
      email: user.mail,
      phoneNumber: user.phoneNumber,
      userId: user._id,
    });

    // Send forgot OTP to user mail
    if (otp.created) {
      console.log('sending forgot mail ....');

      this.mailEvents.forgotPasswordOtpMail(user, otp.data);
    }

    return {
      email: user.mail,
      userId: user._id,
      timeout: otp.data.timeout,
    };
  }

  async createForgotSession(body: CreateForgotSessionDto) {
    const validatedOtpData = await this.otpService.validateOtpForEmail(
      body.mail,
      body.otp,
    );

    if (validatedOtpData.userId == null)
      throw new ForbiddenException('Verification Failed, Please retry');

    const payload = { sub: validatedOtpData.userId };

    // temp token valid for 5 min
    return {
      token: await this.jwtService.signAsync(payload, {
        expiresIn: 300,
        secret: this.configService.get('FORGOT_SESSION_SECRET'),
      }),
    };
  }

  async resetPassword({ token, password }: ResetPasswordDto) {
    try {
      // extract temp token
      const payload = await this.jwtService.verifyAsync<{ sub: string }>(
        token,
        {
          secret: this.configService.get('FORGOT_SESSION_SECRET'),
        },
      );

      const user = await this.userService.findOneById(payload.sub);

      if (user == null)
        throw new ForbiddenException(
          'Verification Failed, please retry after some time',
        );

      return await this.userService.findAndUpdate(user._id, { password });
    } catch (error) {
      throw new ForbiddenException('Verification Failed, Please retry');
    }
  }

  async firebaseLogin(body: OtpLoginDtoFireBase) {
    return await this.userService.firebaseLogin(body);
  }

  async sendNameForLoginOrRegister(body: SendOtpDto) {
    const user = await this.userService.findOne({
      phoneNumber: body.phoneNumber,
    });

    if (user?.name) {
      return {
        name: user.name,
      };
    }

    return {};
  }

  async firebaseLoginBYGooGle(body: OtpLoginDtoFireBaseGoogle) {
    return await this.userService.firebaseLoginByGoogle(body);
  }
}
