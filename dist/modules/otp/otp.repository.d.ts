import { Model } from 'mongoose';
import { MongoRepository } from '@/src/lib/repository';
import { IOTPDocument } from './interface';
export declare class OtpRepository extends MongoRepository<IOTPDocument> {
    private entity;
    constructor(entity: Model<IOTPDocument>);
    getOtpListAfter(identifier: string, afterTime: Date): Promise<(import("mongoose").Document<unknown, {}, IOTPDocument> & import("./interface").IOtp & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getLatestOtp(identifier: string): Promise<import("mongoose").Document<unknown, {}, IOTPDocument> & import("./interface").IOtp & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
