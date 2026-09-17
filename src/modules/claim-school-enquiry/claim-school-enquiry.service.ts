import { Injectable } from '@nestjs/common';

import { createPaginatedMongoOptions } from '@/src/lib/utils';
import { CreateClaimSchoolEnquiryDto } from './dto/create-claim-school-enquiry.dto';
import { UpdateClaimSchoolEnquiryDto } from './dto/update-claim-school-enquiry.dto';
import { ClaimSchoolEnquiryRepository } from './claim-school-enquiry.repository';
import { FilterClaimSchoolEnquiryDto } from './dto/filter-claim-school-enquiry.dto';

@Injectable()
export class ClaimSchoolEnquiryService {
  constructor(
    readonly repository: ClaimSchoolEnquiryRepository,
  ) { }

  create(createSchoolEnquiryDto: CreateClaimSchoolEnquiryDto) {
    return this.repository.create(createSchoolEnquiryDto);
  }

  findAll(filterDto: FilterClaimSchoolEnquiryDto) {
    const { skip, limit, ...filter } = createPaginatedMongoOptions(filterDto)
    return this.repository.findAll({
      filter: {
        name: filter.name && { $regex: `^${filter.name}`, $options: 'i' },
        email: filter.email && { $regex: `^${filter.email}`, $options: 'i' },
        school: filter.school && { $regex: `^${filter.school}`, $options: 'i' },
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

  async update(id: string, updateDto: UpdateClaimSchoolEnquiryDto) {
    return this.repository.updateById(id, updateDto);
  }

  remove(id: string[] | string) {
    return this.repository.delete({ _id: id });
  }
}
