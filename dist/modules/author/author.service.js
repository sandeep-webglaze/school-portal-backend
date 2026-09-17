"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorService = void 0;
const common_1 = require("@nestjs/common");
const create_paginated_params_util_1 = require("../../lib/utils/create-paginated-params.util");
const slug_service_1 = require("../slug/slug.service");
const author_repository_1 = require("./author.repository");
let AuthorService = class AuthorService {
    constructor(repository, slugService) {
        this.repository = repository;
        this.slugService = slugService;
    }
    create(createAuthorDto) {
        return this.repository.create(createAuthorDto);
    }
    findAll(filterDto) {
        const { skip, limit, ...filter } = (0, create_paginated_params_util_1.createPaginatedMongoOptions)(filterDto);
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
    async findOne(id) {
        const author = await this.repository.findById(id);
        if (!author)
            throw new common_1.NotFoundException('Author not found!');
        return author;
    }
    async findBySlug(slug) {
        const author = await this.repository.findOne({ slug, isActive: true });
        if (!author)
            throw new common_1.NotFoundException('Author not found!');
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
    async publishedPages(id) {
        const author = await this.repository.findById(id);
        if (!author)
            throw new common_1.NotFoundException('Author not found!');
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
        const data = pages.data.map((page) => ({
            _id: page._id,
            slug: page.slug,
            formattedText: page.formattedText,
            heroTitle: page.heroTitle,
            slugType: page.slugType,
            attribution: page.author?.toString() === author._id.toString()
                ? 'assigned'
                : 'content-link',
        }));
        return { pages: data, totalPages: pages.totalCount };
    }
    updateOne(id, updateDto) {
        return this.repository.updateById(id, updateDto);
    }
    async remove(id) {
        await this.slugService.repository.updateMany({ author: id }, { $set: { author: null } });
        return this.repository.deleteById(id);
    }
};
exports.AuthorService = AuthorService;
exports.AuthorService = AuthorService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [author_repository_1.AuthorRepository,
        slug_service_1.SlugService])
], AuthorService);
//# sourceMappingURL=author.service.js.map