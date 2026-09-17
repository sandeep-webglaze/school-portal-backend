import { Injectable } from '@nestjs/common';

import { createPaginatedMongoOptions } from '@/src/lib/utils';
import { SchoolTypeRepository } from './school-type.repository';
import { CreateSchoolTypeDto } from './dto/create-school-type.dto';
import { UpdateSchoolTypeDto } from './dto/update-school-type.dto';
import { SchoolTypeFilterDto } from './dto/filter-school-type.dto';


@Injectable()
export class SchoolTypeService {
  constructor(
    public repository: SchoolTypeRepository
  ) { }

  create(createDto: CreateSchoolTypeDto) {
    return this.repository.create(createDto)
  }

  findAll(filterDto: SchoolTypeFilterDto) {
    const { skip, limit, ...filter } = createPaginatedMongoOptions(filterDto);
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

  update(id: string, updateDto: UpdateSchoolTypeDto) {
    return this.repository.updateById(id, updateDto)
  }

  remove(id: string) {
    return this.repository.deleteById(id);
  }
}
