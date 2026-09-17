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
var SchoolService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchoolService = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
const utils_1 = require("../../../lib/utils");
const mails_handler_1 = require("../../mails-handler");
const slug_service_1 = require("../../slug/slug.service");
const upload_service_1 = require("../../upload/upload.service");
const create_slug_dto_1 = require("../../slug/dto/create-slug.dto");
const school_review_service_1 = require("../../school-review/school-review.service");
const school_review_filter_dto_1 = require("../../school-review/dto/school-review-filter.dto");
const school_repository_1 = require("../repositories/school.repository");
const constants_1 = require("../../../lib/constants");
let SchoolService = SchoolService_1 = class SchoolService {
    constructor(connection, mailEvents, repository, slugService, schoolReviewService, uploadService) {
        this.connection = connection;
        this.mailEvents = mailEvents;
        this.repository = repository;
        this.slugService = slugService;
        this.schoolReviewService = schoolReviewService;
        this.uploadService = uploadService;
        this.logger = new common_1.Logger(SchoolService_1.name);
    }
    schoolIdFilters(includeIds, excludeIds) {
        const isIncludeGiven = includeIds && includeIds.length > 0;
        const isExcludeGiven = excludeIds && excludeIds.length > 0;
        if (isExcludeGiven && isIncludeGiven)
            throw new common_1.BadRequestException('both include and exclude are give try removing anyone of them');
        if (isIncludeGiven) {
            return { $in: includeIds };
        }
        else if (isExcludeGiven) {
            return { $nin: excludeIds };
        }
        return;
    }
    async getSchoolReviews(schoolId) {
        const schoolReviewFilter = new school_review_filter_dto_1.SchoolReviewFilterDto();
        schoolReviewFilter.schoolId = schoolId;
        schoolReviewFilter.limit = 20;
        schoolReviewFilter.page = 1;
        return ((await this.schoolReviewService.findAll(schoolReviewFilter))?.data ?? []);
    }
    async create(createSchoolDto) {
        const transactionSession = await this.connection.startSession();
        transactionSession.startTransaction();
        try {
            const school = await this.repository.create(createSchoolDto, {
                session: transactionSession,
            });
            if (!school)
                throw new common_1.InternalServerErrorException('unable to create School');
            const slugData = new create_slug_dto_1.CreateSlugDto();
            slugData.slug = createSchoolDto.slug;
            slugData.filters = { school: school.id };
            await this.slugService.createIndividualSlug(slugData, createSchoolDto.name, { session: transactionSession });
            await transactionSession.commitTransaction();
            return school;
        }
        catch (error) {
            await transactionSession.abortTransaction();
            throw error;
        }
    }
    async findAll(filterDto) {
        let { skip, limit, sortBy, ...filter } = (0, utils_1.createPaginatedMongoOptions)(filterDto);
        let slugData;
        if (filter.categorySlug) {
            const filtersAndSlug = await this.slugService.getFiltersFromSlug(filter.categorySlug);
            filter = { ...filtersAndSlug?.schoolFilters, ...filter };
            slugData = filtersAndSlug?.slugData;
        }
        let sortObj = { createdAt: -1 };
        if (sortBy != null && Object.keys(sortBy).length > 0) {
            sortObj = sortBy;
            if (sortBy.isFeatured != null) {
                sortObj.featuredPriority = constants_1.SORTING_TYPE.ASC;
            }
        }
        if (filter.name)
            sortObj = { score: { $meta: "textScore" } };
        const favoritePopulate = [];
        if (filter.userId != null) {
            favoritePopulate.push({
                path: 'isFavorite',
                match: { user: filter.userId },
            });
        }
        const schools = await this.repository.findAll({
            projection: {
                name: 1,
                images: 1,
                avgRating: 1,
                minFees: 1,
                maxFees: 1,
                schoolBoards: 1,
                type: 1,
                classification: 1,
                establishmentYear: 1,
                contactNumber: 1,
                mail: 1,
                website: 1,
                slug: 1,
                isFeatured: 1,
                published: 1,
                city: 1,
                classFrom: 1,
                classTo: 1,
                ...(filter.name && { score: { $meta: "textScore" } }),
            },
            filter: {
                _id: this.schoolIdFilters(filter.includeId, filter.excludeId),
                classification: filter.classification && { $in: filter.classification },
                type: filter.type && { $in: filter.type },
                schoolBoards: filter.schoolBoards && { $in: filter.schoolBoards },
                minFees: filter.minFees && { $gte: filter.minFees },
                maxFees: filter.maxFees && { $lte: filter.maxFees },
                isFeatured: filter.isFeatured,
                published: filter.published,
                city: filter.city,
                ...(filter.name && { $text: { $search: filter.name } }),
            },
            options: {
                limit,
                skip,
                sort: sortObj,
                populate: [
                    {
                        path: 'city',
                        options: { projection: 'city' },
                    },
                    {
                        path: 'schoolBoards',
                        options: { projection: 'name' },
                    },
                    {
                        path: 'type',
                        options: { projection: 'name' },
                    },
                    {
                        path: 'classification',
                        options: { projection: 'name' },
                    },
                    ...favoritePopulate,
                ],
            },
        });
        return { schools: schools.data, slugData, totalCount: schools.totalCount };
    }
    async findOne({ slug, id }) {
        if (!id && !slug)
            throw new common_1.BadRequestException('invalid id');
        const school = await this.repository.findOne({ _id: id, slug: slug }, {
            options: {
                populate: [
                    {
                        path: 'slug',
                        foreignField: 'slug',
                    },
                    {
                        path: 'city',
                        options: { projection: 'country state city icon' },
                    },
                    {
                        path: 'schoolBoards',
                        options: { projection: 'name' },
                    },
                    {
                        path: 'facilities',
                        options: { projection: 'name icon' },
                    },
                    {
                        path: 'type',
                        options: { projection: 'name' },
                    },
                    {
                        path: 'classification',
                        options: { projection: 'name' },
                    },
                ],
            },
        });
        if (!school)
            throw new common_1.NotFoundException('School not Found');
        school['reviews'] = await this.getSchoolReviews(school._id.toString());
        return school;
    }
    async sendDetailsToMail(user, schoolId) {
        const school = await this.repository.findOne({ _id: schoolId }, {
            options: {
                populate: [
                    {
                        path: 'classification',
                        options: { projection: 'name' },
                    },
                    {
                        path: 'city',
                        options: { projection: 'country state city icon' },
                    },
                ],
            },
        });
        if (!school)
            throw new common_1.NotFoundException('School not Found');
        this.mailEvents.mailSchoolDetails(user.mail, school);
        return { success: true };
    }
    async update(id, { removeImageUrls, ...updateSchoolDto }) {
        const transactionSession = await this.connection.startSession();
        transactionSession.startTransaction();
        try {
            const school = await this.repository.findById(id);
            if (!school)
                throw new common_1.NotFoundException('School not found');
            await this.slugService.updateSlugBySlug(school.slug, updateSchoolDto.slug, { session: transactionSession });
            const res = await this.repository.updateById(id, updateSchoolDto, {
                session: transactionSession,
            });
            this.uploadService.removeFiles(removeImageUrls);
            await transactionSession.commitTransaction();
            return res;
        }
        catch (error) {
            await transactionSession.abortTransaction();
            throw error;
        }
        finally {
            transactionSession.endSession();
        }
    }
    updateSchoolData(id, { removeImageUrls, ...updateSchoolDto }, options) {
        this.uploadService.removeFiles(removeImageUrls);
        return this.repository.updateById(id, updateSchoolDto, options);
    }
    updateFeaturedSchoolPriority(priorities = []) {
        if (priorities.length < 1)
            return;
        const schoolIds = priorities.map((p) => p.schoolId);
        const bulkWriteOperations = priorities.map((p) => ({
            updateOne: {
                filter: {
                    _id: new mongoose_1.Types.ObjectId(p.schoolId),
                    isFeatured: true,
                },
                update: {
                    $set: {
                        featuredPriority: p.priority,
                    },
                },
            },
        }));
        return this.repository.bulkWrite(bulkWriteOperations);
    }
    async remove(id) {
        this.logger.warn(id);
        const transactionSession = await this.connection.startSession();
        transactionSession.startTransaction();
        try {
            const school = await this.repository.deleteById(id, {
                session: transactionSession,
            });
            if (!school)
                throw new common_1.InternalServerErrorException('unable to delete school');
            const deletedSlug = await this.slugService.repository.delete({ slug: school.slug }, { session: transactionSession });
            if (!deletedSlug.deleted)
                throw new common_1.InternalServerErrorException('unable to delete school');
            this.uploadService.removeFiles(school.images);
            await transactionSession.commitTransaction();
            return school;
        }
        catch (error) {
            console.log(error);
            await transactionSession.abortTransaction();
            throw error;
        }
    }
};
exports.SchoolService = SchoolService;
exports.SchoolService = SchoolService = SchoolService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectConnection)()),
    __param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => slug_service_1.SlugService))),
    __metadata("design:paramtypes", [mongoose_1.Connection,
        mails_handler_1.MailEvents,
        school_repository_1.SchoolRepository,
        slug_service_1.SlugService,
        school_review_service_1.SchoolReviewService,
        upload_service_1.UploadService])
], SchoolService);
//# sourceMappingURL=school.service.js.map