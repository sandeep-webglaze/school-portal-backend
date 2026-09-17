import { AggregateOptions, Model } from 'mongoose';
import { MongoRepository } from '@/src/lib/repository';
import { ISchoolReviewDcoument } from './interface';
type RatingParam = {
    avgRating: number;
    avgAcademicsRating: number;
    avgInfrastructureRating: number;
    avgAddmissionRating: number;
    avgExtracurriclarRating: number;
};
export declare class SchoolReviewRepository extends MongoRepository<ISchoolReviewDcoument> {
    private entity;
    constructor(entity: Model<ISchoolReviewDcoument>);
    private normaliseNumber;
    getAverageRating(schoolId: string, options: AggregateOptions): Promise<RatingParam>;
}
export {};
