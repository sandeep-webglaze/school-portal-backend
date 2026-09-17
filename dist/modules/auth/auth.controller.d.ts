import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '@/src/config/env';
import { SendOtpDto } from '../otp/dto/send-otp.dto';
import { CreateForgotSessionDto, ForgotDto, LoginDto, OtpLoginDto, OtpLoginDtoFireBase, OtpLoginDtoFireBaseGoogle, ResetPasswordDto } from './dto/login.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly configService;
    private readonly authService;
    constructor(configService: ConfigService<EnvironmentVariables>, authService: AuthService);
    login(body: LoginDto): Promise<{
        access_token: string;
        name: string;
        mail?: string;
        phoneNumber?: string;
        role: import("../../lib/constants").USER_ROLE;
        status: import("../../lib/constants").USER_STATUS;
        verificationStatus: import("../../lib/constants").USER_VERIFICATION_STATUS;
        imageUrl?: string;
        school?: string | import("mongoose").FlattenMaps<import("../school/interface").ISchoolDocument>;
        lastLoginAt?: Date;
        platform?: string;
        _id: any;
        __v?: any;
        $assertPopulated: <Paths = {}>(path: string | string[], values?: Partial<Paths>) => Omit<import("../user/interface").IUser & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, keyof Paths> & Paths;
        $clone: () => import("../user/interface").IUser & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        };
        $getAllSubdocs: () => import("mongoose").Document[];
        $ignore: (path: string) => void;
        $isDefault: (path: string) => boolean;
        $isDeleted: (val?: boolean) => boolean;
        $getPopulatedDocs: () => import("mongoose").Document[];
        $inc: (path: string | string[], val?: number) => import("../user/interface").IUser & import("mongoose").Document<any, any, any> & {
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
            (path: string | Record<string, any>, val: any, type: any, options?: import("mongoose").DocumentSetOptions): import("../user/interface").IUser & import("mongoose").Document<any, any, any> & {
                _id: import("mongoose").Types.ObjectId;
            };
            (path: string | Record<string, any>, val: any, options?: import("mongoose").DocumentSetOptions): import("../user/interface").IUser & import("mongoose").Document<any, any, any> & {
                _id: import("mongoose").Types.ObjectId;
            };
            (value: string | Record<string, any>): import("../user/interface").IUser & import("mongoose").Document<any, any, any> & {
                _id: import("mongoose").Types.ObjectId;
            };
        };
        $where: import("mongoose").FlattenMaps<Record<string, unknown>>;
        baseModelName?: string;
        collection: import("mongoose").Collection;
        db: import("mongoose").FlattenMaps<import("mongoose").Connection>;
        deleteOne: (options?: import("mongoose").QueryOptions) => any;
        depopulate: (path?: string | string[]) => import("../user/interface").IUser & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        };
        directModifiedPaths: () => Array<string>;
        equals: (doc: import("mongoose").Document<any, any, any>) => boolean;
        errors?: import("mongoose").Error.ValidationError;
        get: {
            <T extends string | number | symbol>(path: T, type?: any, options?: any): any;
            (path: string, type?: any, options?: any): any;
        };
        getChanges: () => import("mongoose").UpdateQuery<import("../user/interface").IUser & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }>;
        id?: any;
        increment: () => import("../user/interface").IUser & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        };
        init: (obj: import("mongoose").AnyObject, opts?: import("mongoose").AnyObject) => import("../user/interface").IUser & import("mongoose").Document<any, any, any> & {
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
        overwrite: (obj: import("mongoose").AnyObject) => import("../user/interface").IUser & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        };
        $parent: () => import("mongoose").Document | undefined;
        populate: {
            <Paths = {}>(path: string | import("mongoose").PopulateOptions | (string | import("mongoose").PopulateOptions)[]): Promise<import("mongoose").MergeType<import("../user/interface").IUser & import("mongoose").Document<any, any, any> & {
                _id: import("mongoose").Types.ObjectId;
            }, Paths>>;
            <Paths = {}>(path: string, select?: string | import("mongoose").AnyObject, model?: import("mongoose").Model<any>, match?: import("mongoose").AnyObject, options?: import("mongoose").PopulateOptions): Promise<import("mongoose").MergeType<import("../user/interface").IUser & import("mongoose").Document<any, any, any> & {
                _id: import("mongoose").Types.ObjectId;
            }, Paths>>;
        };
        populated: (path: string) => any;
        replaceOne: (replacement?: import("mongoose").AnyObject, options?: import("mongoose").QueryOptions | null) => import("mongoose").Query<any, import("../user/interface").IUser & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, {}, import("../user/interface").IUser & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, "find">;
        save: (options?: import("mongoose").SaveOptions) => Promise<import("../user/interface").IUser & import("mongoose").Document<any, any, any> & {
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
            <T extends string | number | symbol>(path: T, val: any, type: any, options?: import("mongoose").DocumentSetOptions): import("../user/interface").IUser & import("mongoose").Document<any, any, any> & {
                _id: import("mongoose").Types.ObjectId;
            };
            (path: string | Record<string, any>, val: any, type: any, options?: import("mongoose").DocumentSetOptions): import("../user/interface").IUser & import("mongoose").Document<any, any, any> & {
                _id: import("mongoose").Types.ObjectId;
            };
            (path: string | Record<string, any>, val: any, options?: import("mongoose").DocumentSetOptions): import("../user/interface").IUser & import("mongoose").Document<any, any, any> & {
                _id: import("mongoose").Types.ObjectId;
            };
            (value: string | Record<string, any>): import("../user/interface").IUser & import("mongoose").Document<any, any, any> & {
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
        updateOne: (update?: import("mongoose").UpdateWithAggregationPipeline | import("mongoose").UpdateQuery<import("../user/interface").IUser & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }>, options?: import("mongoose").QueryOptions | null) => import("mongoose").Query<any, import("../user/interface").IUser & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, {}, import("../user/interface").IUser & import("mongoose").Document<any, any, any> & {
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
    auth(): Promise<void>;
    googleAuthCallback(req: any, res: Response): Promise<void>;
    appGoogleVerification(accessToken: string): Promise<{
        access_token: string;
    }>;
    sendOtp(body: SendOtpDto): Promise<{
        name: string;
        timeout: Date;
        email?: string;
        phoneNumber: string;
        userId?: string;
    }>;
    verifyOtpForSignup(body: OtpLoginDto): Promise<{
        access_token: string;
    }>;
    forgotOTP(body: ForgotDto): Promise<{
        email: string;
        userId: any;
        timeout: Date;
    }>;
    verifyOtpForForgotPassword(body: CreateForgotSessionDto): Promise<{
        token: string;
    }>;
    resetPassword(body: ResetPasswordDto): Promise<import("../../lib/repository").UpdatedModel>;
    verifyToken(body: OtpLoginDtoFireBase): Promise<{
        access_token: string;
    }>;
    getUserByName(body: SendOtpDto): Promise<{
        name: string;
    } | {
        name?: undefined;
    }>;
    verifyTokenGoogle(body: OtpLoginDtoFireBaseGoogle): Promise<{
        access_token: string;
    }>;
}
