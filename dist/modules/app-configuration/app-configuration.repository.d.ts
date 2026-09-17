import { Model } from "mongoose";
import { MongoRepository } from "@/src/lib/repository/mongoDb.repository";
import { IAppConfigDocument } from "./interface";
export declare class AppConfigurationRepository extends MongoRepository<IAppConfigDocument> {
    private entity;
    constructor(entity: Model<IAppConfigDocument>);
}
