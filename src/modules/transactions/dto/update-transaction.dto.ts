import { PartialType, PickType } from '@nestjs/swagger';

import { CreateTransactionDto } from './create-transaction.dto';

export class UpdateTransactionDto extends PartialType(PickType(CreateTransactionDto, ['description'])) { }
