import { Connection } from 'mongoose';
import { isEmpty } from 'class-validator';
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';

import { createPaginatedMongoOptions } from '@/src/lib/utils';
import { UserAlreadyExistsException } from '@/src/lib/exceptions';
import {
  PLATFORMS,
  USER_ROLE,
  USER_VERIFICATION_STATUS,
} from '@/src/lib/constants';
import { OtpService } from '../otp/otp.service';
import { AuthService } from '../auth/auth.service';
import { WalletsService } from '../wallets/wallets.service';
import { UploadService } from '../upload/upload.service';
import { IUser, IUserObj } from './interface';
import { UserRepository } from './user.repository';
import { UserFilterDto } from './dto/user-filter.dto';
import { hashUserPassword } from './entities/user.entity';
import {
  CreateUserDto,
  SchoolUserRegistrationDto,
  UserRegistrationDto,
} from './dto/create-user.dto';
import {
  ToggleUsersVerificationDto,
  UpdateUserDto,
} from './dto/update-user.dto';
import {
  OtpLoginDto,
  OtpLoginDtoFireBase,
  OtpLoginDtoFireBaseGoogle,
} from '../auth/dto/login.dto';
import { FirebaseAdmin, SMSService } from '@/src/lib/shared';
import { MailService } from '../mails-handler/mail.service';
import { MailEvents } from '../mails-handler';

