import { Injectable } from '@nestjs/common';

import { createPaginatedMongoOptions } from '@/src/lib/utils';
import { IUserObj } from '../user/interface';
import { SchoolFilterDto } from '../school/dto/school-filter.dto';
import { SchoolService } from '../school/services/school.service';
import { FavoriteSchoolRepository } from './favorite-school.repository';
import { FilterFavoriteSchoolDto } from './dto/filter-favorite-school.dto';

@Injectable()
export class FavoriteSchoolService {
  constructor(
    readonly repository: FavoriteSchoolRepository,
    readonly schoolService: SchoolService
  ) { }

  create(user: string, school: string) {
    return this.repository.create({ user, school });
  }

  async myFavoriteSchools(user: IUserObj, filterDto: FilterFavoriteSchoolDto) {
    const { skip, limit, ...filter } = createPaginatedMongoOptions<FilterFavoriteSchoolDto>(filterDto);

    /* if (user.role === USER_ROLE.USER) */ filter.user = user._id.toString()

    const favSchoolMap = await this.repository.findAll({ filter: filter, options: { skip, limit } });

    const schoolFilterDto = new SchoolFilterDto()
    schoolFilterDto.userId = user._id.toString();
    schoolFilterDto.includeId = favSchoolMap.data.map(fav => fav.school.toString());

    if (schoolFilterDto.includeId.length < 1) return { schools: [], totalCount: 0 }

    return this.schoolService.findAll(schoolFilterDto);
  }

  remove(user: IUserObj, school: string) {
    return this.repository.delete({ user: user._id, school });
  }
}
