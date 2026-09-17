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
exports.CtaEnquiryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const constants_1 = require("../../lib/constants");
const decorators_1 = require("../../lib/decorators");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const cta_enquiry_service_1 = require("./cta-enquiry.service");
const create_cta_enquiry_dto_1 = require("./dto/create-cta-enquiry.dto");
const filter_cta_enquiry_dto_1 = require("./dto/filter-cta-enquiry.dto");
let CtaEnquiryController = class CtaEnquiryController {
    constructor(ctaEnquiryService) {
        this.ctaEnquiryService = ctaEnquiryService;
    }
    create(createSchoolEnquiryDto) {
        return this.ctaEnquiryService.create(createSchoolEnquiryDto);
    }
    findAll(filter) {
        return this.ctaEnquiryService.findAll(filter);
    }
    findOne(id) {
        return this.ctaEnquiryService.findOne(id);
    }
    remove(id) {
        return this.ctaEnquiryService.remove(id);
    }
};
exports.CtaEnquiryController = CtaEnquiryController;
__decorate([
    (0, jwt_guard_1.Public)(),
    (0, common_1.Post)(),
    (0, swagger_1.ApiBody)({ type: create_cta_enquiry_dto_1.CreateCtaEnquiryDto, description: "Json schema for registering CTA enquiry" }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "CTA enquiry registered successfully" }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_cta_enquiry_dto_1.CreateCtaEnquiryDto]),
    __metadata("design:returntype", void 0)
], CtaEnquiryController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiBearerAuth)('JWT_Auth'),
    (0, roles_guard_1.AllowedRoles)(constants_1.USER_ROLE.ADMIN, constants_1.USER_ROLE.SUB_ADMIN),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'CTA Enquiry List based on applied filters.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden to access resource.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized access.' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_cta_enquiry_dto_1.CtaEnquiryFilterDto]),
    __metadata("design:returntype", void 0)
], CtaEnquiryController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiBearerAuth)('JWT_Auth'),
    (0, roles_guard_1.AllowedRoles)(constants_1.USER_ROLE.ADMIN, constants_1.USER_ROLE.SUB_ADMIN),
    (0, swagger_1.ApiParam)({ type: String, name: "id", description: "Cta enquiry id" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'CTA Enquiry Detail.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden to access resource.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized access.' }),
    __param(0, (0, common_1.Param)('id', decorators_1.ValidateMongoId)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CtaEnquiryController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiBearerAuth)('JWT_Auth'),
    (0, roles_guard_1.AllowedRoles)(constants_1.USER_ROLE.ADMIN),
    (0, swagger_1.ApiParam)({ type: String, name: "id", description: "Cta enquiry id" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'CTA Enquiry has been removed successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden to access resource.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized access.' }),
    __param(0, (0, common_1.Param)('id', decorators_1.ValidateMongoId)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CtaEnquiryController.prototype, "remove", null);
exports.CtaEnquiryController = CtaEnquiryController = __decorate([
    (0, swagger_1.ApiTags)('CTA Enquiry'),
    (0, common_1.Controller)('cta-enquiry'),
    __metadata("design:paramtypes", [cta_enquiry_service_1.CtaEnquiryService])
], CtaEnquiryController);
//# sourceMappingURL=cta-enquiry.controller.js.map