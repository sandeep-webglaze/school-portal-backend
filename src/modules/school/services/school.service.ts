import { Connection, QueryOptions, Types } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';
import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';

import { createPaginatedMongoOptions } from '@/src/lib/utils';
import { IUserObj } from '../../user/interface';
import { MailEvents } from '../../mails-handler';
import { SlugService } from '../../slug/slug.service';
import { UploadService } from '../../upload/upload.service';
import { CreateSlugDto } from '../../slug/dto/create-slug.dto';
import { SchoolReviewService } from '../../school-review/school-review.service';
import { SchoolReviewFilterDto } from '../../school-review/dto/school-review-filter.dto';
import {
  CreateSchoolDto,
  FeaturedSchoolPriorityDto,
  UpdateSchoolDto,
} from '../dto/school.dto';
import { SchoolRepository } from '../repositories/school.repository';
import { SchoolFilterDto } from '../dto/school-filter.dto';
import { SORTING_TYPE } from '@/src/lib/constants';

@Injectable()
export class SchoolService {
  private readonly logger: Logger;
  constructor(
    @InjectConnection() private readonly connection: Connection,
    private readonly mailEvents: MailEvents,
    readonly repository: SchoolRepository,
    @Inject(forwardRef(() => SlugService))
    readonly slugService: SlugService,
    readonly schoolReviewService: SchoolReviewService,
    readonly uploadService: UploadService,
  ) {
    this.logger = new Logger(SchoolService.name);
  }

  private schoolIdFilters(includeIds?: string[], excludeIds?: string[]) {
    const isIncludeGiven = includeIds && includeIds.length > 0;
    const isExcludeGiven = excludeIds && excludeIds.length > 0;
    if (isExcludeGiven && isIncludeGiven)
      throw new BadRequestException(
        'both include and exclude are give try removing anyone of them',
      );

    if (isIncludeGiven) {
      return { $in: includeIds };
    } else if (isExcludeGiven) {
      return { $nin: excludeIds };
    }

    return;
  }

  private async getSchoolReviews(schoolId: string) {
    const schoolReviewFilter = new SchoolReviewFilterDto();
    schoolReviewFilter.schoolId = schoolId;
    schoolReviewFilter.limit = 20;
    schoolReviewFilter.page = 1;
    // school reviews
    return (
      (await this.schoolReviewService.findAll(schoolReviewFilter))?.data ?? []
    );
  }

  async create(createSchoolDto: CreateSchoolDto) {
    const transactionSession = await this.connection.startSession();
    transactionSession.startTransaction();

    try {
      const school = await this.repository.create(createSchoolDto, {
        session: transactionSession,
      });

      if (!school)
        throw new InternalServerErrorException('unable to create School');

      const slugData = new CreateSlugDto();
      slugData.slug = createSchoolDto.slug;
      slugData.filters = { school: school.id };
      await this.slugService.createIndividualSlug(
        slugData,
        createSchoolDto.name,
        { session: transactionSession },
      );

      await transactionSession.commitTransaction();
      return school;
    } catch (error) {
      await transactionSession.abortTransaction();
      throw error;
    }
  }

  async findAll(filterDto: SchoolFilterDto) {
    let { skip, limit, sortBy, ...filter } =
      createPaginatedMongoOptions(filterDto);
    let slugData: any;

    if (filter.categorySlug) {
      const filtersAndSlug = await this.slugService.getFiltersFromSlug(
        filter.categorySlug,
      );
      filter = { ...filtersAndSlug?.schoolFilters, ...filter };
      slugData = filtersAndSlug?.slugData;
    }

    let sortObj: any = { createdAt: -1 };
    if (sortBy != null && Object.keys(sortBy).length > 0) {
      sortObj = sortBy;
      if (sortBy.isFeatured != null) {
        sortObj.featuredPriority = SORTING_TYPE.ASC;
      }
    }

    if (filter.name) sortObj = { score: { $meta: "textScore" } };


    const favoritePopulate = [];
    if (filter.userId != null) {
      favoritePopulate.push({
        path: 'isFavorite',
        match: { user: filter.userId },
      });
    }

    const schools = await this.repository.findAll({
      projection: {
        name: 1,
        images: 1,
        avgRating: 1,
        minFees: 1,
        maxFees: 1,
        schoolBoards: 1,
        type: 1,
        classification: 1,
        establishmentYear: 1,
        contactNumber: 1,
        mail: 1,
        website: 1,
        slug: 1,
        isFeatured: 1,
        published: 1,
        city: 1,
        classFrom: 1,
        classTo: 1,
        // @ts-ignore
        ...(filter.name && { score: { $meta: "textScore" } }),
      },
      filter: {
        _id: this.schoolIdFilters(filter.includeId, filter.excludeId),
        classification: filter.classification && { $in: filter.classification },
        type: filter.type && { $in: filter.type },
        schoolBoards: filter.schoolBoards && { $in: filter.schoolBoards },
        minFees: filter.minFees && { $gte: filter.minFees },
        maxFees: filter.maxFees && { $lte: filter.maxFees },
        isFeatured: filter.isFeatured,
        published: filter.published,
        city: filter.city,
        // Text index is created on fields name to optimise search. 
        ...(filter.name && { $text: { $search: filter.name } }),
      },
      options: {
        limit,
        skip,
        sort: sortObj,
        populate: [
          {
            path: 'city',
            options: { projection: 'city' },
          },
          {
            path: 'schoolBoards',
            options: { projection: 'name' },
          },
          {
            path: 'type',
            options: { projection: 'name' },
          },
          {
            path: 'classification',
            options: { projection: 'name' },
          },
          ...favoritePopulate,
        ],
      },
    });

    return { schools: schools.data, slugData, totalCount: schools.totalCount };
  }

