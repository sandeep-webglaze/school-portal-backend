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
exports.SlugService = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const constants_1 = require("../../lib/constants");
const utils_1 = require("../../lib/utils");
const city_service_1 = require("../city/city.service");
const school_service_1 = require("../school/services/school.service");
const school_filter_dto_1 = require("../school/dto/school-filter.dto");
const app_configuration_service_1 = require("../app-configuration/app-configuration.service");
const slug_repository_1 = require("./slug.repository");
let SlugService = class SlugService {
    constructor(connection, repository, appConfigService, cityService, schoolService, authorModel) {
        this.connection = connection;
        this.repository = repository;
        this.appConfigService = appConfigService;
        this.cityService = cityService;
        this.schoolService = schoolService;
        this.authorModel = authorModel;
    }
    async attachAuthorFromContentLink(slugData) {
        if (!slugData || slugData.author)
            return slugData;
        const content = slugData.slugContent ?? '';
        if (!content)
            return slugData;
        const match = content.match(/\/author\/([a-z0-9-]+)/i);
        if (!match)
            return slugData;
        const author = await this.authorModel
            .findOne({ slug: match[1].toLowerCase(), isActive: true })
            .select('-fullBioHtml -__v');
        if (!author)
            return slugData;
        const plain = typeof slugData.toObject === 'function' ? slugData.toObject() : { ...slugData };
        plain.author = author;
        return plain;
    }
    async updateSlugAssociatedEntity(slugId, newSlug, options) {
        if (newSlug == null || newSlug === '')
            return;
        const slug = await this.findOne(slugId);
        if (!slug)
            throw new common_1.NotFoundException('Slug not found');
        if (slug.slug === newSlug)
            return;
        const { id, _id, __v, ...slugFilter } = slug.toObject().filters ?? {};
        if (Object.keys(slugFilter).length != 1)
            return;
        if (slugFilter.school != null) {
            return await this.schoolService.repository.updateById(slugFilter.school.toString(), { slug: newSlug }, options);
        }
        else if (slugFilter.city != null) {
            return await this.cityService.repository.updateById(slugFilter.city.toString(), { slug: newSlug }, options);
        }
    }
    async modifySlugMetadata(slugData) {
        const slugMetaData = slugData.slugMetaData;
        const isSlugMetaExist = slugMetaData?.robots != null && slugMetaData?.openGraph != null;
        if (slugData.slugMetaData != null && isSlugMetaExist && slugData.slugJsonSchema != null)
            return;
        const appConfig = await this.appConfigService.findOne();
        if (!appConfig)
            return;
        if (slugData.slugJsonSchema == null || slugData.slugJsonSchema.length < 1) {
            slugData.slugJsonSchema = appConfig.defaultSlugJsonSchema;
        }
        const slugTitle = slugData?.slugMetaData?.title ?? appConfig.defaultSlugMetaData?.title;
        const slugTweeterData = {
            ...appConfig.defaultSlugMetaData?.twitter,
            ...slugData.slugMetaData?.twitter,
            title: slugData.slugMetaData?.twitter?.title ?? slugTitle ?? appConfig.defaultSlugMetaData?.twitter?.title,
        };
        slugData.slugMetaData = {
            ...appConfig?.defaultSlugMetaData,
            ...slugData.slugMetaData,
            title: slugTitle,
            twitter: slugTweeterData
        };
    }
    generateSlugFilters(filter) {
        const slugFilter = {
            slug: filter.slug && { $regex: `^${filter.slug}`, $options: 'i' },
            isHomepageSlug: filter.isHomepageSlug,
            slugType: filter.slugType,
        };
        const slugSchoolFilter = {
            type: filter.type && { $in: filter.type },
            classification: filter.classification && { $in: filter.classification },
            city: filter.city && { $in: filter.city },
            schoolBoard: filter.schoolBoard && { $in: filter.schoolBoard },
            school: filter.school,
        };
        Object.keys(slugSchoolFilter).forEach((key) => {
            if (slugSchoolFilter[key] != null)
                slugFilter[`filters.${key}`] = slugSchoolFilter[key];
        });
        return slugFilter;
    }
    async getFiltersFromSlug(slug) {
        const slugData = await this.repository.findOne({ slug }, {
            options: {
                populate: { path: 'author', select: '-fullBioHtml -__v' },
            },
        });
        let schoolFilters = new school_filter_dto_1.SchoolFilterDto();
        if (!slugData)
            throw new common_1.NotFoundException('Slug not found');
        schoolFilters.schoolBoards = slugData.filters.schoolBoard && [
            slugData.filters.schoolBoard.toString(),
        ];
        schoolFilters.type = slugData.filters.type && [
            slugData.filters.type.toString(),
        ];
        schoolFilters.classification = slugData.filters.classification && [
            slugData.filters.classification.toString(),
        ];
        schoolFilters.city = slugData.filters.city?.toString();
        const slugDataWithAuthor = await this.attachAuthorFromContentLink(slugData);
        return { schoolFilters, slugData: slugDataWithAuthor };
    }
    async createIndividualSlug(createDto, title, options) {
        createDto.slugType = constants_1.SLUG_TYPE.INDIVIDUAL;
        createDto.slugMetaData = { title };
        return this.repository.create(createDto, options);
    }
    async create(createDto) {
        return this.repository.create(createDto);
    }
    findAll(filterDto) {
        const { limit, skip, ...slugFilter } = (0, utils_1.createPaginatedMongoOptions)(filterDto);
        const filter = this.generateSlugFilters(slugFilter);
        return this.repository.findAll({
            filter,
            projection: {
                filters: 0,
                slugJsonSchema: 0,
                slugMetaData: 0,
            },
            options: {
                limit,
                skip,
            },
        });
    }
    slugSitemap(isSchool, filterDto) {
        const { limit, skip } = (0, utils_1.createPaginatedMongoOptions)(filterDto);
        return this.repository.findAll({
            filter: {
                "filters.school": { $exists: isSchool },
                "slugMetaData.robots.index": { $ne: false }
            },
            projection: {
                filters: 0,
                slugJsonSchema: 0,
                slugMetaData: 0,
            },
            options: {
                limit,
                skip
            }
        });
    }
    async findBySlug(slug) {
        const slugData = await this.repository.findOne({ slug }, {
            options: {
                populate: { path: 'author', select: '-fullBioHtml -__v' },
            },
        });
        if (!slugData)
            throw new common_1.NotFoundException("Slug not found!");
        await this.modifySlugMetadata(slugData);
        return this.attachAuthorFromContentLink(slugData);
    }
    async findOne(id) {
        const slugData = await this.repository.findById(id);
        if (!slugData)
            throw new common_1.NotFoundException("Slug not found!");
        await this.modifySlugMetadata(slugData);
        return slugData;
    }
    async updateOne(id, updateDto) {
        const transactionSession = await this.connection.startSession();
        transactionSession.startTransaction();
        try {
            const res = await this.repository.updateById(id, updateDto, { session: transactionSession });
            if (res.matchedCount == 0)
                return;
            await this.updateSlugAssociatedEntity(id, updateDto.slug, {
                session: transactionSession,
            });
            await transactionSession.commitTransaction();
            return res;
        }
        catch (error) {
            await transactionSession.abortTransaction();
            throw error;
        }
    }
    async updateSlugBySlug(oldSlug, newSlug, options) {
        if (!newSlug || !oldSlug)
            return;
        newSlug = (0, utils_1.slugify)(newSlug);
        if (oldSlug === newSlug)
            return;
        return this.repository.updateOne({ slug: oldSlug }, { slug: newSlug }, options);
    }
    remove(id) {
        return this.repository.deleteById(id);
    }
};
exports.SlugService = SlugService;
exports.SlugService = SlugService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectConnection)()),
    __param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => city_service_1.CityService))),
    __param(4, (0, common_1.Inject)((0, common_1.forwardRef)(() => school_service_1.SchoolService))),
    __param(5, (0, mongoose_2.InjectModel)(constants_1.AUTHOR_MODEL)),
    __metadata("design:paramtypes", [mongoose_1.Connection,
        slug_repository_1.SlugRepository,
        app_configuration_service_1.AppConfigurationService,
        city_service_1.CityService,
        school_service_1.SchoolService,
        mongoose_1.Model])
], SlugService);
//# sourceMappingURL=slug.service.js.map