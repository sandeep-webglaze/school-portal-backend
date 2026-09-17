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
exports.SchoolEnquiryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const constants_1 = require("../../lib/constants");
const decorators_1 = require("../../lib/decorators");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const school_enquiry_service_1 = require("./school-enquiry.service");
const create_school_enquiry_dto_1 = require("./dto/create-school-enquiry.dto");
const school_enquiry_filter_dto_1 = require("./dto/school-enquiry-filter.dto");
const delete_school_enquiry_dto_1 = require("./dto/delete-school-enquiry.dto");
const update_school_enquiry_dto_1 = require("./dto/update-school-enquiry.dto");
let SchoolEnquiryController = class SchoolEnquiryController {
    constructor(schoolEnquiryService) {
        this.schoolEnquiryService = schoolEnquiryService;
    }
    create(createSchoolEnquiryDto, request) {
        const forwardedFor = request.headers['x-forwarded-for'];
        const rawIp = createSchoolEnquiryDto.userIp ||
            forwardedFor?.split(',')[0]?.trim() ||
            request.socket.remoteAddress ||
            request.ip ||
            '';
        const ip = rawIp.startsWith('::ffff:')
            ? rawIp.replace('::ffff:', '')
            : rawIp;
        return this.schoolEnquiryService.create(ip, createSchoolEnquiryDto);
    }
    findAll(filter) {
        return this.schoolEnquiryService.findAll(filter);
    }
    findOne(id) {
        return this.schoolEnquiryService.findOne(id);
    }
    update(updateLeadDto) {
        return this.schoolEnquiryService.updateEnquiries(updateLeadDto);
    }
    removeMany(body) {
        return this.schoolEnquiryService.remove(body.ids);
    }
    remove(id) {
        return this.schoolEnquiryService.remove(id);
    }
};
exports.SchoolEnquiryController = SchoolEnquiryController;
__decorate([
    (0, jwt_guard_1.Public)(),
    (0, common_1.Post)(),
    (0, swagger_1.ApiBody)({
        type: create_school_enquiry_dto_1.CreateSchoolEnquiryDto,
        description: 'Json schema for registering School enquiry',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'School enquiry registered successfully',
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_school_enquiry_dto_1.CreateSchoolEnquiryDto, Object]),
    __metadata("design:returntype", void 0)
], SchoolEnquiryController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiBearerAuth)('JWT_Auth'),
    (0, roles_guard_1.AllowedRoles)(constants_1.USER_ROLE.ADMIN, constants_1.USER_ROLE.SUB_ADMIN),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'School Enquiry List based on applied filters.',
    }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden to access resource.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized access.' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [school_enquiry_filter_dto_1.SchoolEnquiryFilterDto]),
    __metadata("design:returntype", void 0)
], SchoolEnquiryController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiBearerAuth)('JWT_Auth'),
    (0, roles_guard_1.AllowedRoles)(constants_1.USER_ROLE.ADMIN, constants_1.USER_ROLE.SUB_ADMIN),
    (0, swagger_1.ApiParam)({ type: String, name: 'id', description: 'School enquiry id' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'School Enquiry Detail.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden to access resource.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized access.' }),
    __param(0, (0, common_1.Param)('id', decorators_1.ValidateMongoId)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SchoolEnquiryController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(),
    (0, swagger_1.ApiBearerAuth)('JWT_Auth'),
    (0, roles_guard_1.AllowedRoles)(constants_1.USER_ROLE.ADMIN, constants_1.USER_ROLE.SUB_ADMIN),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'School Enquiries status updated successfully.',
    }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden to access resource.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized access.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_school_enquiry_dto_1.UpdateEnquiriesDto]),
    __metadata("design:returntype", void 0)
], SchoolEnquiryController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(),
    (0, swagger_1.ApiBearerAuth)('JWT_Auth'),
    (0, roles_guard_1.AllowedRoles)(constants_1.USER_ROLE.ADMIN),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'School Enquiries removed successfully.',
    }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden to access resource.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized access.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [delete_school_enquiry_dto_1.BulkRemoveSchoolEnquiry]),
    __metadata("design:returntype", void 0)
], SchoolEnquiryController.prototype, "removeMany", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiBearerAuth)('JWT_Auth'),
    (0, roles_guard_1.AllowedRoles)(constants_1.USER_ROLE.ADMIN),
    (0, swagger_1.ApiParam)({ type: String, name: 'id', description: 'School enquiry id' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'School Enquiry removed successfully.',
    }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden to access resource.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized access.' }),
    __param(0, (0, common_1.Param)('id', decorators_1.ValidateMongoId)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SchoolEnquiryController.prototype, "remove", null);
exports.SchoolEnquiryController = SchoolEnquiryController = __decorate([
    (0, swagger_1.ApiTags)('School Enquiry'),
    (0, common_1.Controller)('school-enquiry'),
    __metadata("design:paramtypes", [school_enquiry_service_1.SchoolEnquiryService])
], SchoolEnquiryController);
//# sourceMappingURL=school-enquiry.controller.js.map