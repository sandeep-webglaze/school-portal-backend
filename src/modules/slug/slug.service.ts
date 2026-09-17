import { Connection, FilterQuery, Model, QueryOptions, SaveOptions } from 'mongoose';
import { Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';

import { AUTHOR_MODEL, SLUG_TYPE } from '@/src/lib/constants';
import { IAuthorDocument } from '../author/interface';
import { slugify, createPaginatedMongoOptions } from '@/src/lib/utils';
import { PaginateParamDto } from '@/src/lib/shared/paginated_param.dto';
import { CityService } from '../city/city.service';
import { SchoolService } from '../school/services/school.service';
import { SchoolFilterDto } from '../school/dto/school-filter.dto';
import { AppConfigurationService } from '../app-configuration/app-configuration.service';
import { SlugRepository } from './slug.repository';
import { SlugFilterDto } from './dto/filter-slug.dto';
import { CreateSlugDto } from './dto/create-slug.dto';
import { UpdateSlugDto } from './dto/update-slug.dto';
import { ISlug, ISlugDocument, ISlugMetaTweeter, ISlugSchoolFilter } from './interface';

@Injectable()
export class SlugService {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    readonly repository: SlugRepository,
    readonly appConfigService: AppConfigurationService,
    @Inject(forwardRef(() => CityService))
    readonly cityService: CityService,
    @Inject(forwardRef(() => SchoolService))
    readonly schoolService: SchoolService,
    // Injected as a raw model (not AuthorService) to avoid a circular module
    // dependency — AuthorModule already imports SlugModule.
    @InjectModel(AUTHOR_MODEL)
    private readonly authorModel: Model<IAuthorDocument>,
  ) { }

  /**
   * Content-link author attribution. When the admin has NOT assigned an
   * author via the slug form dropdown, we scan the slug's content for an
   * author page link (e.g. https://www.edhippo.com/author/gaurav-sharma or
   * just /author/gaurav-sharma). If one is found and that author exists and
   * is active, the author object is attached to the returned slug data —
   * so pasting the author link inside the content editor is all it takes
   * for the "Expert Behind This Page" box to appear on the page.
   *
   * Returns a plain object copy when an author is attached (assigning a
   * full document onto an ObjectId path of a live mongoose doc would cast
   * it back down to just the id).
   */
  private async attachAuthorFromContentLink(slugData: any) {
    // Dropdown assignment wins — already populated by the query.
    if (!slugData || slugData.author) return slugData;

    const content: string = slugData.slugContent ?? '';
    if (!content) return slugData;

    const match = content.match(/\/author\/([a-z0-9-]+)/i);
    if (!match) return slugData;

    const author = await this.authorModel
      .findOne({ slug: match[1].toLowerCase(), isActive: true })
      .select('-fullBioHtml -__v');
    if (!author) return slugData;

    const plain =
      typeof slugData.toObject === 'function' ? slugData.toObject() : { ...slugData };
    plain.author = author;
    return plain;
  }

  private async updateSlugAssociatedEntity(
    slugId: string,
    newSlug?: string,
    options?: SaveOptions,
  ) {
    if (newSlug == null || newSlug === '') return;

    const slug = await this.findOne(slugId);
    if (!slug) throw new NotFoundException('Slug not found');

    // return if slug is not modified
    if (slug.slug === newSlug) return;

    // extract unnecessary keys
    const { id, _id, __v, ...slugFilter } = slug.toObject().filters ?? {};

    // check if slug is associated to multiple school filters
    if (Object.keys(slugFilter).length != 1) return;

    // update slug in school
    if (slugFilter.school != null) {
      return await this.schoolService.repository.updateById(
        slugFilter.school.toString(),
        { slug: newSlug },
        options,
      );
    }
    // update slug in city
    else if (slugFilter.city != null) {
      return await this.cityService.repository.updateById(
        slugFilter.city.toString(),
        { slug: newSlug },
        options,
      );
    }
  }

  private async modifySlugMetadata(slugData: ISlugDocument) {
    const slugMetaData = slugData.slugMetaData;

    const isSlugMetaExist = slugMetaData?.robots != null && slugMetaData?.openGraph != null;

    // check if slug meta data or slugJsonSchema give or not
    if (slugData.slugMetaData != null && isSlugMetaExist && slugData.slugJsonSchema != null)
      return;

    const appConfig = await this.appConfigService.findOne();

    if (!appConfig) return;

    if (slugData.slugJsonSchema == null || slugData.slugJsonSchema.length < 1) {
      slugData.slugJsonSchema = appConfig.defaultSlugJsonSchema;
    }

    const slugTitle = slugData?.slugMetaData?.title ?? appConfig.defaultSlugMetaData?.title;
    const slugTweeterData: ISlugMetaTweeter = {
      ...appConfig.defaultSlugMetaData?.twitter, // take default values
      ...slugData.slugMetaData?.twitter, // override the default values with given values
      title: slugData.slugMetaData?.twitter?.title ?? slugTitle ?? appConfig.defaultSlugMetaData?.twitter?.title,
    };

    slugData.slugMetaData = {
      ...appConfig?.defaultSlugMetaData,
      ...slugData.slugMetaData,
      title: slugTitle,
      twitter: slugTweeterData
    }
  }

  generateSlugFilters(filter: Omit<SlugFilterDto, 'limit' | 'page'>) {
    const slugFilter: FilterQuery<ISlug> = {
      slug: filter.slug && { $regex: `^${filter.slug}`, $options: 'i' },
      isHomepageSlug: filter.isHomepageSlug,
      slugType: filter.slugType,
    };

    const slugSchoolFilter: FilterQuery<ISlugSchoolFilter> = {
      type: filter.type && { $in: filter.type },
      classification: filter.classification && { $in: filter.classification },
      city: filter.city && { $in: filter.city },
      schoolBoard: filter.schoolBoard && { $in: filter.schoolBoard },
      school: filter.school,
    };

    Object.keys(slugSchoolFilter).forEach((key) => {
      if (slugSchoolFilter[key] != null)
        slugFilter[`filters.${key}`] = slugSchoolFilter[key];
    });

    return slugFilter;
  }

  async getFiltersFromSlug(slug?: string) {
    // Populate the assigned author so the search page can render the
    // "Expert Behind This Page" box without a second request. fullBioHtml is
    // excluded — that heavy blob is only needed on the dedicated author page.
    const slugData = await this.repository.findOne(
      { slug },
      {
        options: {
          populate: { path: 'author', select: '-fullBioHtml -__v' },
        },
      },
    );

    let schoolFilters = new SchoolFilterDto();

    if (!slugData) throw new NotFoundException('Slug not found');

    schoolFilters.schoolBoards = slugData.filters.schoolBoard && [
      slugData.filters.schoolBoard.toString(),
    ];
    schoolFilters.type = slugData.filters.type && [
      slugData.filters.type.toString(),
    ];
    schoolFilters.classification = slugData.filters.classification && [
      slugData.filters.classification.toString(),
    ];
    schoolFilters.city = slugData.filters.city?.toString();

    // Fallback: attribute the author from an /author/<slug> link inside the
    // slug content when the dropdown assignment is empty.
    const slugDataWithAuthor = await this.attachAuthorFromContentLink(slugData);

    return { schoolFilters, slugData: slugDataWithAuthor };
  }

  async createIndividualSlug(createDto: CreateSlugDto, title: string, options: SaveOptions) {
    createDto.slugType = SLUG_TYPE.INDIVIDUAL;

    createDto.slugMetaData = { title } as any;

    return this.repository.create(createDto, options);
  }

  async create(createDto: CreateSlugDto) {
    return this.repository.create(createDto);
  }

  findAll(filterDto?: SlugFilterDto) {
    const { limit, skip, ...slugFilter } = createPaginatedMongoOptions(filterDto);
    const filter = this.generateSlugFilters(slugFilter);

    return this.repository.findAll({
      filter,
      projection: {
        filters: 0,
        slugJsonSchema: 0,
        slugMetaData: 0,
      },
      options: {
        limit,
        skip,
      },
    });
  }

  slugSitemap(isSchool: boolean, filterDto?: PaginateParamDto) {
    const { limit, skip } = createPaginatedMongoOptions(filterDto);
    return this.repository.findAll({
      filter: {
        "filters.school": { $exists: isSchool },
        "slugMetaData.robots.index": { $ne: false }
      },
      projection: {
        filters: 0,
        slugJsonSchema: 0,
        slugMetaData: 0,
      },
      options: {
        limit,
        skip
      }
    })
  }

  async findBySlug(slug: string) {
    // Author populated for parity with getFiltersFromSlug — public consumers
    // of /slug/:id/slug also get the author box data.
    const slugData = await this.repository.findOne(
      { slug },
      {
        options: {
          populate: { path: 'author', select: '-fullBioHtml -__v' },
        },
      },
    );

    if (!slugData) throw new NotFoundException("Slug not found!");

    await this.modifySlugMetadata(slugData);

    // Same content-link fallback as getFiltersFromSlug — public consumers of
    // /slug/:id/slug get the author box data either way.
    return this.attachAuthorFromContentLink(slugData);
  }

  async findOne(id: string) {
    const slugData = await this.repository.findById(id);

    if (!slugData) throw new NotFoundException("Slug not found!");

    await this.modifySlugMetadata(slugData);

    return slugData
  }

  async updateOne(id: string, updateDto: UpdateSlugDto) {
    const transactionSession = await this.connection.startSession();
    transactionSession.startTransaction();

    try {
      const res = await this.repository.updateById(
        id,
        updateDto,
        { session: transactionSession },
      );
      if (res.matchedCount == 0) return;

      await this.updateSlugAssociatedEntity(id, updateDto.slug, {
        session: transactionSession,
      });

      await transactionSession.commitTransaction();
      return res;
    } catch (error) {
      await transactionSession.abortTransaction();
      throw error;
    }
  }

  async updateSlugBySlug(
    oldSlug: string,
    newSlug: string,
    options: QueryOptions,
  ) {
    if (!newSlug || !oldSlug) return;

    newSlug = slugify(newSlug);

    if (oldSlug === newSlug) return;
    return this.repository.updateOne(
      { slug: oldSlug },
      { slug: newSlug },
      options,
    );
  }

  remove(id: string) {
    return this.repository.deleteById(id);
  }
}
