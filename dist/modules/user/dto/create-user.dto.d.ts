import { PLATFORMS, USER_ROLE, USER_STATUS, USER_VERIFICATION_STATUS } from '@/src/lib/constants';
import { IUser } from '../interface';
export declare class CreateUserDto implements IUser {
    name: string;
    mail: string;
    password: string;
    phoneNumber: string;
    status: USER_STATUS;
    verificationStatus: USER_VERIFICATION_STATUS;
    role: USER_ROLE;
    imageUrl?: string;
    platform?: PLATFORMS;
}
export declare class UserRegistrationDto extends CreateUserDto {
    otp: string;
    verificationStatus: USER_VERIFICATION_STATUS;
    role: USER_ROLE;
}
export declare class SchoolUserRegistrationDto extends CreateUserDto {
    school: string;
    verificationStatus: USER_VERIFICATION_STATUS;
    role: USER_ROLE;
}
