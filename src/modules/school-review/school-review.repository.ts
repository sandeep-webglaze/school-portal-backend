import { AggregateOptions, Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { MongoRepository } from '@/src/lib/repository';
import { ISchoolReviewDcoument } from './interface';
import { SchoolReviewModel } from './entities/school-review.entity';

type RatingParam = {
    avgRating: number,
    avgAcademicsRating: number,
    avgInfrastructureRating: number,
    avgAddmissionRating: number,
    avgExtracurriclarRating: number,
}

@Injectable()
export class SchoolReviewRepository extends MongoRepository<ISchoolReviewDcoument> {
    constructor(@InjectModel(SchoolReviewModel.name) private entity: Model<ISchoolReviewDcoument>) {
        super(entity);
    }

    private normaliseNumber(data: number) {
        return Math.round(data * 10) / 10;
    }

    async getAverageRating(schoolId: string, options: AggregateOptions): Promise<RatingParam> {
        const ratings: RatingParam = {
            avgRating: 0,
            avgAcademicsRating: 0,
            avgAddmissionRating: 0,
            avgExtracurriclarRating: 0,
            avgInfrastructureRating: 0,
        }
        const [data] = await this.entity.aggregate([
            {
                $match: {
                    schoolId: new Types.ObjectId(schoolId)
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
        ], options) as [RatingParam];

        if (data == null) return;

        data.avgAcademicsRating = this.normaliseNumber(data.avgAcademicsRating);
        data.avgRating = this.normaliseNumber(data.avgRating);
        data.avgAddmissionRating = this.normaliseNumber(data.avgAddmissionRating);
        data.avgExtracurriclarRating = this.normaliseNumber(data.avgExtracurriclarRating);
        data.avgInfrastructureRating = this.normaliseNumber(data.avgInfrastructureRating);

        return data;
    }
}
