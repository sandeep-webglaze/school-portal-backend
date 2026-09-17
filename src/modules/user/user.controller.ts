import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  Req,
  Patch,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { NoCache } from '@/src/lib/interceptors';
import { ValidateMongoId } from '@/src/lib/decorators';
import {
  PLATFORMS,
  USER_ROLE,
  USER_VERIFICATION_STATUS,
} from '@/src/lib/constants';
import { InvalidOTPException, OTPExpiredException } from '@/src/lib/exceptions';
import { AllowedRoles } from '../auth/guards/roles.guard';
import { CurrentUser, Public } from '../auth/guards/jwt.guard';
import {
  CreateUserDto,
  SchoolUserRegistrationDto,
  UserRegistrationDto,
} from './dto/create-user.dto';
import {
  UpdateUserDto,
  AdminUpdateUserDto,
  ToggleUsersVerificationDto,
  RequestVerificationDtoPhone,
  ConfirmVerificationDtoPhone,
  RequestVerificationDtoEmail,
  ConfirmVerificationDtoEmail,
} from './dto/update-user.dto';
import { IUserObj } from './interface';
import { UserService } from './user.service';
import { UserFilterDto } from './dto/user-filter.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiBearerAuth('JWT_Auth')
  @AllowedRoles(USER_ROLE.ADMIN, USER_ROLE.SUB_ADMIN)
  @ApiBody({
    type: CreateUserDto,
    description: 'Json structure of create user dto',
  })
  @ApiResponse({ status: 201, description: 'User created Successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden to access resource.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  create(@Body() createUserDto: CreateUserDto) {
    createUserDto.verificationStatus = USER_VERIFICATION_STATUS.VERIFIED;
    return this.userService.create(createUserDto);
  }

  @Public()
  @Post('school-user')
  @ApiBody({
    type: SchoolUserRegistrationDto,
    description: 'Json structure of create school user dto',
  })
  @ApiResponse({ status: 201, description: 'User created Successfully.' })
  registerSchoolUser(@Body() createDto: SchoolUserRegistrationDto) {
    createDto.role = USER_ROLE.SCHOOL_ADMIN;
    createDto.verificationStatus = USER_VERIFICATION_STATUS.PENDING;
    return this.userService.registerSchoolUser(createDto);
  }

  @ApiBearerAuth('JWT_Auth')
  @Get()
  @AllowedRoles(USER_ROLE.ADMIN, USER_ROLE.SUB_ADMIN)
  @ApiResponse({
    status: 200,
    description: 'Users List based on applied filters.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden to access resource.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  findAll(@CurrentUser() user: IUserObj, @Query() filter: UserFilterDto) {
    return this.userService.findAll(user, filter);
  }

  @ApiBearerAuth('JWT_Auth')
  @NoCache()
  @Get('profile')
  @ApiResponse({ status: 200, description: 'User Profile.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  async getMe(@CurrentUser() user: IUserObj) {
    const { password, ...userDate } = user;
    return userDate;
  }

  @ApiBearerAuth('JWT_Auth')
  @Get(':id')
  @AllowedRoles(USER_ROLE.ADMIN, USER_ROLE.SUB_ADMIN)
  @ApiParam({ type: String, name: 'id', description: 'User id' })
  @ApiResponse({ status: 200, description: 'User detail by user id.' })
  @ApiResponse({ status: 403, description: 'Forbidden to access resource.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  findOne(@Param('id', ValidateMongoId) id: string) {
    return this.userService.findOneById(id);
  }

  @ApiBearerAuth('JWT_Auth')
  @Put('toggle-verification')
  @AllowedRoles(USER_ROLE.ADMIN, USER_ROLE.SUB_ADMIN)
  @ApiBody({
    type: ToggleUsersVerificationDto,
    description: 'Json schema for admin toggle users account status',
  })
  @ApiResponse({ status: 200, description: 'User updated successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden to access resource.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  async toggleUsersVerificationStatus(
    @Body() toggleDto: ToggleUsersVerificationDto,
  ) {
    return this.userService.toggleVerificationStatus(toggleDto);
  }

  @ApiBearerAuth('JWT_Auth')
  @Put('profile/:id')
  @AllowedRoles(USER_ROLE.ADMIN, USER_ROLE.SUB_ADMIN)
  @ApiParam({ type: String, name: 'id', description: 'User id' })
  @ApiBody({
    type: AdminUpdateUserDto,
    description: 'Json schema for admin updates user profile',
  })
  @ApiResponse({ status: 200, description: 'User updated successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden to access resource.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  async updateUser(
    @Param('id', ValidateMongoId) userId: string,
    @Body() updateUserDto: AdminUpdateUserDto,
  ) {
    return this.userService.findAndUpdate(userId, updateUserDto);
  }

  @ApiBearerAuth('JWT_Auth')
  @Put('profile')
  @ApiBody({
    type: UpdateUserDto,
    description: 'Json schema for updating profile',
  })
  @ApiResponse({ status: 200, description: 'User updated successfully.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  async updateProfile(
    @CurrentUser() user: IUserObj,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateProfile(user, updateUserDto);
  }

  @ApiBearerAuth('JWT_Auth')
  @Delete(':id')
  @ApiParam({ type: String, name: 'id', description: 'User id' })
  @ApiResponse({ status: 200, description: 'User deleted successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden to access resource.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  @AllowedRoles(USER_ROLE.ADMIN)
  remove(@Param('id', ValidateMongoId) id: string) {
    return this.userService.remove(id);
  }

  @ApiBearerAuth('JWT_Auth')
  @Delete(':id/profile-image')
  @ApiParam({ type: String, name: 'id', description: 'User id' })
  @ApiResponse({
    status: 200,
    description: 'User Profile image updated successfully.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  removeProfileImage(@Param('id', ValidateMongoId) id: string) {
    return this.userService.removeProfileImage(id);
  }

  /** User Phone Verification and update Api */
  @Post('request-verification-phone')
  async requestVerification(
    @CurrentUser() user: IUserObj,
    @Body() dto: RequestVerificationDtoPhone,
  ) {
    return this.userService.sendVerificationOtpToPhone(user, dto.phoneNumber);
  }

  @Post('confirm-verification')
  async confirmVerificationForPhone(@Body() dto: ConfirmVerificationDtoPhone) {
    return this.userService.verifyPhoneAndUpdate(dto.phoneNumber, dto.otp);
  }

  @Post('verify-phone-firebase')
  async verifyPhoneFirebase(
    @CurrentUser() user: IUserObj,
    @Body('idToken') idToken: string,
  ) {
    return this.userService.verifyPhoneNumberByFireBase(user, idToken);
  }

  /** User Email Verification and update Api */
  @Post('request-verification-email')
  async requestVerificationForEmail(
    @CurrentUser() user: IUserObj,
    @Body() dto: RequestVerificationDtoEmail,
  ) {
    return this.userService.sendVerificationOtpToEmail(user, dto.mail);
  }

  @Post('confirm-verification-email')
  async confirmVerificationForEmail(@Body() dto: ConfirmVerificationDtoEmail) {
    return this.userService.verifyMailAndUpdate(dto.mail, dto.otp);
  }
}
