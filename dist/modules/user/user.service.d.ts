import { Connection } from 'mongoose';
import { PLATFORMS } from '@/src/lib/constants';
import { OtpService } from '../otp/otp.service';
import { AuthService } from '../auth/auth.service';
import { WalletsService } from '../wallets/wallets.service';
import { UploadService } from '../upload/upload.service';
import { IUser, IUserObj } from './interface';
import { UserRepository } from './user.repository';
import { UserFilterDto } from './dto/user-filter.dto';
import { CreateUserDto, SchoolUserRegistrationDto } from './dto/create-user.dto';
import { ToggleUsersVerificationDto, UpdateUserDto } from './dto/update-user.dto';
import { OtpLoginDto, OtpLoginDtoFireBase, OtpLoginDtoFireBaseGoogle } from '../auth/dto/login.dto';
import { FirebaseAdmin, SMSService } from '@/src/lib/shared';
import { MailEvents } from '../mails-handler';
export declare class UserService {
    private readonly connection;
    private readonly repository;
    private readonly uploadService;
    private readonly authService;
    private readonly otpService;
    private readonly walletService;
    private readonly smsService;
    private readonly mailEvents;
    private readonly firebaseAdmin;
    constructor(connection: Connection, repository: UserRepository, uploadService: UploadService, authService: AuthService, otpService: OtpService, walletService: WalletsService, smsService: SMSService, mailEvents: MailEvents, firebaseAdmin: FirebaseAdmin);
    findOrCreateUser(userDto: CreateUserDto): Promise<import("./interface").IUserDocument | (import("mongoose").Document<unknown, {}, import("./interface").IUserDocument> & IUser & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })>;
    findOrCreateUserByPhone(userDto: CreateUserDto): Promise<import("./interface").IUserDocument | (import("mongoose").Document<unknown, {}, import("./interface").IUserDocument> & IUser & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })>;
    create(createUserDto: CreateUserDto): Promise<import("../../lib/repository").CreatedModel<import("./interface").IUserDocument>>;
    registerSchoolUser(createDto: SchoolUserRegistrationDto): Promise<import("../../lib/repository").CreatedModel<import("./interface").IUserDocument>>;
    verifyAndCreateUser({ otp, ...userData }: OtpLoginDto): Promise<{
        access_token: string;
    }>;
    findAll(user: IUserObj, filterDto: UserFilterDto): Promise<{
        data: import("./interface").IUserDocument[];
        totalCount: number;
    }>;
    findOne(user: Partial<IUser>): Promise<import("mongoose").Document<unknown, {}, import("./interface").IUserDocument> & IUser & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findOneById(id: string): Promise<import("./interface").IUserDocument>;
    removeProfileImage(userId: string): import("mongoose").Query<import("mongoose").UpdateWriteOpResult, import("mongoose").Document<unknown, {}, import("./interface").IUserDocument> & IUser & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, {}, import("./interface").IUserDocument, "updateOne">;
    update(userId: string, updateUserDto: UpdateUserDto): Promise<import("../../lib/repository").UpdatedModel>;
    updateProfile(user: IUserObj, updateDto: UpdateUserDto): Promise<import("../../lib/repository").UpdatedModel>;
    toggleVerificationStatus(toggleDto: ToggleUsersVerificationDto): Promise<import("../../lib/repository").UpdatedModel>;
    findAndUpdate(userId: string, updateBody: Partial<IUser>): Promise<import("../../lib/repository").UpdatedModel>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, import("./interface").IUserDocument> & IUser & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getPlatform(domain: string): PLATFORMS;
    sendVerificationOtpToPhone(user: IUserObj, newPhone: string): Promise<{
        userId: any;
        mobie: string;
        timeout: Date;
    }>;
    verifyPhoneAndUpdate(phoneNumber: string, otp: string): Promise<import("../../lib/repository").UpdatedModel>;
    sendVerificationOtpToEmail(user: IUserObj, newMail: string): Promise<{
        userId: any;
        email: string;
        timeout: Date;
    }>;
    verifyMailAndUpdate(email: string, otp: string): Promise<import("../../lib/repository").UpdatedModel>;
    firebaseLogin({ idToken, ...userData }: OtpLoginDtoFireBase): Promise<{
        access_token: string;
    }>;
    verifyPhoneNumberByFireBase(user: IUserObj, idToken: string): Promise<import("../../lib/repository").UpdatedModel>;
    firebaseLoginByGoogle({ idToken, ...userData }: OtpLoginDtoFireBaseGoogle): Promise<{
        access_token: string;
    }>;
}
