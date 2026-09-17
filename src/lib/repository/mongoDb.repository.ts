import mongoose, {
  AggregateOptions,
  FilterQuery,
  Model,
  PipelineStage,
  QueryOptions,
  SaveOptions,
  mongo,
  UpdateQuery,
  UpdateWithAggregationPipeline,
  MongooseBulkWriteOptions,
} from 'mongoose';
import { Document, ObjectId } from 'mongoose';
import { removeUndefined } from '../utils';
import { ConflictException } from '@nestjs/common';

export type UpdatedModel = {
  matchedCount: number;
  modifiedCount: number;
  acknowledged: boolean;
  upsertedId: unknown | ObjectId;
  upsertedCount: number;
};

export type AggregationPaginationOptions = {
  sort?: { [data: string]: 1 | -1 };
  projection?: { [data: string]: 1 | 0 };
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

export class MongoRepository<T extends Document> {
  constructor(private readonly model: Model<T>) { }

  async startTransaction() {
    return await mongoose.startSession();
  }

  async create(
    doc: object,
    saveOptions?: SaveOptions,
  ): Promise<CreatedModel<T>> {
    try {
      const createdEntity = new this.model(doc);
      const savedResult = (await createdEntity.save(saveOptions)) as any;

      return {
        id: savedResult.id,
        created: !!savedResult.id,
        data: savedResult,
      };
    } catch (error) {
      if (error.code === 11000)
        throw new ConflictException(
          `Duplicate Key ${Object.keys(
            error?.keyPattern ?? {},
          ).toString()}. Key already exists`,
        );
      throw error;
    }
  }

  async createMany(doc: object[], saveOptions?: SaveOptions) {
    const objects = await this.model.insertMany(doc, saveOptions);

    return { objects, created: doc.length === objects.length };
  }

  async findOne(
    filter: FilterQuery<T>,
    queryOptions?: {
      projection?: ProjectionType<T>;
      options?: mongoose.QueryOptions<T>;
    },
  ) {
    filter = removeUndefined(filter);
    return await this.model.findOne(
      filter,
      { ...queryOptions?.projection, __v: 0 },
      queryOptions?.options,
    );
  }

  async findById(
    id: string,
    queryOptions?: {
      projection?: ProjectionType<T>;
      options?: mongoose.QueryOptions<T>;
    },
  ): Promise<T | null> {
    return await this.model.findById(
      id,
      { ...queryOptions?.projection, __v: 0 },
      queryOptions?.options,
    );
  }

  async findAll({
    filter = null,
    projection,
    options = {},
  }: {
    filter?: FilterQuery<T> | null;
    projection?: ProjectionType<T & { createdAt?: Date; updatedAt?: Date }>;
    options?: mongoose.QueryOptions<T>;
  }): Promise<{ data: T[]; totalCount: number }> {
    filter = removeUndefined(filter);
    const totalCount = await this.count(filter);
    const data = await this.model.find(filter, projection, options);
    return { data, totalCount };
  }

  async count(filter: FilterQuery<T>): Promise<number> {
    return await this.model.countDocuments(filter);
  }

  aggregationPaginationPipelines({
    limit = 10,
    skip,
    sort,
  }: AggregationPaginationOptions): PipelineStage[] {
    const pipelines: PipelineStage[] = [];
    const facetPipelines = [];

    // handle sorting
    if (sort != null) {
      pipelines.push({ $sort: sort });
    }

    // handle pagination
    if (skip != null) {
      facetPipelines.push({ $skip: skip });
    }
    facetPipelines.push({ $limit: limit });

    // handle total count and projection
    pipelines.push({
      $facet: {
        data: facetPipelines,
        totalCount: [
          {
            $count: 'totalCount',
          },
        ],
      },
    });

    pipelines.push({
      $project: {
        data: '$data',
        totalCount: { $first: '$totalCount.totalCount' },
      },
    });

    return pipelines;
  }

  async aggregate(
    pipeline: PipelineStage[],
    options?: AggregateOptions,
  ): Promise<any> {
    return await this.model.aggregate(pipeline, options);
  }

  async deleteById(id: string, options?: mongoose.QueryOptions<T>) {
    return await this.model.findByIdAndDelete(id, options);
  }

  async delete(
    filter: FilterQuery<T>,
    options?: mongoose.QueryOptions<T>,
  ): Promise<RemovedModel> {
    const { deletedCount } = await this.model.deleteMany(filter, options);
    return { deletedCount, deleted: !!deletedCount };
  }

  async updateById(
    id: string,
    updated: UpdateWithAggregationPipeline | UpdateQuery<T>,
    options?: mongoose.QueryOptions<T>,
  ) {
    return await this.updateOne({ _id: id }, updated, options);
  }

  async updateOne(
    filter: FilterQuery<T>,
    updated: UpdateWithAggregationPipeline | UpdateQuery<T>,
    options?: mongoose.QueryOptions<T>,
  ): Promise<UpdatedModel> {
    try {
      return await this.model.updateOne(filter, updated, options);
    } catch (error) {
      if (error.code === 11000)
        throw new ConflictException(
          `Duplicate Key ${Object.keys(
            error?.keyPattern ?? {},
          ).toString()}. Key already exists`,
        );
      throw error;
    }
  }

  async findOneAndUpdate(
    filter: FilterQuery<T>,
    updated: UpdateWithAggregationPipeline | UpdateQuery<T>,
    options?: mongoose.QueryOptions<T>,
  ): Promise<T | null> {
    try {
      return await this.model.findOneAndUpdate(filter, updated, {
        ...options,
        new: true,
      });
    } catch (error) {
      if (error.code === 11000)
        throw new ConflictException(
          `Duplicate Key ${Object.keys(
            error?.keyPattern ?? {},
          ).toString()}. Key already exists`,
        );
      throw error;
    }
  }

  async updateMany(
    filter: FilterQuery<T>,
    updated: UpdateWithAggregationPipeline | UpdateQuery<T>,
    options?: mongoose.QueryOptions<T>,
  ): Promise<UpdatedModel> {
    return await this.model.updateMany(filter, updated, options);
  }

  async bulkWrite(
    writes: mongo.AnyBulkWriteOperation[],
    options?: mongo.BulkWriteOptions & MongooseBulkWriteOptions,
  ) {
    return await this.model.bulkWrite(writes, options);
  }
}
