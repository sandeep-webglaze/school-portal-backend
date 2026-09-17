"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoRepository = void 0;
const mongoose_1 = require("mongoose");
const utils_1 = require("../utils");
const common_1 = require("@nestjs/common");
class MongoRepository {
    constructor(model) {
        this.model = model;
    }
    async startTransaction() {
        return await mongoose_1.default.startSession();
    }
    async create(doc, saveOptions) {
        try {
            const createdEntity = new this.model(doc);
            const savedResult = (await createdEntity.save(saveOptions));
            return {
                id: savedResult.id,
                created: !!savedResult.id,
                data: savedResult,
            };
        }
        catch (error) {
            if (error.code === 11000)
                throw new common_1.ConflictException(`Duplicate Key ${Object.keys(error?.keyPattern ?? {}).toString()}. Key already exists`);
            throw error;
        }
    }
    async createMany(doc, saveOptions) {
        const objects = await this.model.insertMany(doc, saveOptions);
        return { objects, created: doc.length === objects.length };
    }
    async findOne(filter, queryOptions) {
        filter = (0, utils_1.removeUndefined)(filter);
        return await this.model.findOne(filter, { ...queryOptions?.projection, __v: 0 }, queryOptions?.options);
    }
    async findById(id, queryOptions) {
        return await this.model.findById(id, { ...queryOptions?.projection, __v: 0 }, queryOptions?.options);
    }
    async findAll({ filter = null, projection, options = {}, }) {
        filter = (0, utils_1.removeUndefined)(filter);
        const totalCount = await this.count(filter);
        const data = await this.model.find(filter, projection, options);
        return { data, totalCount };
    }
    async count(filter) {
        return await this.model.countDocuments(filter);
    }
    aggregationPaginationPipelines({ limit = 10, skip, sort, }) {
        const pipelines = [];
        const facetPipelines = [];
        if (sort != null) {
            pipelines.push({ $sort: sort });
        }
        if (skip != null) {
            facetPipelines.push({ $skip: skip });
        }
        facetPipelines.push({ $limit: limit });
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
    async aggregate(pipeline, options) {
        return await this.model.aggregate(pipeline, options);
    }
    async deleteById(id, options) {
        return await this.model.findByIdAndDelete(id, options);
    }
    async delete(filter, options) {
        const { deletedCount } = await this.model.deleteMany(filter, options);
        return { deletedCount, deleted: !!deletedCount };
    }
    async updateById(id, updated, options) {
        return await this.updateOne({ _id: id }, updated, options);
    }
    async updateOne(filter, updated, options) {
        try {
            return await this.model.updateOne(filter, updated, options);
        }
        catch (error) {
            if (error.code === 11000)
                throw new common_1.ConflictException(`Duplicate Key ${Object.keys(error?.keyPattern ?? {}).toString()}. Key already exists`);
            throw error;
        }
    }
    async findOneAndUpdate(filter, updated, options) {
        try {
            return await this.model.findOneAndUpdate(filter, updated, {
                ...options,
                new: true,
            });
        }
        catch (error) {
            if (error.code === 11000)
                throw new common_1.ConflictException(`Duplicate Key ${Object.keys(error?.keyPattern ?? {}).toString()}. Key already exists`);
            throw error;
        }
    }
    async updateMany(filter, updated, options) {
        return await this.model.updateMany(filter, updated, options);
    }
    async bulkWrite(writes, options) {
        return await this.model.bulkWrite(writes, options);
    }
}
exports.MongoRepository = MongoRepository;
//# sourceMappingURL=mongoDb.repository.js.map