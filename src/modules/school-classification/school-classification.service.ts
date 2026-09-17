import { Injectable } from '@nestjs/common';

import { createPaginatedMongoOptions } from '@/src/lib/utils';
import { SchoolClassificationRepository } from './school-classification.repository';
import { CreateSchoolClassificationDto } from './dto/create-school-classification.dto';
import { UpdateSchoolClassificationDto } from './dto/update-school-classification.dto';
import { SchoolClassificationFilterDto } from './dto/school-classification-filter.dto';

@Injectable()
export class SchoolClassificationService {
  constructor(
    public repository: SchoolClassificationRepository
  ) { }

  create(createDto: CreateSchoolClassificationDto) {
    return this.repository.create(createDto)
  }

  findAll(filterDto: SchoolClassificationFilterDto) {
    const { skip, limit, ...filter } = createPaginatedMongoOptions(filterDto)
    return this.repository.findAll({
      filter: {
        name: filter.name && { $regex: `^${filter.name}`, $options: 'i' },
      },
      options: {
        skip,
        limit
      }
    });
  }

  findOne(id: string) {
    return this.repository.findById(id);
  }

  update(id: string, updateDto: UpdateSchoolClassificationDto) {
    return this.repository.updateById(id, updateDto)
  }

  remove(id: string) {
    return this.repository.deleteById(id);
  }
}
