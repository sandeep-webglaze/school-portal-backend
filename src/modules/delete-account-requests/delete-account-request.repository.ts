import { Model, PipelineStage } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { MongoRepository } from "@/src/lib/repository";
import { IDeleteAccountRequestDocument } from "./interface";
import { DeleteAccountRequestModel } from "./entities/delete-account-request.entity";

@Injectable()
export class DeleteAccountRequestRepository extends MongoRepository<IDeleteAccountRequestDocument> {
    constructor(@InjectModel(DeleteAccountRequestModel.name) private entity: Model<IDeleteAccountRequestDocument>) {
        super(entity);
    }
}