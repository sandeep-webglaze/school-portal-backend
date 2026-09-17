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
import { USER_ROLE, USER_VERIFICATION_STATUS } from '@/src/lib/constants';
import { CreateUserDto, SchoolUserRegistrationDto } from './dto/create-user.dto';
import { UpdateUserDto, AdminUpdateUserDto, ToggleUsersVerificationDto, RequestVerificationDtoPhone, ConfirmVerificationDtoPhone, RequestVerificationDtoEmail, ConfirmVerificationDtoEmail } from './dto/update-user.dto';
import { IUserObj } from './interface';
import { UserService } from './user.service';
import { UserFilterDto } from './dto/user-filter.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<import("../../lib/repository").CreatedModel<import("./interface").IUserDocument>>;
    registerSchoolUser(createDto: SchoolUserRegistrationDto): Promise<import("../../lib/repository").CreatedModel<import("./interface").IUserDocument>>;
    findAll(user: IUserObj, filter: UserFilterDto): Promise<{
        data: import("./interface").IUserDocument[];
        totalCount: number;
    }>;
    getMe(user: IUserObj): Promise<{
        name: string;
        mail?: string;
        phoneNumber?: string;
        role: USER_ROLE;
        status: import("@/src/lib/constants").USER_STATUS;
        verificationStatus: USER_VERIFICATION_STATUS;
        imageUrl?: string;
        school?: string | import("../school/interface").ISchoolDocument;
        lastLoginAt?: Date;
        platform?: string;
        _id?: any;
        id?: any;
        createdAt: string;
        updatedAt: string;
    }>;
    findOne(id: string): Promise<import("./interface").IUserDocument>;
    toggleUsersVerificationStatus(toggleDto: ToggleUsersVerificationDto): Promise<import("../../lib/repository").UpdatedModel>;
    updateUser(userId: string, updateUserDto: AdminUpdateUserDto): Promise<import("../../lib/repository").UpdatedModel>;
    updateProfile(user: IUserObj, updateUserDto: UpdateUserDto): Promise<import("../../lib/repository").UpdatedModel>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, import("./interface").IUserDocument> & import("./interface").IUser & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    removeProfileImage(id: string): import("mongoose").Query<import("mongoose").UpdateWriteOpResult, import("mongoose").Document<unknown, {}, import("./interface").IUserDocument> & import("./interface").IUser & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, {}, import("./interface").IUserDocument, "updateOne">;
    requestVerification(user: IUserObj, dto: RequestVerificationDtoPhone): Promise<{
        userId: any;
        mobie: string;
        timeout: Date;
    }>;
    confirmVerificationForPhone(dto: ConfirmVerificationDtoPhone): Promise<import("../../lib/repository").UpdatedModel>;
    verifyPhoneFirebase(user: IUserObj, idToken: string): Promise<import("../../lib/repository").UpdatedModel>;
    requestVerificationForEmail(user: IUserObj, dto: RequestVerificationDtoEmail): Promise<{
        userId: any;
        email: string;
        timeout: Date;
    }>;
    confirmVerificationForEmail(dto: ConfirmVerificationDtoEmail): Promise<import("../../lib/repository").UpdatedModel>;
}
