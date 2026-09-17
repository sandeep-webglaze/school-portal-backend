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
exports.SchoolReviewService = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
const utils_1 = require("../../lib/utils");
const school_review_repository_1 = require("./school-review.repository");
const school_service_1 = require("../school/services/school.service");
let SchoolReviewService = class SchoolReviewService {
    constructor(connection, repository, schoolService) {
        this.connection = connection;
        this.repository = repository;
        this.schoolService = schoolService;
    }
    async create(userId, { schoolId, ...userReview }) {
        const review = {
            ...userReview,
            schoolId,
            user: userId,
        };
        const transactionSession = await this.connection.startSession();
        transactionSession.startTransaction();
        try {
            const updatedRating = await this.repository.updateOne({ user: userId, schoolId }, review, { upsert: true, session: transactionSession });
            const ratingData = await this.repository.getAverageRating(schoolId.toString(), { session: transactionSession });
            if (ratingData == null) {
                await transactionSession.abortTransaction();
                return;
            }
            await this.schoolService.repository.updateById(schoolId.toString(), {
                avgRating: ratingData.avgRating,
                avgAcademicsRating: ratingData.avgAcademicsRating,
                avgAddmissionRating: ratingData.avgAddmissionRating,
                avgExtracurriclarRating: ratingData.avgRating,
                avgInfrastructureRating: ratingData.avgRating,
            }, transactionSession);
            await transactionSession.commitTransaction();
            return updatedRating;
        }
        catch (error) {
            await transactionSession.abortTransaction();
            throw error;
        }
    }
    findAll(schoolFilterDto) {
        const { skip, limit, ...filter } = (0, utils_1.createPaginatedMongoOptions)(schoolFilterDto);
        return this.repository.findAll({
            filter,
            options: {
                populate: [
                    {
                        path: "user",
                        select: "name imageUrl"
                    },
                    {
                        path: "schoolId",
                        select: "name slug images"
                    }
                ],
                sort: { rating: -1 },
                skip,
                limit
            }
        });
    }
    update(id, updateSchoolReviewDto) {
        return this.repository.updateById(id, updateSchoolReviewDto);
    }
    remove(id) {
        return this.repository.deleteById(id);
    }
};
exports.SchoolReviewService = SchoolReviewService;
exports.SchoolReviewService = SchoolReviewService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectConnection)()),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => school_service_1.SchoolService))),
    __metadata("design:paramtypes", [mongoose_1.Connection,
        school_review_repository_1.SchoolReviewRepository,
        school_service_1.SchoolService])
], SchoolReviewService);
//# sourceMappingURL=school-review.service.js.map