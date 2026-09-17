import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

import { MongoRepository } from "@/src/lib/repository/mongoDb.repository";
import { AppConfigurationModel } from "./entities/app-configuration.entity";
import { IAppConfigDocument } from "./interface";

export class AppConfigurationRepository extends MongoRepository<IAppConfigDocument> {
    constructor(@InjectModel(AppConfigurationModel.name) private entity: Model<IAppConfigDocument>) {
        super(entity);
    }
}