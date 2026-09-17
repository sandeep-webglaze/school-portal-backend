import { Schema } from 'mongoose';
import { IAppConfig } from '../interface';
export declare const AppConfigurationModel: {
    name: string;
    schema: Schema<IAppConfig, import("mongoose").Model<IAppConfig, any, any, any, import("mongoose").Document<unknown, any, IAppConfig> & IAppConfig & {
        _id: import("mongoose").Types.ObjectId;
    }, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, IAppConfig, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<IAppConfig>> & import("mongoose").FlatRecord<IAppConfig> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
};
