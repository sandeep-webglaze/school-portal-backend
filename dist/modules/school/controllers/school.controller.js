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
exports.SchoolController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const constants_1 = require("../../../lib/constants");
const decorators_1 = require("../../../lib/decorators");
const auth_service_1 = require("../../auth/auth.service");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const jwt_guard_1 = require("../../auth/guards/jwt.guard");
const school_dto_1 = require("../dto/school.dto");
const school_service_1 = require("../services/school.service");
const school_filter_dto_1 = require("../dto/school-filter.dto");
const school_request_dto_1 = require("../dto/school-request.dto");
let SchoolController = class SchoolController {
    constructor(schoolService, authService) {
        this.schoolService = schoolService;
        this.authService = authService;
    }
    create(createSchoolDto) {
        return this.schoolService.create(createSchoolDto);
    }
    findAll(filterDto) {
        return this.schoolService.findAll(filterDto);
    }
    async findAll2(filterDto, authHeader) {
        let published = true;
        if (authHeader && !filterDto.userId) {
            const user = await this.authService.validateUserFromAuthHeader(authHeader);
            if ([constants_1.USER_ROLE.SUB_ADMIN, constants_1.USER_ROLE.ADMIN].includes(user.role)) {
                published = filterDto.published;
            }
            filterDto.userId = user._id.toString();
        }
        filterDto.published = published;
        return this.schoolService.findAll(filterDto);
    }
    findOne(id) {
        return this.schoolService.findOne({ id });
    }
    findOneBySlug(slug) {
        return this.schoolService.findOne({ slug });
    }
    updateSchool(user, updateSchoolDto) {
        if (!user.school)
            throw new common_1.ForbiddenException('unable to find associated school');
        if (user.verificationStatus != constants_1.USER_VERIFICATION_STATUS.VERIFIED)
            throw new common_1.ForbiddenException(`Account verification is ${user.verificationStatus}`);
        return this.schoolService.update(user.school.toString(), updateSchoolDto);
    }
    update(user, id, updateSchoolDto) {
        return this.schoolService.update(id, updateSchoolDto);
    }
    updateSchoolPriorities(updateSchoolPriorityDto) {
        return this.schoolService.updateFeaturedSchoolPriority(updateSchoolPriorityDto.priorities);
    }
    sendDetailsToMail(user, id) {
        return this.schoolService.sendDetailsToMail(user, id);
    }
    remove(id) {
        return this.schoolService.remove(id);
    }
};
exports.SchoolController = SchoolController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBearerAuth)('JWT_Auth'),
    (0, roles_guard_1.AllowedRoles)(constants_1.USER_ROLE.ADMIN, constants_1.USER_ROLE.SUB_ADMIN),
    (0, swagger_1.ApiBody)({
        type: school_dto_1.CreateSchoolDto,
        description: 'Json schema for creating School',
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'School created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden to access resource.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized access.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [school_dto_1.CreateSchoolDto]),
    __metadata("design:returntype", void 0)
], SchoolController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiBearerAuth)('JWT_Auth'),
    (0, roles_guard_1.AllowedRoles)(constants_1.USER_ROLE.ADMIN, constants_1.USER_ROLE.SUB_ADMIN),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'School Lists based on applied filters.',
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [school_filter_dto_1.SchoolFilterDto]),
    __metadata("design:returntype", void 0)
], SchoolController.prototype, "findAll", null);
__decorate([
    (0, jwt_guard_1.Public)(),
    (0, common_1.Post)('list'),
    (0, swagger_1.ApiBearerAuth)('JWT_Auth'),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Public route for published School Lists based on applied filters.',
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('Authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [school_filter_dto_1.SchoolFilterDto, Object]),
    __metadata("design:returntype", Promise)
], SchoolController.prototype, "findAll2", null);
__decorate([
    (0, jwt_guard_1.Public)(),
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiParam)({ type: String, name: 'id', description: 'School id' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'School Detail.' }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'School with provided id not found.',
    }),
    __param(0, (0, common_1.Param)('id', decorators_1.ValidateMongoId)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SchoolController.prototype, "findOne", null);
__decorate([
    (0, jwt_guard_1.Public)(),
    (0, common_1.Get)(':slug/slug'),
    (0, swagger_1.ApiParam)({ type: String, name: 'slug', description: 'School slug' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'School Detail.' }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'School with provided slug not found.',
    }),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SchoolController.prototype, "findOneBySlug", null);
__decorate([
    (0, common_1.Put)(''),
    (0, swagger_1.ApiBearerAuth)('JWT_Auth'),
    (0, roles_guard_1.AllowedRoles)(constants_1.USER_ROLE.SCHOOL_ADMIN),
    (0, swagger_1.ApiParam)({ type: String, name: 'id', description: 'School id' }),
    (0, swagger_1.ApiBody)({
        type: school_request_dto_1.SchoolChangesDto,
        description: 'Json schema for updating School for school user',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'School updated.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden to access resource.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized access.' }),
    __param(0, (0, jwt_guard_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, school_request_dto_1.SchoolChangesDto]),
    __metadata("design:returntype", void 0)
], SchoolController.prototype, "updateSchool", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiBearerAuth)('JWT_Auth'),
    (0, roles_guard_1.AllowedRoles)(constants_1.USER_ROLE.ADMIN, constants_1.USER_ROLE.SUB_ADMIN),
    (0, swagger_1.ApiParam)({ type: String, name: 'id', description: 'School id' }),
    (0, swagger_1.ApiBody)({
        type: school_dto_1.UpdateSchoolDto,
        description: 'Json schema for updating School',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'School Detail.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden to access resource.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized access.' }),
    __param(0, (0, jwt_guard_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id', decorators_1.ValidateMongoId)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, school_dto_1.UpdateSchoolDto]),
    __metadata("design:returntype", void 0)
], SchoolController.prototype, "update", null);
__decorate([
    (0, common_1.Put)('featured-school/priority'),
    (0, swagger_1.ApiBearerAuth)('JWT_Auth'),
    (0, roles_guard_1.AllowedRoles)(constants_1.USER_ROLE.ADMIN, constants_1.USER_ROLE.SUB_ADMIN),
    (0, swagger_1.ApiBody)({
        type: school_dto_1.UpdateFeaturedSchoolsPriorityDto,
        description: 'Json schema for updating featured School Priorities',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Priorities Updated.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden to access resource.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized access.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [school_dto_1.UpdateFeaturedSchoolsPriorityDto]),
    __metadata("design:returntype", void 0)
], SchoolController.prototype, "updateSchoolPriorities", null);
__decorate([
    (0, common_1.Put)(':id/mail-detail'),
    (0, swagger_1.ApiBearerAuth)('JWT_Auth'),
    (0, roles_guard_1.AllowedRoles)(constants_1.USER_ROLE.USER),
    (0, swagger_1.ApiParam)({ type: String, name: "id", description: "School id" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'School Details mailed successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden to access resource.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized access.' }),
    __param(0, (0, jwt_guard_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id', decorators_1.ValidateMongoId)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], SchoolController.prototype, "sendDetailsToMail", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiBearerAuth)('JWT_Auth'),
    (0, roles_guard_1.AllowedRoles)(constants_1.USER_ROLE.ADMIN),
    (0, swagger_1.ApiParam)({ type: String, name: 'id', description: 'School id' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'School deleted.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden to access resource.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized access.' }),
    __param(0, (0, common_1.Param)('id', decorators_1.ValidateMongoId)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SchoolController.prototype, "remove", null);
exports.SchoolController = SchoolController = __decorate([
    (0, swagger_1.ApiTags)('School'),
    (0, common_1.Controller)('school'),
    __metadata("design:paramtypes", [school_service_1.SchoolService,
        auth_service_1.AuthService])
], SchoolController);
//# sourceMappingURL=school.controller.js.map