import { CreateUserDto, UserRegistrationDto } from '../../user/dto/create-user.dto';
declare const LoginDto_base: import("@nestjs/common").Type<Pick<CreateUserDto, "mail">>;
export declare class LoginDto extends LoginDto_base {
    password: string;
}
declare const ForgotDto_base: import("@nestjs/common").Type<Pick<CreateUserDto, "mail">>;
export declare class ForgotDto extends ForgotDto_base {
}
declare const CreateForgotSessionDto_base: import("@nestjs/common").Type<Pick<UserRegistrationDto, "mail" | "otp">>;
export declare class CreateForgotSessionDto extends CreateForgotSessionDto_base {
}
declare const ResetPasswordDto_base: import("@nestjs/common").Type<Pick<CreateUserDto, "password">>;
export declare class ResetPasswordDto extends ResetPasswordDto_base {
    token: string;
}
declare const OtpLoginDto_base: import("@nestjs/common").Type<Pick<UserRegistrationDto, "name" | "phoneNumber" | "role" | "verificationStatus" | "otp">>;
export declare class OtpLoginDto extends OtpLoginDto_base {
}
declare const OtpLoginDtoFireBase_base: import("@nestjs/common").Type<Pick<UserRegistrationDto, "name" | "phoneNumber" | "role" | "verificationStatus">>;
export declare class OtpLoginDtoFireBase extends OtpLoginDtoFireBase_base {
    idToken: string;
}
declare const OtpLoginDtoFireBaseGoogle_base: import("@nestjs/common").Type<Pick<UserRegistrationDto, "name" | "mail" | "role" | "verificationStatus" | "imageUrl">>;
export declare class OtpLoginDtoFireBaseGoogle extends OtpLoginDtoFireBaseGoogle_base {
    idToken: string;
}
export {};