  async findOne({ slug, id }: { id?: string; slug?: string }) {
    if (!id && !slug) throw new BadRequestException('invalid id');

    const school = await this.repository.findOne(
      { _id: id, slug: slug },
      {
        options: {
          populate: [
            {
              path: 'slug',
              foreignField: 'slug',
            },
            {
              path: 'city',
              options: { projection: 'country state city icon' },
            },
            {
              path: 'schoolBoards',
              options: { projection: 'name' },
            },
            {
              path: 'facilities',
              options: { projection: 'name icon' },
            },
            {
              path: 'type',
              options: { projection: 'name' },
            },
            {
              path: 'classification',
              options: { projection: 'name' },
            },
          ],
        },
      },
    );

    if (!school) throw new NotFoundException('School not Found');

    school['reviews'] = await this.getSchoolReviews(school._id.toString());

    return school;
  }

  async sendDetailsToMail(user: IUserObj, schoolId: string) {
    const school = await this.repository.findOne(
      { _id: schoolId },
      {
        options: {
          populate: [
            {
              path: 'classification',
              options: { projection: 'name' },
            },
            {
              path: 'city',
              options: { projection: 'country state city icon' },
            },
          ],
        },
      },
    );

    if (!school) throw new NotFoundException('School not Found');

    this.mailEvents.mailSchoolDetails(user.mail, school);
    return { success: true };
  }

  async update(
    id: string,
    { removeImageUrls, ...updateSchoolDto }: UpdateSchoolDto,
  ) {
    const transactionSession = await this.connection.startSession();
    transactionSession.startTransaction();

    try {
      const school = await this.repository.findById(id);
      if (!school) throw new NotFoundException('School not found');

      // update the slug
      await this.slugService.updateSlugBySlug(
        school.slug,
        updateSchoolDto.slug,
        { session: transactionSession },
      );

      const res = await this.repository.updateById(id, updateSchoolDto, {
        session: transactionSession,
      });

      //remove image urls
      this.uploadService.removeFiles(removeImageUrls);

      await transactionSession.commitTransaction();
      return res;
    } catch (error) {
      await transactionSession.abortTransaction();
      throw error;
    } finally {
      transactionSession.endSession();
    }
  }

  updateSchoolData(
    id: string,
    { removeImageUrls, ...updateSchoolDto }: UpdateSchoolDto,
    options: QueryOptions,
  ) {
    //remove image urls
    this.uploadService.removeFiles(removeImageUrls);
    return this.repository.updateById(id, updateSchoolDto, options);
  }

  updateFeaturedSchoolPriority(priorities: FeaturedSchoolPriorityDto[] = []) {
    if (priorities.length < 1) return;
    const schoolIds = priorities.map((p) => p.schoolId);
    const bulkWriteOperations = priorities.map((p) => ({
      updateOne: {
        filter: {
          _id: new Types.ObjectId(p.schoolId),
          isFeatured: true,
        },
        update: {
          $set: {
            featuredPriority: p.priority,
          },
        },
      },
    }));

    return this.repository.bulkWrite(bulkWriteOperations);
  }

  async remove(id: string) {
    this.logger.warn(id);
    const transactionSession = await this.connection.startSession();
    transactionSession.startTransaction();

    try {
      const school = await this.repository.deleteById(id, {
        session: transactionSession,
      });

      if (!school)
        throw new InternalServerErrorException('unable to delete school');

      const deletedSlug = await this.slugService.repository.delete(
        { slug: school.slug },
        { session: transactionSession },
      );

      if (!deletedSlug.deleted)
        throw new InternalServerErrorException('unable to delete school');

      //remove image urls
      this.uploadService.removeFiles(school.images);

      await transactionSession.commitTransaction();
      return school;
    } catch (error) {
      console.log(error);

      await transactionSession.abortTransaction();
      throw error;
    }
  }
}
