"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CityService = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const create_paginated_params_util_1 = require("../../lib/utils/create-paginated-params.util");
const create_slug_dto_1 = require("../slug/dto/create-slug.dto");
const upload_service_1 = require("../upload/upload.service");
const slug_service_1 = require("../slug/slug.service");
const city_repository_1 = require("./city.repository");
let CityService = class CityService {
    constructor(connection, repository, slugService, uploadService) {
        this.connection = connection;
        this.repository = repository;
        this.slugService = slugService;
        this.uploadService = uploadService;
    }
    async create(createCityDto) {
        const transactionSession = await this.connection.startSession();
        transactionSession.startTransaction();
        try {
            const city = await this.repository.create(createCityDto, {
                session: transactionSession,
            });
            if (!city)
                throw new common_1.InternalServerErrorException('unable to create city');
            const slugData = new create_slug_dto_1.CreateSlugDto();
            slugData.slug = createCityDto.slug;
            slugData.filters = { city: city.id };
            await this.slugService.createIndividualSlug(slugData, createCityDto.city, { session: transactionSession });
            await transactionSession.commitTransaction();
            return city;
        }
        catch (error) {
            await transactionSession.abortTransaction();
            throw error;
        }
    }
    findAll(filterDto) {
        let { skip, limit, ...filter } = (0, create_paginated_params_util_1.createPaginatedMongoOptions)(filterDto);
        return this.repository.findAll({
            filter: {
                city: filter.city && { $regex: `^${filter.city}`, $options: 'i' },
                state: filter.state && { $regex: `^${filter.state}`, $options: 'i' },
                country: filter.country && {
                    $regex: `^${filter.country}`,
                    $options: 'i',
                },
                isPopularCity: filter.isPopularCity,
                slug: filter.slug,
            },
            options: {
                sort: { isPopularCity: -1 },
                skip,
                limit,
            },
        });
    }
    findOne(id) {
        return this.repository.findById(id);
    }
    async updateOne(id, updateDto) {
        const transactionSession = await this.connection.startSession();
        transactionSession.startTransaction();
        try {
            const city = await this.repository.findById(id);
            if (!city)
                throw new common_1.NotFoundException('City not found');
            await this.slugService.updateSlugBySlug(city.slug, updateDto.slug, {
                session: transactionSession,
            });
            const res = await this.repository.updateById(id, updateDto, {
                session: transactionSession,
            });
            if (updateDto.icon != null) {
                await this.uploadService.checkAndRemoveOldFile(city.icon, updateDto.icon);
            }
            await transactionSession.commitTransaction();
            return res;
        }
        catch (error) {
            await transactionSession.abortTransaction();
            throw error;
        }
    }
    async remove(id) {
        const transactionSession = await this.connection.startSession();
        transactionSession.startTransaction();
        try {
            const city = await this.repository.deleteById(id, {
                session: transactionSession,
            });
            if (!city)
                throw new common_1.InternalServerErrorException('unable to delete city');
            this.uploadService.removeFiles([city.icon]);
            const deletedSlug = await this.slugService.repository.delete({ slug: city.slug }, { session: transactionSession });
            if (!deletedSlug.deleted)
                throw new common_1.InternalServerErrorException('unable to delete city');
            await transactionSession.commitTransaction();
            return city;
        }
        catch (error) {
            await transactionSession.abortTransaction();
            throw error;
        }
    }
};
exports.CityService = CityService;
exports.CityService = CityService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectConnection)()),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => slug_service_1.SlugService))),
    __metadata("design:paramtypes", [mongoose_1.Connection,
        city_repository_1.CityRepository,
        slug_service_1.SlugService,
        upload_service_1.UploadService])
], CityService);
//# sourceMappingURL=city.service.js.map