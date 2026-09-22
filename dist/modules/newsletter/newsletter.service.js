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
exports.NewsletterService = void 0;
const common_1 = require("@nestjs/common");
const utils_1 = require("../../lib/utils");
const newsletter_repository_1 = require("./newsletter.repository");
let NewsletterService = class NewsletterService {
    constructor(repository) {
        this.repository = repository;
    }
    async create(dto) {
        const email = dto.email.toLowerCase().trim();
        try {
            return await this.repository.create({ email });
        }
        catch (err) {
            if (err?.code === 11000)
                return { email, message: 'Already subscribed' };
            throw err;
        }
    }
    findAll(filterDto) {
        const { skip, limit, ...filter } = (0, utils_1.createPaginatedMongoOptions)(filterDto);
        return this.repository.findAll({
            filter: {
                email: filter.email && { $regex: `^${filter.email}`, $options: 'i' },
            },
            options: { skip, limit, sort: { createdAt: -1 } },
        });
    }
    remove(id) {
        return this.repository.deleteById(id);
    }
};
exports.NewsletterService = NewsletterService;
exports.NewsletterService = NewsletterService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [newsletter_repository_1.NewsletterRepository])
], NewsletterService);
//# sourceMappingURL=newsletter.service.js.map