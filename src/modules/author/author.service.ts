import { Injectable, NotFoundException } from '@nestjs/common';

import { createPaginatedMongoOptions } from '@/src/lib/utils/create-paginated-params.util';
import { SlugService } from '../slug/slug.service';
import { AuthorRepository } from './author.repository';
import { CreateAuthorDto } from './dto/create-author.dto';
import { AuthorFilterDto } from './dto/filter-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorService {
  constructor(
    readonly repository: AuthorRepository,
    readonly slugService: SlugService,
  ) { }

  create(createAuthorDto: CreateAuthorDto) {
    return this.repository.create(createAuthorDto);
  }

  findAll(filterDto: AuthorFilterDto) {
    const { skip, limit, ...filter } = createPaginatedMongoOptions(filterDto);

    return this.repository.findAll({
      filter: {
        name: filter.name && { $regex: `^${filter.name}`, $options: 'i' },
        slug: filter.slug,
        isActive: filter.isActive,
      },
      options: {
        sort: { createdAt: -1 },
        skip,
        limit,
      },
    });
  }

  async findOne(id: string) {
    const author = await this.repository.findById(id);

    if (!author) throw new NotFoundException('Author not found!');

    return author;
  }

  /**
   * Public author-page payload: the author document PLUS every slug that is
   * actually attributed to them (drives the "Pages by me" section on
   * /author/[slug]). A slug counts as the author's page when EITHER:
   *   1. admin assigned this author from the slug form dropdown, OR
   *   2. the slug's content contains a link to this author's page
   *      (e.g. https://www.edhippo.com/author/gaurav-sharma) — so pasting
   *      the author link inside the content editor is enough to attribute
   *      the page, no dropdown needed.
   * Inactive authors 404 so unpublishing an expert immediately takes their
   * public page down without unassigning slugs.
   *
   * NOTE: the author id is passed as a STRING (mongoose casts it back to
   * ObjectId). Passing the raw ObjectId breaks here because the shared
   * repository runs filters through removeUndefined(), which recursively
   * rebuilds objects — an ObjectId has no enumerable keys, so it collapses
   * to undefined, the author condition silently disappears, and the query
   * returns EVERY slug in the collection.
   */
  async findBySlug(slug: string) {
    const author = await this.repository.findOne({ slug, isActive: true });

    if (!author) throw new NotFoundException('Author not found!');

    // Word boundary lookahead so /author/gaurav doesn't also match
    // /author/gaurav-sharma. Author slugs are slugified ([a-z0-9-]) so the
    // interpolation is regex-safe.
    const contentLinkPattern = `/author/${author.slug}(?![a-zA-Z0-9-])`;

    const articles = await this.slugService.repository.findAll({
      filter: {
        $or: [
          { author: author._id.toString() },
          { slugContent: { $regex: contentLinkPattern, $options: 'i' } },
        ],
      },
      projection: {
        slug: 1,
        formattedText: 1,
        heroTitle: 1,
        heroSubtitle: 1,
        slugType: 1,
      },
      options: { sort: { _id: -1 } },
    });

    return { author, articles: articles.data, totalArticles: articles.totalCount };
  }

  /**
   * Admin insight: every page (slug) where this author is published —
   * either assigned via the slug-form dropdown or linked inside the page
   * content. Unlike the public detail endpoint this also works for
   * inactive authors, and it tells the admin HOW each page is attributed.
   */
  async publishedPages(id: string) {
    const author = await this.repository.findById(id);

    if (!author) throw new NotFoundException('Author not found!');

    const contentLinkPattern = `/author/${author.slug}(?![a-zA-Z0-9-])`;

    const pages = await this.slugService.repository.findAll({
      filter: {
        $or: [
          { author: author._id.toString() },
          { slugContent: { $regex: contentLinkPattern, $options: 'i' } },
        ],
      },
      projection: {
        slug: 1,
        formattedText: 1,
        heroTitle: 1,
        slugType: 1,
        author: 1,
      },
      options: { sort: { _id: -1 } },
    });

    const data = pages.data.map((page: any) => ({
      _id: page._id,
      slug: page.slug,
      formattedText: page.formattedText,
      heroTitle: page.heroTitle,
      slugType: page.slugType,
      // "assigned" => picked from the slug form dropdown;
      // "content-link" => /author/<slug> link found inside the page content.
      attribution:
        page.author?.toString() === author._id.toString()
          ? 'assigned'
          : 'content-link',
    }));

    return { pages: data, totalPages: pages.totalCount };
  }

  updateOne(id: string, updateDto: UpdateAuthorDto) {
    return this.repository.updateById(id, updateDto);
  }

  async remove(id: string) {
    // Detach this author from every slug first so the search pages stop
    // rendering a dangling reference, then delete the author document.
    await this.slugService.repository.updateMany(
      { author: id },
      { $set: { author: null } },
    );

    return this.repository.deleteById(id);
  }
}
