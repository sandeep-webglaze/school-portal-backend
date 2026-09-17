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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlugController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const constants_1 = require("../../lib/constants");
const decorators_1 = require("../../lib/decorators");
const interceptors_1 = require("../../lib/interceptors");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const slug_service_1 = require("./slug.service");
const create_slug_dto_1 = require("./dto/create-slug.dto");
const filter_slug_dto_1 = require("./dto/filter-slug.dto");
const update_slug_dto_1 = require("./dto/update-slug.dto");
let SlugController = class SlugController {
    constructor(slugService) {
        this.slugService = slugService;
    }
    create(body) {
        return this.slugService.create(body);
    }
    findAll(filterDto) {
        return this.slugService.findAll(filterDto);
    }
    slugSearchSitemap(filterDto) {
        return this.slugService.slugSitemap(false, filterDto);
    }
    slugSchoolSitemap(filterDto) {
        return this.slugService.slugSitemap(true, filterDto);
    }
    slugData(id) {
        return this.slugService.findBySlug(id);
    }
    findOne(id) {
        return this.slugService.findOne(id);
    }
    update(id, body) {
        return this.slugService.updateOne(id, body);
    }
    remove(id) {
        return this.slugService.remove(id);
    }
};
exports.SlugController = SlugController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_guard_1.AllowedRoles)(constants_1.USER_ROLE.ADMIN, constants_1.USER_ROLE.SUB_ADMIN),
    (0, swagger_1.ApiBody)({ type: create_slug_dto_1.CreateSlugDto, description: "Json schema for creating Slug" }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "Slug created successfully" }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden to access resource.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized access.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_slug_dto_1.CreateSlugDto]),
    __metadata("design:returntype", void 0)
], SlugController.prototype, "create", null);
__decorate([
    (0, common_1.UseInterceptors)(interceptors_1.CachingInterceptor),
    (0, common_1.Get)(),
    (0, roles_guard_1.AllowedRoles)(constants_1.USER_ROLE.ADMIN, constants_1.USER_ROLE.SUB_ADMIN),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Slug List based on applied filters.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden to access resource.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized access.' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_slug_dto_1.SlugFilterDto]),
    __metadata("design:returntype", void 0)
], SlugController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseInterceptors)(interceptors_1.CachingInterceptor),
    (0, jwt_guard_1.Public)(),
    (0, common_1.Get)('search/site-map'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'All non school slugs.' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_slug_dto_1.SlugFilterDto]),
    __metadata("design:returntype", void 0)
], SlugController.prototype, "slugSearchSitemap", null);
__decorate([
    (0, common_1.UseInterceptors)(interceptors_1.CachingInterceptor),
    (0, jwt_guard_1.Public)(),
    (0, common_1.Get)('school/site-map'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'All school slugs.' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_slug_dto_1.SlugFilterDto]),
    __metadata("design:returntype", void 0)
], SlugController.prototype, "slugSchoolSitemap", null);
__decorate([
    (0, common_1.UseInterceptors)(interceptors_1.CachingInterceptor),
    (0, jwt_guard_1.Public)(),
    (0, common_1.Get)(':id/slug'),
    (0, swagger_1.ApiParam)({ type: String, name: "id", description: "Slug string" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Slug Detail.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Slug detail with provided slug not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SlugController.prototype, "slugData", null);
__decorate([
    (0, common_1.UseInterceptors)(interceptors_1.CachingInterceptor),
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiParam)({ type: String, name: "id", description: "Slug id" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Slug Detail.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Slug with provided id not found.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized access.' }),
    __param(0, (0, common_1.Param)('id', decorators_1.ValidateMongoId)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SlugController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_guard_1.AllowedRoles)(constants_1.USER_ROLE.ADMIN, constants_1.USER_ROLE.SUB_ADMIN),
    (0, swagger_1.ApiParam)({ type: String, name: "id", description: "Slug id" }),
    (0, swagger_1.ApiBody)({ type: update_slug_dto_1.UpdateSlugDto, description: "Json schema for updating Slug" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Slug Detail.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden to access resource.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized access.' }),
    __param(0, (0, common_1.Param)('id', decorators_1.ValidateMongoId)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_slug_dto_1.UpdateSlugDto]),
    __metadata("design:returntype", void 0)
], SlugController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_guard_1.AllowedRoles)(constants_1.USER_ROLE.ADMIN),
    (0, swagger_1.ApiParam)({ type: String, name: "id", description: "Slug id" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Slug deleted.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden to access resource.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized access.' }),
    __param(0, (0, common_1.Param)('id', decorators_1.ValidateMongoId)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SlugController.prototype, "remove", null);
exports.SlugController = SlugController = __decorate([
    (0, swagger_1.ApiTags)('Slug'),
    (0, common_1.Controller)('slug'),
    (0, swagger_1.ApiBearerAuth)('JWT_Auth'),
    __metadata("design:paramtypes", [slug_service_1.SlugService])
], SlugController);
//# sourceMappingURL=slug.controller.js.map