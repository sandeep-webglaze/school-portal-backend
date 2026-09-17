import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import {
  Controller,
  Get,
  UseGuards,
  Req,
  Res,
  Post,
  Body,
  Query,
} from '@nestjs/common';

import { InvalidOTPException, OTPExpiredException } from '@/src/lib/exceptions';
import { EnvironmentVariables } from '@/src/config/env';
import { SendOtpDto } from '../otp/dto/send-otp.dto';
import { UserRegistrationDto } from '../user/dto/create-user.dto';
import {
  CreateForgotSessionDto,
  ForgotDto,
  LoginDto,
  OtpLoginDto,
  OtpLoginDtoFireBase,
  OtpLoginDtoFireBaseGoogle,
  ResetPasswordDto,
} from './dto/login.dto';
import { Public } from './guards/jwt.guard';
import { GoogleOauthGuard } from './guards/google-oauth.guard';
import { FacebookAuthGuard } from './guards/facebook-oauth.guard';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
    private readonly authService: AuthService,
  ) {}

  @Public()
  @Post('/login')
  @ApiBody({ type: LoginDto, description: 'Json schema for Sign in' })
  @ApiResponse({
    status: 200,
    description: 'Basic User info with access token.',
  })
  @ApiResponse({
    status: 400,
    description: 'User not found with given credentials.',
  })
  @ApiResponse({ status: 401, description: 'Invalid user password.' })
  async login(@Body() body: LoginDto) {
    return this.authService.adminSignIn(body);
  }

  @Public()
  @Get('login/google')
  @UseGuards(GoogleOauthGuard)
  @ApiResponse({ status: 200, description: 'Redirect to Google Login page.' })
  async auth() {}

  @Public()
  @Get('google-redirect')
  @UseGuards(GoogleOauthGuard)
  @ApiResponse({
    status: 200,
    description: 'Basic User info with access token.',
  })
  async googleAuthCallback(@Req() req: any, @Res() res: Response) {
    const user = req.user;
    const { access_token } = await this.authService.userOAuthRegistration(user);

    return res.redirect(
      `${this.configService.get(
        'WEBSITE_AUTH_CALLBACK_URL',
      )}?access_token=${access_token}`,
    );
  }

  @Public()
  @Get('app-google-verification')
  @ApiResponse({
    status: 200,
    description: 'Basic User info with access token.',
  })
  async appGoogleVerification(@Query('access_token') accessToken: string) {
    return this.authService.userAuthUsingGoogleToken(accessToken);
  }

  @Public()
  @Post('send-otp')
  @ApiBody({
    type: SendOtpDto,
    description: 'Json schema for Registering new user',
  })
  @ApiResponse({
    status: 200,
    description: 'Basic User info with access token.',
  })
  @ApiResponse({ status: 401, description: 'User already exists.' })
  public async sendOtp(@Body() body: SendOtpDto) {
    return this.authService.sendOtpForLoginOrRegister(body);
  }

  @Public()
  @Post('/otp-login')
  @ApiBody({
    type: OtpLoginDto,
    description: 'Json schema for register new user with OTP validation',
  })
  @ApiResponse({
    status: 200,
    description:
      'User registered successfully and provide Basic User info with access token.',
  })
  @ApiResponse({
    status: 400,
    description: 'OTP Expired.',
    type: OTPExpiredException,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid OTP.',
    type: InvalidOTPException,
  })
  public async verifyOtpForSignup(@Body() body: OtpLoginDto) {
    return await this.authService.verifyRegistrationOtp(body);
  }

  @Public()
  @Post('/forgot-otp')
  @ApiBody({
    type: ForgotDto,
    description: 'Json schema for requesting forgot OTP',
  })
  @ApiResponse({ status: 200, description: 'Forgot OTP send successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  public async forgotOTP(@Body() body: ForgotDto) {
    return this.authService.sendForgotOtp(body.mail);
  }

  @Public()
  @Post('/forgot-session')
  @ApiBody({
    type: CreateForgotSessionDto,
    description: 'Json schema for creating forgot session',
  })
  @ApiResponse({
    status: 200,
    description:
      'Forgot OTP verified successfully and forgot session initialize successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'OTP Expired.',
    type: OTPExpiredException,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid OTP.',
    type: InvalidOTPException,
  })
  public async verifyOtpForForgotPassword(
    @Body() body: CreateForgotSessionDto,
  ) {
    return await this.authService.createForgotSession(body);
  }

  @Public()
  @Post('/reset-password')
  @ApiBody({
    type: ResetPasswordDto,
    description: 'Json schema for reset password',
  })
  @ApiResponse({
    status: 200,
    description: 'user password updated successfully.',
  })
  @ApiResponse({
    status: 403,
    description: 'Some verification failed, retry to create new session',
  })
  public async resetPassword(@Body() body: ResetPasswordDto) {
    return await this.authService.resetPassword(body);
  }

  @Post('verify')
  @Public()
  async verifyToken(@Body() body: OtpLoginDtoFireBase) {
    return await this.authService.firebaseLogin(body);
  }

  @Post('name-user')
  @Public()
  async getUserByName(@Body() body: SendOtpDto) {
    return await this.authService.sendNameForLoginOrRegister(body);
  }
  @Post('google-firebase')
  @Public()
  async verifyTokenGoogle(@Body() body: OtpLoginDtoFireBaseGoogle) {
    return await this.authService.firebaseLoginBYGooGle(body);
  }
}
