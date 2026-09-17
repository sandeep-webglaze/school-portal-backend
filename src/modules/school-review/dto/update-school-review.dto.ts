import { PartialType } from '@nestjs/swagger';

import { CreateSchoolReviewDto } from './create-school-review.dto';

export class UpdateSchoolReviewDto extends PartialType(CreateSchoolReviewDto) { }
