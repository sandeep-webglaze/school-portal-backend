import { PartialType } from '@nestjs/swagger';

import { CreateSchoolClassificationDto } from './create-school-classification.dto';

export class UpdateSchoolClassificationDto extends PartialType(CreateSchoolClassificationDto) { }
