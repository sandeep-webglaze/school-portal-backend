import { Connection } from 'mongoose';
import { Inject, Injectable, InternalServerErrorException, NotFoundException, forwardRef } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';

import { createPaginatedMongoOptions } from '@/src/lib/utils/create-paginated-params.util';
import { CreateSlugDto } from '../slug/dto/create-slug.dto';
import { UploadService } from '../upload/upload.service';
import { SlugService } from '../slug/slug.service';
import { CreateCityDto } from './dto/create-city.dto';
import { CityRepository } from './city.repository';
import { CityFilterDto } from './dto/city-filter.dto';
import { UpdateCityDto } from './dto/update-city.dto';

@Injectable()
export class CityService {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    readonly repository: CityRepository,
    @Inject(forwardRef(() => SlugService))
    readonly slugService: SlugService,
    readonly uploadService: UploadService,
  ) { }

  async create(createCityDto: CreateCityDto) {
    const transactionSession = await this.connection.startSession();
    transactionSession.startTransaction();

    try {
      const city = await this.repository.create(createCityDto, {
        session: transactionSession,
      });

      if (!city)
        throw new InternalServerErrorException('unable to create city');

      const slugData = new CreateSlugDto();
      slugData.slug = createCityDto.slug;
      slugData.filters = { city: city.id };
      await this.slugService.createIndividualSlug(slugData, createCityDto.city, { session: transactionSession });

      await transactionSession.commitTransaction();
      return city;
    } catch (error) {
      await transactionSession.abortTransaction();
      throw error;
    }
  }

  findAll(filterDto: CityFilterDto) {
    let { skip, limit, ...filter } = createPaginatedMongoOptions(filterDto);

    return this.repository.findAll({
      filter: {
        city: filter.city && { $regex: `^${filter.city}`, $options: 'i' },
        state: filter.state && { $regex: `^${filter.state}`, $options: 'i' },
        country: filter.country && {
          $regex: `^${filter.country}`,
          $options: 'i',
        },
        isPopularCity: filter.isPopularCity,
        slug: filter.slug,
      },
      options: {
        sort: { isPopularCity: -1 },
        skip,
        limit,
      },
    });
  }

  findOne(id: string) {
    return this.repository.findById(id);
  }

  async updateOne(id: string, updateDto: UpdateCityDto) {
    const transactionSession = await this.connection.startSession();
    transactionSession.startTransaction();

    try {
      const city = await this.repository.findById(id);
      if (!city) throw new NotFoundException('City not found');

      // update the slug
      await this.slugService.updateSlugBySlug(city.slug, updateDto.slug, {
        session: transactionSession,
      });

      const res = await this.repository.updateById(id, updateDto, {
        session: transactionSession,
      });

      //handle image change
      if (updateDto.icon != null) {
        await this.uploadService.checkAndRemoveOldFile(
          city.icon,
          updateDto.icon,
        );
      }

      await transactionSession.commitTransaction();
      return res;
    } catch (error) {
      await transactionSession.abortTransaction();
      throw error;
    }
  }

  async remove(id: string) {
    const transactionSession = await this.connection.startSession();
    transactionSession.startTransaction();

    try {
      const city = await this.repository.deleteById(id, {
        session: transactionSession,
      });

      if (!city)
        throw new InternalServerErrorException('unable to delete city');

      // delete city icon
      this.uploadService.removeFiles([city.icon]);

      const deletedSlug = await this.slugService.repository.delete(
        { slug: city.slug },
        { session: transactionSession },
      );

      if (!deletedSlug.deleted)
        throw new InternalServerErrorException('unable to delete city');

      await transactionSession.commitTransaction();
      return city;
    } catch (error) {
      await transactionSession.abortTransaction();
      throw error;
    }
  }
}
