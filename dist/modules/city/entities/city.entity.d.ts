import { Schema } from 'mongoose';
import { ICity } from '../interface';
export declare const CityModel: {
    name: string;
    schema: Schema<ICity, import("mongoose").Model<ICity, any, any, any, import("mongoose").Document<unknown, any, ICity> & ICity & {
        _id: import("mongoose").Types.ObjectId;
    }, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ICity, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<ICity>> & import("mongoose").FlatRecord<ICity> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
};
