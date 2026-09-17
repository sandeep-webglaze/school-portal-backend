import { Model, PipelineStage } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { MongoRepository } from "@/src/lib/repository";
import { IFavoriteSchoolDocument } from "./interface";
import { FavoriteSchoolModel } from "./entities/favorite-school.entity";

@Injectable()
export class FavoriteSchoolRepository extends MongoRepository<IFavoriteSchoolDocument> {
    constructor(@InjectModel(FavoriteSchoolModel.name) private entity: Model<IFavoriteSchoolDocument>) {
        super(entity);
    }
}