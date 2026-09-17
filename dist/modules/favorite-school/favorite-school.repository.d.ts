import { Model } from "mongoose";
import { MongoRepository } from "@/src/lib/repository";
import { IFavoriteSchoolDocument } from "./interface";
export declare class FavoriteSchoolRepository extends MongoRepository<IFavoriteSchoolDocument> {
    private entity;
    constructor(entity: Model<IFavoriteSchoolDocument>);
}
