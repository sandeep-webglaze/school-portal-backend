import { PartialType } from '@nestjs/swagger';

import { CreateSlugDto } from './create-slug.dto';

export class UpdateSlugDto extends PartialType(CreateSlugDto) { }
