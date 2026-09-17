import { Connection } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';
import { Inject, Injectable, forwardRef } from '@nestjs/common';

import { createPaginatedMongoOptions } from '@/src/lib/utils';
import { CreateSchoolReviewDto } from './dto/create-school-review.dto';
import { UpdateSchoolReviewDto } from './dto/update-school-review.dto';
import { SchoolReviewFilterDto } from './dto/school-review-filter.dto';
import { SchoolReviewRepository } from './school-review.repository';
import { SchoolService } from '../school/services/school.service';
import { ISchoolReview } from './interface';

@Injectable()
export class SchoolReviewService {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    readonly repository: SchoolReviewRepository,
    @Inject(forwardRef(() => SchoolService))
    readonly schoolService: SchoolService,
  ) { }

  async create(userId: string, { schoolId, ...userReview }: CreateSchoolReviewDto) {
    const review: ISchoolReview = {
      ...userReview,
      schoolId,
      user: userId,
    }

    const transactionSession = await this.connection.startSession();
    transactionSession.startTransaction();

    try {
      const updatedRating = await this.repository.updateOne({ user: userId, schoolId }, review, { upsert: true, session: transactionSession });

      // update property average rating
      const ratingData = await this.repository.getAverageRating(schoolId.toString(), { session: transactionSession });

      // unable to fetch avgRating or owner of property just return by aborting
      if (ratingData == null) {
        await transactionSession.abortTransaction();
        return;
      }

      await this.schoolService.repository.updateById(
        schoolId.toString(),
        {
          avgRating: ratingData.avgRating,
          avgAcademicsRating: ratingData.avgAcademicsRating,
          avgAddmissionRating: ratingData.avgAddmissionRating,
          avgExtracurriclarRating: ratingData.avgRating,
          avgInfrastructureRating: ratingData.avgRating,
        },
        transactionSession
      );

      await transactionSession.commitTransaction();

      return updatedRating;
    } catch (error) {
      await transactionSession.abortTransaction();
      throw error;
    }
  }

  findAll(schoolFilterDto: SchoolReviewFilterDto) {
    const { skip, limit, ...filter } = createPaginatedMongoOptions<SchoolReviewFilterDto>(schoolFilterDto);

    return this.repository.findAll(
      {
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
      }
    );
  }

  update(id: string, updateSchoolReviewDto: UpdateSchoolReviewDto) {
    return this.repository.updateById(id, updateSchoolReviewDto);
  }

  remove(id: string) {
    return this.repository.deleteById(id);
  }
}
