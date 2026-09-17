/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
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
        $getAllSubdocs: () => import("mongoose").Document<any, any, any>[];
        $ignore: (path: string) => void;
        $isDefault: (path: string) => boolean;
        $isDeleted: (val?: boolean) => boolean;
        $getPopulatedDocs: () => import("mongoose").Document<any, any, any>[];
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
            <ModelType_1 = import("mongoose").Model<any, {}, {}, {}, any, any>>(): ModelType_1;
        };
        $op: "save" | "validate" | "remove";
        $session: (session?: import("mongodb").ClientSession) => import("mongodb").ClientSession;
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
        collection: import("mongoose").Collection<import("bson").Document>;
        db: import("mongoose").FlattenMaps<import("mongoose").Connection>;
        deleteOne: (options?: import("mongoose").QueryOptions<unknown>) => any;
        depopulate: (path?: string | string[]) => IUser & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        };
        directModifiedPaths: () => string[];
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
            <T_1 extends string | number | symbol>(path: T_1, errorMsg: string | NativeError, value?: any, kind?: string): NativeError;
            (path: string, errorMsg: string | NativeError, value?: any, kind?: string): NativeError;
        };
        isDirectModified: {
            <T_2 extends string | number | symbol>(path: T_2 | T_2[]): boolean;
            (path: string | string[]): boolean;
        };
        isDirectSelected: {
            <T_3 extends string | number | symbol>(path: T_3): boolean;
            (path: string): boolean;
        };
        isInit: {
            <T_4 extends string | number | symbol>(path: T_4): boolean;
            (path: string): boolean;
        };
        isModified: {
            <T_5 extends string | number | symbol>(path?: T_5 | T_5[]): boolean;
            (path?: string | string[]): boolean;
        };
        isNew: boolean;
        isSelected: {
            <T_6 extends string | number | symbol>(path: T_6): boolean;
            (path: string): boolean;
        };
        markModified: {
            <T_7 extends string | number | symbol>(path: T_7, scope?: any): void;
            (path: string, scope?: any): void;
        };
        model: {
            <ModelType_2 = import("mongoose").Model<unknown, {}, {}, {}, import("mongoose").Document<unknown, {}, unknown> & Required<{
                _id: unknown;
            }>, any>>(name: string): ModelType_2;
            <ModelType_3 = import("mongoose").Model<any, {}, {}, {}, any, any>>(): ModelType_3;
        };
        modifiedPaths: (options?: {
            includeChildren?: boolean;
        }) => string[];
        overwrite: (obj: import("mongoose").AnyObject) => IUser & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        };
        $parent: () => import("mongoose").Document<any, any, any>;
        populate: {
            <Paths_1 = {}>(path: string | import("mongoose").PopulateOptions | (string | import("mongoose").PopulateOptions)[]): Promise<import("mongoose").MergeType<IUser & import("mongoose").Document<any, any, any> & {
                _id: import("mongoose").Types.ObjectId;
            }, Paths_1>>;
            <Paths_2 = {}>(path: string, select?: string | import("mongoose").AnyObject, model?: import("mongoose").Model<any, {}, {}, {}, any, any>, match?: import("mongoose").AnyObject, options?: import("mongoose").PopulateOptions): Promise<import("mongoose").MergeType<IUser & import("mongoose").Document<any, any, any> & {
                _id: import("mongoose").Types.ObjectId;
            }, Paths_2>>;
        };
        populated: (path: string) => any;
        replaceOne: (replacement?: import("mongoose").AnyObject, options?: import("mongoose").QueryOptions<unknown>) => import("mongoose").Query<any, IUser & import("mongoose").Document<any, any, any> & {
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
            <T_8 extends string | number | symbol>(path: T_8, val: any, type: any, options?: import("mongoose").DocumentSetOptions): IUser & import("mongoose").Document<any, any, any> & {
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
            <T_9 = any>(options?: import("mongoose").ToObjectOptions<import("mongoose").Document<unknown, {}, unknown> & Required<{
                _id: unknown;
            }>> & {
                flattenMaps?: true;
            }): import("mongoose").FlattenMaps<T_9>;
            <T_10 = any>(options: import("mongoose").ToObjectOptions<import("mongoose").Document<unknown, {}, unknown> & Required<{
                _id: unknown;
            }>> & {
                flattenMaps: false;
            }): T_10;
        };
        toObject: <T_11 = any>(options?: import("mongoose").ToObjectOptions<import("mongoose").Document<unknown, {}, unknown> & Required<{
            _id: unknown;
        }>>) => import("mongoose").Require_id<T_11>;
        unmarkModified: {
            <T_12 extends string | number | symbol>(path: T_12): void;
            (path: string): void;
        };
        updateOne: (update?: import("mongoose").UpdateWithAggregationPipeline | import("mongoose").UpdateQuery<IUser & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }>, options?: import("mongoose").QueryOptions<unknown>) => import("mongoose").Query<any, IUser & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, {}, IUser & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, "find">;
        validate: {
            <T_13 extends string | number | symbol>(pathsToValidate?: T_13 | T_13[], options?: import("mongoose").AnyObject): Promise<void>;
            (pathsToValidate?: import("mongoose").PathsToValidate, options?: import("mongoose").AnyObject): Promise<void>;
            (options: {
                pathsToSkip?: import("mongoose").pathsToSkip;
            }): Promise<void>;
        };
        validateSync: {
            (options: {
                [k: string]: any;
                pathsToSkip?: import("mongoose").pathsToSkip;
            }): import("mongoose").Error.ValidationError;
            <T_14 extends string | number | symbol>(pathsToValidate?: T_14 | T_14[], options?: import("mongoose").AnyObject): import("mongoose").Error.ValidationError;
            (pathsToValidate?: import("mongoose").PathsToValidate, options?: import("mongoose").AnyObject): import("mongoose").Error.ValidationError;
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
