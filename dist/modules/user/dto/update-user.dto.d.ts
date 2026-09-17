import { USER_VERIFICATION_STATUS } from '@/src/lib/constants';
import { CreateUserDto } from './create-user.dto';
import { IUser } from '../interface';
declare const UpdateUserDto_base: import("@nestjs/common").Type<Partial<Omit<CreateUserDto, "mail" | "phoneNumber" | "role" | "status" | "verificationStatus">>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
}
declare const AdminUpdateUserDto_base: import("@nestjs/common").Type<Partial<Omit<CreateUserDto, "verificationStatus">>>;
export declare class AdminUpdateUserDto extends AdminUpdateUserDto_base {
}
export declare class ToggleUsersVerificationDto implements Partial<IUser> {
    userIds: string[];
    verificationStatus?: USER_VERIFICATION_STATUS;
}
export declare class RequestVerificationDtoPhone {
    phoneNumber: string;
}
export declare class ConfirmVerificationDtoPhone extends RequestVerificationDtoPhone {
    otp: string;
}
export declare class RequestVerificationDtoEmail {
    mail: string;
}
export declare class ConfirmVerificationDtoEmail extends RequestVerificationDtoEmail {
    otp: string;
}
export {};
