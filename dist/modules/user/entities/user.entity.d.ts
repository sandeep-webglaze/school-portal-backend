import { Schema, Types } from 'mongoose';
import { IUser, IUserDocument } from '../interface';
export declare function hashUserPassword(password: string): Promise<string>;
export declare function toUserObj(user: IUserDocument): {
    [x: string]: any;
};
export declare const comparePassword: (param: {
    currentPassword: string;
    comparePassword: string;
}) => Promise<boolean>;
export declare const UserModel: {
    name: string;
    schema: Schema<IUser, import("mongoose").Model<IUser, any, any, any, import("mongoose").Document<unknown, any, IUser> & IUser & {
        _id: Types.ObjectId;
    }, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, IUser, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<IUser>> & import("mongoose").FlatRecord<IUser> & {
        _id: Types.ObjectId;
    }>;
};
