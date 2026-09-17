import { NotFoundException } from '@nestjs/common';

export class NoDataFoundException extends NotFoundException {
  constructor(message?: string) {
    super(message ?? 'No Data Found');
  }
}
