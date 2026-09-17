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
exports.AuthorController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const constants_1 = require("../../lib/constants");
const decorators_1 = require("../../lib/decorators");
const interceptors_1 = require("../../lib/interceptors");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const author_service_1 = require("./author.service");
const create_author_dto_1 = require("./dto/create-author.dto");
const filter_author_dto_1 = require("./dto/filter-author.dto");
const update_author_dto_1 = require("./dto/update-author.dto");
let AuthorController = class AuthorController {
    constructor(authorService) {
        this.authorService = authorService;
    }
    create(createAuthorDto) {
        return this.authorService.create(createAuthorDto);
    }
    findAll(filterDto) {
        return this.authorService.findAll(filterDto);
    }
    authorDetail(slug) {
        return this.authorService.findBySlug(slug);
    }
    findPublishedPages(id) {
        return this.authorService.publishedPages(id);
    }
    findOne(id) {
        return this.authorService.findOne(id);
    }
    updateOne(id, updateDto) {
        return this.authorService.updateOne(id, updateDto);
    }
    remove(id) {
        return this.authorService.remove(id);
    }
};
exports.AuthorController = AuthorController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBearerAuth)('JWT_Auth'),
    (0, roles_guard_1.AllowedRoles)(constants_1.USER_ROLE.ADMIN, constants_1.USER_ROLE.SUB_ADMIN),
    (0, swagger_1.ApiBody)({ type: create_author_dto_1.CreateAuthorDto, description: 'Json schema for creating Author' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Author created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden to access resource.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized access.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_author_dto_1.CreateAuthorDto]),
    __metadata("design:returntype", void 0)
], AuthorController.prototype, "create", null);
__decorate([
    (0, common_1.UseInterceptors)(interceptors_1.CachingInterceptor),
    (0, jwt_guard_1.Public)(),
    (0, common_1.Get)(),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Author list based on applied filters.' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_author_dto_1.AuthorFilterDto]),
    __metadata("design:returntype", void 0)
], AuthorController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseInterceptors)(interceptors_1.CachingInterceptor),
    (0, jwt_guard_1.Public)(),
    (0, common_1.Get)(':slug/detail'),
    (0, swagger_1.ApiParam)({ type: String, name: 'slug', description: 'Author page slug' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Author detail with assigned slugs.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Author with provided slug not found.' }),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AuthorController.prototype, "authorDetail", null);
__decorate([
    (0, common_1.UseInterceptors)(interceptors_1.CachingInterceptor),
    (0, common_1.Get)(':id/pages'),
    (0, swagger_1.ApiBearerAuth)('JWT_Auth'),
    (0, roles_guard_1.AllowedRoles)(constants_1.USER_ROLE.ADMIN, constants_1.USER_ROLE.SUB_ADMIN),
    (0, swagger_1.ApiParam)({ type: String, name: 'id', description: 'Author id' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Pages where this author is published.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Author with provided id not found.' }),
    __param(0, (0, common_1.Param)('id', decorators_1.ValidateMongoId)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AuthorController.prototype, "findPublishedPages", null);
__decorate([
    (0, common_1.UseInterceptors)(interceptors_1.CachingInterceptor),
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiBearerAuth)('JWT_Auth'),
    (0, roles_guard_1.AllowedRoles)(constants_1.USER_ROLE.ADMIN, constants_1.USER_ROLE.SUB_ADMIN),
    (0, swagger_1.ApiParam)({ type: String, name: 'id', description: 'Author id' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Author detail.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Author with provided id not found.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized access.' }),
    __param(0, (0, common_1.Param)('id', decorators_1.ValidateMongoId)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AuthorController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiBearerAuth)('JWT_Auth'),
    (0, roles_guard_1.AllowedRoles)(constants_1.USER_ROLE.ADMIN, constants_1.USER_ROLE.SUB_ADMIN),
    (0, swagger_1.ApiParam)({ type: String, name: 'id', description: 'Author id' }),
    (0, swagger_1.ApiBody)({ type: update_author_dto_1.UpdateAuthorDto, description: 'Json schema for updating Author' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Author detail.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden to access resource.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized access.' }),
    __param(0, (0, common_1.Param)('id', decorators_1.ValidateMongoId)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_author_dto_1.UpdateAuthorDto]),
    __metadata("design:returntype", void 0)
], AuthorController.prototype, "updateOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiBearerAuth)('JWT_Auth'),
    (0, roles_guard_1.AllowedRoles)(constants_1.USER_ROLE.ADMIN),
    (0, swagger_1.ApiParam)({ type: String, name: 'id', description: 'Author id' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Author deleted.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden to access resource.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized access.' }),
    __param(0, (0, common_1.Param)('id', decorators_1.ValidateMongoId)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AuthorController.prototype, "remove", null);
exports.AuthorController = AuthorController = __decorate([
    (0, swagger_1.ApiTags)('Author'),
    (0, common_1.Controller)('author'),
    __metadata("design:paramtypes", [author_service_1.AuthorService])
], AuthorController);
//# sourceMappingURL=author.controller.js.map