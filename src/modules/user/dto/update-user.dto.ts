import { Types } from 'mongoose';
import { ArrayMinSize, ArrayUnique, IsArray, IsEmail, IsEnum, IsMongoId, IsNotEmpty, Matches, IsString } from 'class-validator';
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';

import { USER_VERIFICATION_STATUS } from '@/src/lib/constants';
import { CreateUserDto } from './create-user.dto';
import { IUser } from '../interface';

export class UpdateUserDto extends PartialType(OmitType(CreateUserDto, ['mail', 'phoneNumber', 'role', 'verificationStatus', 'status'])) { }

export class AdminUpdateUserDto extends PartialType(OmitType(CreateUserDto, ['verificationStatus'])) { }

export class ToggleUsersVerificationDto implements Partial<IUser> {
    @ApiProperty({ required: true, isArray: true, example: [new Types.ObjectId()], description: "Unique list of id's of school enquiries" })
    @IsArray()
    @ArrayUnique()
    @ArrayMinSize(1)
    @IsMongoId({ each: true })
    userIds: string[]

    @ApiProperty({ required: true, description: "verification status of user account", enum: USER_VERIFICATION_STATUS, })
    @IsEnum(USER_VERIFICATION_STATUS)
    verificationStatus?: USER_VERIFICATION_STATUS;
}

export class RequestVerificationDtoPhone {
    @Matches(/^\+?[0-9\s()-]{6,20}$/, { message: 'Please enter a valid phone number' })
    @IsNotEmpty()
    @ApiProperty({
        required: true,
        example: '9222443377',
        description: 'user phone number',
    })
    phoneNumber: string;
}

export class ConfirmVerificationDtoPhone extends RequestVerificationDtoPhone {
    @ApiProperty({
        required: true,
        example: '1234',
        description: 'OTP which is sent to user contact details',
    })
    @IsString()
    @IsNotEmpty()
    otp: string;
}


export class RequestVerificationDtoEmail {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
        required: true,
        example: 'Sam@mail.com',
        description: 'email of user',
    })
    mail: string;
}

export class ConfirmVerificationDtoEmail extends RequestVerificationDtoEmail {
    @ApiProperty({
        required: true,
        example: '1234',
        description: 'OTP which is sent to user contact details',
    })
    @IsString()
    @IsNotEmpty()
    otp: string;
}
