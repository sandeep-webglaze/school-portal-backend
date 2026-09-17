import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SchoolModule } from '../school/school.module';
import { SchoolReviewService } from './school-review.service';
import { SchoolReviewController } from './school-review.controller';
import { SchoolReviewRepository } from './school-review.repository';
import { SchoolReviewModel } from './entities/school-review.entity';

@Module({
  controllers: [SchoolReviewController],
  providers: [SchoolReviewRepository, SchoolReviewService],
  imports: [
    MongooseModule.forFeature([SchoolReviewModel]),
    forwardRef(() => SchoolModule)
  ],
  exports: [SchoolReviewService]
})
export class SchoolReviewModule { }
