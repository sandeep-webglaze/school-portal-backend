import { PaginateParamDto } from "@/src/lib/shared";
import { USER_ROLE, USER_STATUS, USER_VERIFICATION_STATUS } from "@/src/lib/constants";
import { IUser } from "../interface";
export declare class UserFilterDto extends PaginateParamDto implements Partial<IUser> {
    name: string;
    mail: string;
    phoneNumber: string;
    role: USER_ROLE;
    verificationStatus: USER_VERIFICATION_STATUS;
    status: USER_STATUS;
}
