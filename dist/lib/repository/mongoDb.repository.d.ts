/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import mongoose, { AggregateOptions, FilterQuery, Model, PipelineStage, SaveOptions, mongo, UpdateQuery, UpdateWithAggregationPipeline, MongooseBulkWriteOptions } from 'mongoose';
import { Document, ObjectId } from 'mongoose';
export type UpdatedModel = {
    matchedCount: number;
    modifiedCount: number;
    acknowledged: boolean;
    upsertedId: unknown | ObjectId;
    upsertedCount: number;
};
export type AggregationPaginationOptions = {
    sort?: {
        [data: string]: 1 | -1;
    };
    projection?: {
        [data: string]: 1 | 0;
    };
    skip?: number;
    limit?: number;
};
export type RemovedModel = {
    deletedCount: number;
    deleted: boolean;
};
export type CreatedModel<T> = {
    id: string;
    created: boolean;
    data: T;
};
export type ProjectionType<T> = {
    [P in keyof T]?: mongoose.ProjectionElementType;
};
export declare class MongoRepository<T extends Document> {
    private readonly model;
    constructor(model: Model<T>);
    startTransaction(): Promise<mongoose.mongo.ClientSession>;
    create(doc: object, saveOptions?: SaveOptions): Promise<CreatedModel<T>>;
    createMany(doc: object[], saveOptions?: SaveOptions): Promise<{
        objects: mongoose.MergeType<mongoose.IfAny<T, any, mongoose.Document<unknown, {}, T> & mongoose.Require_id<T>>, Omit<object[], "_id">>[];
        created: boolean;
    }>;
    findOne(filter: FilterQuery<T>, queryOptions?: {
        projection?: ProjectionType<T>;
        options?: mongoose.QueryOptions<T>;
    }): Promise<mongoose.IfAny<T, any, mongoose.Document<unknown, {}, T> & mongoose.Require_id<T>>>;
    findById(id: string, queryOptions?: {
        projection?: ProjectionType<T>;
        options?: mongoose.QueryOptions<T>;
    }): Promise<T | null>;
    findAll({ filter, projection, options, }: {
        filter?: FilterQuery<T> | null;
        projection?: ProjectionType<T & {
            createdAt?: Date;
            updatedAt?: Date;
        }>;
        options?: mongoose.QueryOptions<T>;
    }): Promise<{
        data: T[];
        totalCount: number;
    }>;
    count(filter: FilterQuery<T>): Promise<number>;
    aggregationPaginationPipelines({ limit, skip, sort, }: AggregationPaginationOptions): PipelineStage[];
    aggregate(pipeline: PipelineStage[], options?: AggregateOptions): Promise<any>;
    deleteById(id: string, options?: mongoose.QueryOptions<T>): Promise<mongoose.IfAny<T, any, mongoose.Document<unknown, {}, T> & mongoose.Require_id<T>>>;
    delete(filter: FilterQuery<T>, options?: mongoose.QueryOptions<T>): Promise<RemovedModel>;
    updateById(id: string, updated: UpdateWithAggregationPipeline | UpdateQuery<T>, options?: mongoose.QueryOptions<T>): Promise<UpdatedModel>;
    updateOne(filter: FilterQuery<T>, updated: UpdateWithAggregationPipeline | UpdateQuery<T>, options?: mongoose.QueryOptions<T>): Promise<UpdatedModel>;
    findOneAndUpdate(filter: FilterQuery<T>, updated: UpdateWithAggregationPipeline | UpdateQuery<T>, options?: mongoose.QueryOptions<T>): Promise<T | null>;
    updateMany(filter: FilterQuery<T>, updated: UpdateWithAggregationPipeline | UpdateQuery<T>, options?: mongoose.QueryOptions<T>): Promise<UpdatedModel>;
    bulkWrite(writes: mongo.AnyBulkWriteOperation[], options?: mongo.BulkWriteOptions & MongooseBulkWriteOptions): Promise<mongoose.mongo.BulkWriteResult>;
}
