import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CachingModule } from '@/src/config/caching.config';
import { CityModule } from '../city/city.module';
import { SlugModule } from '../slug/slug.module';
import { AuthModule } from '../auth/auth.module';
import { UploadModule } from '../upload/upload.module';
import { SchoolReviewModule } from '../school-review/school-review.module';
import { MailsHandlerModule } from '../mails-handler/mails-handler.module';
import { SchoolService } from './services/school.service';
import { SchoolController } from './controllers/school.controller';
import { FacilityController } from './controllers/facility.controller';
import { SchoolBoardController } from './controllers/school-board.controller';
import { SchoolRepository } from './repositories/school.repository';
import { FacilityService } from './services/facility.service';
import { SchoolBoardService } from './services/school-board.service';
import { SchoolModel } from './entities/school.entity';
import { SchoolBoardModel } from './entities/school-board.entity';
import { FacilityModel } from './entities/facility.entity';
import { SchoolBoardRepository } from './repositories/school-board.repository';
import { FacilityRepository } from './repositories/facility.repository';
import { SchoolRequestController } from './controllers/school-request.controller';
import { SchoolRequestRepository } from './repositories/school-request.repository';
import { SchoolRequestService } from './services/school-request.service';
import { SchoolRequestModel } from './entities/school-request.entity';

@Module({
  controllers: [FacilityController, SchoolBoardController, SchoolController, SchoolRequestController],
  providers: [
    FacilityRepository, FacilityService,
    SchoolBoardRepository, SchoolBoardService,
    SchoolRepository, SchoolService,
    SchoolRequestRepository, SchoolRequestService,
  ],
  imports: [
    MongooseModule.forFeature([SchoolModel, SchoolBoardModel, FacilityModel, SchoolRequestModel]),
    CachingModule,
    CityModule,
    SlugModule,
    forwardRef(() => SchoolReviewModule),
    UploadModule,
    AuthModule,
    MailsHandlerModule
  ],
  exports: [SchoolService, SchoolBoardService]
})
export class SchoolModule { }
