import { Model } from "mongoose";
import { MongoRepository } from "@/src/lib/repository";
import { IDeleteAccountRequestDocument } from "./interface";
export declare class DeleteAccountRequestRepository extends MongoRepository<IDeleteAccountRequestDocument> {
    private entity;
    constructor(entity: Model<IDeleteAccountRequestDocument>);
}
