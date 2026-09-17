import { Schema } from 'mongoose';
import { IFacility } from '../interface';
export declare const FacilityModel: {
    name: string;
    schema: Schema<IFacility, import("mongoose").Model<IFacility, any, any, any, import("mongoose").Document<unknown, any, IFacility> & IFacility & {
        _id: import("mongoose").Types.ObjectId;
    }, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, IFacility, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<IFacility>> & import("mongoose").FlatRecord<IFacility> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
};
