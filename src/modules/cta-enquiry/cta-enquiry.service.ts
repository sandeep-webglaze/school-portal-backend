import { Injectable } from '@nestjs/common';

import { createPaginatedMongoOptions } from '@/src/lib/utils';
import { CreateCtaEnquiryDto } from './dto/create-cta-enquiry.dto';
import { CtaEnquiryFilterDto } from './dto/filter-cta-enquiry.dto';
import { CtaEnquiryRepository } from './cta-enquiry.repository';

@Injectable()
export class CtaEnquiryService {
  constructor(
    readonly repository: CtaEnquiryRepository
  ) { }

  create(createCtaEnquiryDto: CreateCtaEnquiryDto) {
    return this.repository.create(createCtaEnquiryDto);
  }

  findAll(filterDto: CtaEnquiryFilterDto) {
    const { skip, limit, ...filter } = createPaginatedMongoOptions(filterDto)
    return this.repository.findAll({
      filter: {
        name: filter.name && { $regex: `^${filter.name}`, $options: 'i' },
        phoneNumber: filter.phoneNumber,
      },
      options: {
        skip,
        limit,
        sort: { createdAt: -1 },
      }
    });
  }

  findOne(id: string) {
    return this.repository.findById(id);
  }

  remove(id: string) {
    return this.repository.deleteById(id);
  }
}
