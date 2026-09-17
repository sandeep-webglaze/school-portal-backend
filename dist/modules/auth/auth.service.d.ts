import { Cache } from 'cache-manager';
import { HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { EnvironmentVariables } from '@/src/config/env';
import { USER_ROLE, USER_STATUS, USER_VERIFICATION_STATUS } from '@/src/lib/constants';
import { MailEvents } from '../mails-handler/events';
import { SendOtpDto } from '../otp/dto/send-otp.dto';
import { OtpService } from '../otp/otp.service';
import { IUser, IUserDocument, IUserObj } from '../user/interface';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { IPayload } from './interface';
import { CreateForgotSessionDto, LoginDto, OtpLoginDto, OtpLoginDtoFireBase, OtpLoginDtoFireBaseGoogle, ResetPasswordDto } from './dto/login.dto';
import { SMSService } from '@/src/lib/shared';
export declare class AuthService {
    private configService;
    private cacheManager;
    private readonly jwtService;
    private readonly userService;
    private readonly otpService;
    private readonly mailEvents;
    private readonly smsService;
    private googleApiClient;
    constructor(configService: ConfigService<EnvironmentVariables>, cacheManager: Cache, jwtService: JwtService, userService: UserService, otpService: OtpService, mailEvents: MailEvents, smsService: SMSService);
    private findUser;
    validatePassword(currentPassword: string, password: string): Promise<void | HttpException>;
    private decryptHashedPassword;
    generateAccessToken(user: IUserDocument): Promise<string>;
    extractTokenPayload(token: string): IPayload | undefined;
    getBearerTokenFromHeader(header: string): string;
    adminSignIn(loginDto: LoginDto): Promise<{
        access_token: string;
        name: string;
        mail?: string;
        phoneNumber?: string;
        role: USER_ROLE;
        status: USER_STATUS;
        verificationStatus: USER_VERIFICATION_STATUS;
        imageUrl?: string;
        school?: string | import("mongoose").FlattenMaps<import("../school/interface").ISchoolDocument>;
        lastLoginAt?: Date;
        platform?: string;
        _id: any;
        __v?: any;
        $assertPopulated: <Paths = {}>(path: string | string[], values?: Partial<Paths>) => Omit<IUser & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, keyof Paths> & Paths;
        $clone: () => IUser & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        };
        $getAllSubdocs: () => import("mongoose").Document[];
        $ignore: (path: string) => void;
        $isDefault: (path: string) => boolean;
        $isDeleted: (val?: boolean) => boolean;
        $getPopulatedDocs: () => import("mongoose").Document[];
        $inc: (path: string | string[], val?: number) => IUser & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        };
        $isEmpty: (path: string) => boolean;
        $isValid: (path: string) => boolean;
        $locals: import("mongoose").FlattenMaps<Record<string, unknown>>;
        $markValid: (path: string) => void;
        $model: {
            <ModelType = import("mongoose").Model<unknown, {}, {}, {}, import("mongoose").Document<unknown, {}, unknown> & Required<{
                _id: unknown;
            }>, any>>(name: string): ModelType;
            <ModelType = import("mongoose").Model<any, {}, {}, {}, any, any>>(): ModelType;
        };
        $op: "save" | "validate" | "remove" | null;
        $session: (session?: import("mongoose").ClientSession | null) => import("mongoose").ClientSession | null;
        $set: {
            (path: string | Record<string, any>, val: any, type: any, options?: import("mongoose").DocumentSetOptions): IUser & import("mongoose").Document<any, any, any> & {
                _id: import("mongoose").Types.ObjectId;
            };
            (path: string | Record<string, any>, val: any, options?: import("mongoose").DocumentSetOptions): IUser & import("mongoose").Document<any, any, any> & {
                _id: import("mongoose").Types.ObjectId;
            };
            (value: string | Record<string, any>): IUser & import("mongoose").Document<any, any, any> & {
                _id: import("mongoose").Types.ObjectId;
            };
        };
        $where: import("mongoose").FlattenMaps<Record<string, unknown>>;
        baseModelName?: string;
        collection: import("mongoose").Collection;
        db: import("mongoose").FlattenMaps<import("mongoose").Connection>;
        deleteOne: (options?: import("mongoose").QueryOptions) => any;
        depopulate: (path?: string | string[]) => IUser & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        };
        directModifiedPaths: () => Array<string>;
        equals: (doc: import("mongoose").Document<any, any, any>) => boolean;
        errors?: import("mongoose").Error.ValidationError;
        get: {
            <T extends string | number | symbol>(path: T, type?: any, options?: any): any;
            (path: string, type?: any, options?: any): any;
        };
        getChanges: () => import("mongoose").UpdateQuery<IUser & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }>;
        id?: any;
        increment: () => IUser & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        };
        init: (obj: import("mongoose").AnyObject, opts?: import("mongoose").AnyObject) => IUser & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        };
        invalidate: {
            <T extends string | number | symbol>(path: T, errorMsg: string | NativeError, value?: any, kind?: string): NativeError | null;
            (path: string, errorMsg: string | NativeError, value?: any, kind?: string): NativeError | null;
        };
        isDirectModified: {
            <T extends string | number | symbol>(path: T | T[]): boolean;
            (path: string | Array<string>): boolean;
        };
        isDirectSelected: {
            <T extends string | number | symbol>(path: T): boolean;
            (path: string): boolean;
        };
        isInit: {
            <T extends string | number | symbol>(path: T): boolean;
            (path: string): boolean;
        };
        isModified: {
            <T extends string | number | symbol>(path?: T | T[]): boolean;
            (path?: string | Array<string>): boolean;
        };
        isNew: boolean;
        isSelected: {
            <T extends string | number | symbol>(path: T): boolean;
            (path: string): boolean;
        };
        markModified: {
            <T extends string | number | symbol>(path: T, scope?: any): void;
            (path: string, scope?: any): void;
        };
        model: {
            <ModelType = import("mongoose").Model<unknown, {}, {}, {}, import("mongoose").Document<unknown, {}, unknown> & Required<{
                _id: unknown;
            }>, any>>(name: string): ModelType;
            <ModelType = import("mongoose").Model<any, {}, {}, {}, any, any>>(): ModelType;
        };
        modifiedPaths: (options?: {
            includeChildren?: boolean;
        }) => Array<string>;
        overwrite: (obj: import("mongoose").AnyObject) => IUser & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        };
        $parent: () => import("mongoose").Document | undefined;
        populate: {
            <Paths = {}>(path: string | import("mongoose").PopulateOptions | (string | import("mongoose").PopulateOptions)[]): Promise<import("mongoose").MergeType<IUser & import("mongoose").Document<any, any, any> & {
                _id: import("mongoose").Types.ObjectId;
            }, Paths>>;
            <Paths = {}>(path: string, select?: string | import("mongoose").AnyObject, model?: import("mongoose").Model<any>, match?: import("mongoose").AnyObject, options?: import("mongoose").PopulateOptions): Promise<import("mongoose").MergeType<IUser & import("mongoose").Document<any, any, any> & {
                _id: import("mongoose").Types.ObjectId;
            }, Paths>>;
        };
        populated: (path: string) => any;
        replaceOne: (replacement?: import("mongoose").AnyObject, options?: import("mongoose").QueryOptions | null) => import("mongoose").Query<any, IUser & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, {}, IUser & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, "find">;
        save: (options?: import("mongoose").SaveOptions) => Promise<IUser & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }>;
        schema: import("mongoose").FlattenMaps<import("mongoose").Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
            [x: string]: any;
        }, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
            [x: string]: any;
        }>> & import("mongoose").FlatRecord<{
            [x: string]: any;
        }> & Required<{
            _id: unknown;
        }>>>;
        set: {
            <T extends string | number | symbol>(path: T, val: any, type: any, options?: import("mongoose").DocumentSetOptions): IUser & import("mongoose").Document<any, any, any> & {
                _id: import("mongoose").Types.ObjectId;
            };
            (path: string | Record<string, any>, val: any, type: any, options?: import("mongoose").DocumentSetOptions): IUser & import("mongoose").Document<any, any, any> & {
                _id: import("mongoose").Types.ObjectId;
            };
            (path: string | Record<string, any>, val: any, options?: import("mongoose").DocumentSetOptions): IUser & import("mongoose").Document<any, any, any> & {
                _id: import("mongoose").Types.ObjectId;
            };
            (value: string | Record<string, any>): IUser & import("mongoose").Document<any, any, any> & {
                _id: import("mongoose").Types.ObjectId;
            };
        };
        toJSON: {
            <T = any>(options?: import("mongoose").ToObjectOptions & {
                flattenMaps?: true;
            }): import("mongoose").FlattenMaps<T>;
            <T = any>(options: import("mongoose").ToObjectOptions & {
                flattenMaps: false;
            }): T;
        };
        toObject: <T = any>(options?: import("mongoose").ToObjectOptions) => import("mongoose").Require_id<T>;
        unmarkModified: {
            <T extends string | number | symbol>(path: T): void;
            (path: string): void;
        };
        updateOne: (update?: import("mongoose").UpdateWithAggregationPipeline | import("mongoose").UpdateQuery<IUser & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }>, options?: import("mongoose").QueryOptions | null) => import("mongoose").Query<any, IUser & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, {}, IUser & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, "find">;
        validate: {
            <T extends string | number | symbol>(pathsToValidate?: T | T[], options?: import("mongoose").AnyObject): Promise<void>;
            (pathsToValidate?: import("mongoose").pathsToValidate, options?: import("mongoose").AnyObject): Promise<void>;
            (options: {
                pathsToSkip?: import("mongoose").pathsToSkip;
            }): Promise<void>;
        };
        validateSync: {
            (options: {
                pathsToSkip?: import("mongoose").pathsToSkip;
                [k: string]: any;
            }): import("mongoose").Error.ValidationError | null;
            <T extends string | number | symbol>(pathsToValidate?: T | T[], options?: import("mongoose").AnyObject): import("mongoose").Error.ValidationError | null;
            (pathsToValidate?: import("mongoose").pathsToValidate, options?: import("mongoose").AnyObject): import("mongoose").Error.ValidationError | null;
        };
    }>;
    userAuthUsingGoogleToken(google_token: string): Promise<{
        access_token: string;
    }>;
    userOAuthRegistration(userDto: CreateUserDto): Promise<{
        access_token: string;
    }>;
    validateUserFromAuthHeader(authHeader: string): Promise<IUserObj>;
    validateUserFromJwtPayload(payload?: IPayload): Promise<IUserObj>;
    sendOtpForLoginOrRegister(body: SendOtpDto): Promise<{
        name: string;
        timeout: Date;
        email?: string;
        phoneNumber: string;
        userId?: string;
    }>;
    verifyRegistrationOtp(body: OtpLoginDto): Promise<{
        access_token: string;
    }>;
    sendForgotOtp(mail: string): Promise<{
        email: string;
        userId: any;
        timeout: Date;
    }>;
    createForgotSession(body: CreateForgotSessionDto): Promise<{
        token: string;
    }>;
    resetPassword({ token, password }: ResetPasswordDto): Promise<import("../../lib/repository").UpdatedModel>;
    firebaseLogin(body: OtpLoginDtoFireBase): Promise<{
        access_token: string;
    }>;
    sendNameForLoginOrRegister(body: SendOtpDto): Promise<{
        name: string;
    } | {
        name?: undefined;
    }>;
    firebaseLoginBYGooGle(body: OtpLoginDtoFireBaseGoogle): Promise<{
        access_token: string;
    }>;
}