@Injectable()
export class UserService {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    private readonly repository: UserRepository,
    private readonly uploadService: UploadService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    private readonly otpService: OtpService,
    private readonly walletService: WalletsService,
    private readonly smsService: SMSService,
    private readonly mailEvents: MailEvents,
    private readonly firebaseAdmin: FirebaseAdmin,
  ) {}

  async findOrCreateUser(userDto: CreateUserDto) {
    let user = await this.repository.findOne({
      mail: userDto.mail, // mail is the unique credential for user model so we check if its already exists or not
    });

    if (!isEmpty(user)) return user;

    const newUser = await this.repository.create(userDto);
    return newUser.data;
  }

  async findOrCreateUserByPhone(userDto: CreateUserDto) {
    let user = await this.repository.findOne({
      phoneNumber: userDto.phoneNumber, // mail is the unique credential for user model so we check if its already exists or not
    });

    if (!isEmpty(user)) return user;

    const newUser = await this.repository.create(userDto);
    return newUser.data;
  }

  async create(createUserDto: CreateUserDto) {
    const user = await this.findOne({ mail: createUserDto.mail });

    if (user != null) throw new UserAlreadyExistsException();
    //TODO: send registration mails
    return this.repository.create(createUserDto);
  }

  async registerSchoolUser(createDto: SchoolUserRegistrationDto) {
    const claimedUser = await this.repository.findOne({
      school: createDto.school,
    });
    if (claimedUser != null)
      throw new BadRequestException(
        'School already claimed, Please contact us for any query',
      );

    return this.create(createDto);
  }

  async verifyAndCreateUser({ otp, ...userData }: OtpLoginDto) {
    await this.otpService.validateOtpForPhone(userData.phoneNumber, otp);

    userData.verificationStatus = USER_VERIFICATION_STATUS.VERIFIED;
    let user = await this.findOrCreateUserByPhone(userData as CreateUserDto);

    const access_token = await this.authService.generateAccessToken(user);
    const { password, ...userDate } = user.toJSON();
    return { ...userDate, access_token };
  }

  findAll(user: IUserObj, filterDto: UserFilterDto) {
    const { limit, skip, ...filter } = createPaginatedMongoOptions(filterDto);

    if (user.role !== USER_ROLE.ADMIN) filter.role = USER_ROLE.USER; // only admin can see all users

    return this.repository.findAll({
      filter: {
        name: filter.name && { $regex: `^${filter.name}`, $options: 'i' },
        mail: filter.mail && { $regex: `^${filter.mail}`, $options: 'i' },
        phoneNumber: filter.phoneNumber && {
          $regex: `^${filter.phoneNumber}`,
          $options: 'i',
        },
        role: filter.role,
        verificationStatus: filter.verificationStatus,
        status: filter.status,
      },
      options: {
        skip,
        limit,
        sort: { createdAt: -1 },
        populate: [
          {
            path: 'school',
            options: { projection: 'slug name' },
          },
        ],
      },
    });
  }

  findOne(user: Partial<IUser>) {
    return this.repository.findOne({ ...user });
  }

  findOneById(id: string) {
    return this.repository.findById(id);
  }

  removeProfileImage(userId: string) {
    return this.repository.entity.updateOne(
      { _id: userId },
      { $unset: { imageUrl: '' } },
    );
  }

  async update(userId: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOneById(userId);
    if (!user) throw new NotFoundException('User not Found');

    if (updateUserDto.password) {
      updateUserDto.password = await hashUserPassword(updateUserDto.password);
    }

    //handle image updating
    if (updateUserDto.imageUrl != null) {
      await this.uploadService.checkAndRemoveOldFile(
        user.imageUrl,
        updateUserDto.imageUrl,
      );
    }

    return this.repository.updateById(userId, updateUserDto);
  }

  async updateProfile(user: IUserObj, updateDto: UpdateUserDto) {
    if (updateDto.password) {
      // check if new password is different from current password
      const isDifferentPassword = this.authService
        .validatePassword(user.password, updateDto.password)
        .then(() => true)
        .catch((_) => false);
      if (!isDifferentPassword) {
        throw new BadRequestException(
          'new password must be different from current password',
        );
      }
      // hash user password
      updateDto.password = await hashUserPassword(updateDto.password);
    }

    //handle image change
    if (updateDto.imageUrl || updateDto.imageUrl === null) {
      await this.uploadService.checkAndRemoveOldFile(
        user.imageUrl,
        updateDto.imageUrl,
      );
    }
    return await this.repository.updateById(user._id, updateDto);
  }

  async toggleVerificationStatus(toggleDto: ToggleUsersVerificationDto) {
    return this.repository.updateMany(
      { _id: toggleDto.userIds },
      { verificationStatus: toggleDto.verificationStatus },
    );
  }

  async findAndUpdate(userId: string, updateBody: Partial<IUser>) {
    const user = await this.repository.findOne({ _id: userId });
    if (!user) throw new NotFoundException('User not Found');

    if (updateBody.password) {
      updateBody.password = await hashUserPassword(updateBody.password);
    }

    //handle image change
    if (updateBody.imageUrl != null) {
      await this.uploadService.checkAndRemoveOldFile(
        user.imageUrl,
        updateBody.imageUrl,
      );
    }

    const response = await this.repository.updateById(userId, updateBody);
    return response;
  }

  async remove(id: string) {
    const transactionSession = await this.connection.startSession();
    transactionSession.startTransaction();
    try {
      const deleteResponse = await this.repository.deleteById(id, {
        session: transactionSession,
      });
      this.walletService.deleteUserWallet(id, { session: transactionSession });

      await transactionSession.commitTransaction();
      return deleteResponse;
    } catch (error) {
      await transactionSession.abortTransaction();
      throw error;
    }
  }

  getPlatform(domain: string) {
    switch (true) {
      case new RegExp(
        /^https?:\/\/(?:[^.]+\.)?schoolsofdehradun\.com(?:[:/]|$)/,
      ).test(domain):
        return PLATFORMS.SOD;
      case new RegExp(/^https?:\/\/(?:[^.]+\.)?edhippo\.com(?:[:/]|$)/).test(
        domain,
      ):
        return PLATFORMS.EDHIPPO;
      default:
        return PLATFORMS.EDHIPPO_APP;
    }
  }

  async sendVerificationOtpToPhone(user: IUserObj, newPhone: string) {
    if (user.phoneNumber == newPhone)
      throw new BadRequestException('Phone Number Already Verified!');
    const otp = await this.otpService.generateAndSaveOtpForPhone({
      phoneNumber: newPhone,
      userId: user._id,
    });
    // send OTP to users phoneNumber
    if (otp.created) {
      this.smsService.sendSms(otp.data.phoneNumber, otp.data.otp);
    }

    return {
      userId: user._id,
      mobie: newPhone,
      timeout: otp.data.timeout,
    };
  }

  async verifyPhoneAndUpdate(phoneNumber: string, otp: string) {
    const { isVerified, userId } = await this.otpService.validateOtpForPhone(
      phoneNumber,
      otp,
    );
    if (!isVerified || !userId) throw new NotFoundException('User Not Found!');
    return await this.repository.updateById(userId.toString(), { phoneNumber });
  }

  async sendVerificationOtpToEmail(user: IUserObj, newMail: string) {
    if (user.mail == newMail)
      throw new BadRequestException('Email Already Verified!');
    const otp = await this.otpService.generateAndSaveOtpForEmail({
      email: newMail,
      userId: user._id,
      phoneNumber: user.phoneNumber,
    });
    // send OTP to users email
    user.mail = newMail;
    if (otp.created) {
      this.mailEvents.forgotPasswordOtpMail(user, otp.data);
    }
    console.log('Sending OTP to email:', newMail, otp.data.otp);
    return {
      userId: user._id,
      email: newMail,
      timeout: otp.data.timeout,
    };
  }

  async verifyMailAndUpdate(email: string, otp: string) {
    const { isVerified, userId } = await this.otpService.validateOtpForEmail(
      email,
      otp,
    );
    if (!isVerified || !userId) throw new NotFoundException('User Not Found!');
    console.log('Updating user email:', userId, email);
    return await this.repository.updateById(userId.toString(), { mail: email });
  }

  async firebaseLogin({ idToken, ...userData }: OtpLoginDtoFireBase) {
    const decodedToken = await this.firebaseAdmin
      .getAuth()
      .verifyIdToken(idToken);
    let phoneNumber = decodedToken.phone_number;

    if (phoneNumber.startsWith('+91')) {
      phoneNumber = phoneNumber.slice(3);
    }
    userData.phoneNumber = phoneNumber;
    userData.verificationStatus = USER_VERIFICATION_STATUS.VERIFIED;
    let user = await this.findOrCreateUserByPhone(userData as CreateUserDto);
    const access_token = await this.authService.generateAccessToken(user);
    const { password, ...userDate } = user.toJSON();
    return { ...userDate, access_token };
  }

  async verifyPhoneNumberByFireBase(user: IUserObj, idToken: string) {
    const decodedToken = await this.firebaseAdmin
      .getAuth()
      .verifyIdToken(idToken);
    const phoneNumber = decodedToken.phone_number;

    if (!phoneNumber) {
      throw new NotFoundException('Phone number not found in token');
    }

    let formattedPhone = phoneNumber;

    if (phoneNumber.startsWith('+91')) {
      formattedPhone = phoneNumber.slice(3);
    }

    if (user.phoneNumber === formattedPhone) {
      throw new BadRequestException('Phone Number Already Verified!');
    }

    return await this.repository.updateById(user._id, {
      phoneNumber: formattedPhone,
    });
  }

  async firebaseLoginByGoogle({
    idToken,
    ...userData
  }: OtpLoginDtoFireBaseGoogle) {
    const decodedToken = await this.firebaseAdmin
      .getAuth()
      .verifyIdToken(idToken);
    const email = decodedToken.email;
    const name = decodedToken.name;
    const imageUrl = decodedToken.picture;
    console.log('Decoded Token:', decodedToken);
    if (!email) {
      throw new NotFoundException('Email not found in token');
    }

    userData.mail = email;
    userData.name = name;
    userData.imageUrl = imageUrl;
    userData.verificationStatus = USER_VERIFICATION_STATUS.VERIFIED;
    let user = await this.findOrCreateUser(userData as CreateUserDto);
    const access_token = await this.authService.generateAccessToken(user);
    const { password, ...userDate } = user.toJSON();
    return { ...userDate, access_token };
  }
}
