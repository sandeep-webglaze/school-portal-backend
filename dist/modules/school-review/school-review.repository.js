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
exports.SchoolReviewRepository = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const repository_1 = require("../../lib/repository");
const school_review_entity_1 = require("./entities/school-review.entity");
let SchoolReviewRepository = class SchoolReviewRepository extends repository_1.MongoRepository {
    constructor(entity) {
        super(entity);
        this.entity = entity;
    }
    normaliseNumber(data) {
        return Math.round(data * 10) / 10;
    }
    async getAverageRating(schoolId, options) {
        const ratings = {
            avgRating: 0,
            avgAcademicsRating: 0,
            avgAddmissionRating: 0,
            avgExtracurriclarRating: 0,
            avgInfrastructureRating: 0,
        };
        const [data] = await this.entity.aggregate([
            {
                $match: {
                    schoolId: new mongoose_1.Types.ObjectId(schoolId)
                }
            },
            {
                "$group": {
                    "_id": "$schoolId",
                    "totalAcademics": {
                        $sum: "$academics"
                    },
                    "totalInfrastructure": {
                        $sum: "$infrastructure"
                    },
                    "totaladdmission": {
                        $sum: "$addmission"
                    },
                    "totalextracurriclar": {
                        $sum: "$extracurriclar"
                    },
                    "totaloverallRating": {
                        $sum: "$overallRating"
                    },
                    "count": {
                        "$sum": 1
                    }
                }
            },
            {
                $project: {
                    "avgRating": {
                        $divide: [
                            "$totaloverallRating",
                            "$count"
                        ]
                    },
                    avgAcademicsRating: {
                        $divide: [
                            "$totalAcademics",
                            "$count"
                        ]
                    },
                    avgInfrastructureRating: {
                        $divide: [
                            "$totalInfrastructure",
                            "$count"
                        ]
                    },
                    avgAddmissionRating: {
                        $divide: [
                            "$totaladdmission",
                            "$count"
                        ]
                    },
                    avgExtracurriclarRating: {
                        $divide: [
                            "$totalextracurriclar",
                            "$count"
                        ]
                    },
                }
            }
        ], options);
        if (data == null)
            return;
        data.avgAcademicsRating = this.normaliseNumber(data.avgAcademicsRating);
        data.avgRating = this.normaliseNumber(data.avgRating);
        data.avgAddmissionRating = this.normaliseNumber(data.avgAddmissionRating);
        data.avgExtracurriclarRating = this.normaliseNumber(data.avgExtracurriclarRating);
        data.avgInfrastructureRating = this.normaliseNumber(data.avgInfrastructureRating);
        return data;
    }
};
exports.SchoolReviewRepository = SchoolReviewRepository;
exports.SchoolReviewRepository = SchoolReviewRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(school_review_entity_1.SchoolReviewModel.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], SchoolReviewRepository);
//# sourceMappingURL=school-review.repository.js.map