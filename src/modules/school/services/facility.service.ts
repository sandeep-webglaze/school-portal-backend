import { Injectable } from '@nestjs/common';

import { createPaginatedMongoOptions } from '@/src/lib/utils';
import { UploadService } from '../../upload/upload.service';
import { CreateFacilityDto, FacilityFilterDto, UpdateFacilityDto } from '../dto/facility.dto';
import { FacilityRepository } from '../repositories/facility.repository';

@Injectable()
export class FacilityService {
  constructor(
    public readonly repository: FacilityRepository,
    public readonly uploadService: UploadService
  ) { }
  create(createFacilityDto: CreateFacilityDto) {
    return this.repository.create(createFacilityDto);
  }

  findAll(filterDto: FacilityFilterDto) {
    const { limit, skip, ...filter } = createPaginatedMongoOptions(filterDto)
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

  update(id: string, updateFacilityDto: UpdateFacilityDto) {
    return this.repository.updateById(id, updateFacilityDto);
  }

  async remove(id: string) {
    const res = await this.repository.deleteById(id);

    if (res._id != null) {
      await this.uploadService.checkAndRemoveOldFile(res.icon)
    }
    return res;
  }
}
