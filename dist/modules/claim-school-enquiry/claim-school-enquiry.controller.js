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
exports.ClaimSchoolEnquiryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const constants_1 = require("../../lib/constants");
const decorators_1 = require("../../lib/decorators");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const claim_school_enquiry_service_1 = require("./claim-school-enquiry.service");
const create_claim_school_enquiry_dto_1 = require("./dto/create-claim-school-enquiry.dto");
const update_claim_school_enquiry_dto_1 = require("./dto/update-claim-school-enquiry.dto");
const remove_claim_school_enquiry_1 = require("./dto/remove-claim-school-enquiry");
const filter_claim_school_enquiry_dto_1 = require("./dto/filter-claim-school-enquiry.dto");
let ClaimSchoolEnquiryController = class ClaimSchoolEnquiryController {
    constructor(claimSchoolEnquiryService) {
        this.claimSchoolEnquiryService = claimSchoolEnquiryService;
    }
    create(createClaimSchoolEnquiryDto) {
        return this.claimSchoolEnquiryService.create(createClaimSchoolEnquiryDto);
    }
    findAll(filter) {
        return this.claimSchoolEnquiryService.findAll(filter);
    }
    findOne(id) {
        return this.claimSchoolEnquiryService.findOne(id);
    }
    update(id, updateClaimSchoolEnquiryDto) {
        return this.claimSchoolEnquiryService.update(id, updateClaimSchoolEnquiryDto);
    }
    removeMany(body) {
        return this.claimSchoolEnquiryService.remove(body.ids);
    }
    remove(id) {
        return this.claimSchoolEnquiryService.remove(id);
    }
};
exports.ClaimSchoolEnquiryController = ClaimSchoolEnquiryController;
__decorate([
    (0, jwt_guard_1.Public)(),
    (0, common_1.Post)(),
    (0, swagger_1.ApiBody)({
        type: create_claim_school_enquiry_dto_1.CreateClaimSchoolEnquiryDto,
        description: 'Json schema for registering claim school enquiry',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Claim school enquiry registered successfully',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_claim_school_enquiry_dto_1.CreateClaimSchoolEnquiryDto]),
    __metadata("design:returntype", void 0)
], ClaimSchoolEnquiryController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiBearerAuth)('JWT_Auth'),
    (0, roles_guard_1.AllowedRoles)(constants_1.USER_ROLE.ADMIN, constants_1.USER_ROLE.SUB_ADMIN),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Claim school enquiry List based on applied filters.',
    }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden to access resource.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized access.' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_claim_school_enquiry_dto_1.FilterClaimSchoolEnquiryDto]),
    __metadata("design:returntype", void 0)
], ClaimSchoolEnquiryController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiBearerAuth)('JWT_Auth'),
    (0, roles_guard_1.AllowedRoles)(constants_1.USER_ROLE.ADMIN, constants_1.USER_ROLE.SUB_ADMIN),
    (0, swagger_1.ApiParam)({ type: String, name: 'id', description: 'Claim school enquiry id' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Claim school enquiry Detail.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden to access resource.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized access.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ClaimSchoolEnquiryController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiBearerAuth)('JWT_Auth'),
    (0, roles_guard_1.AllowedRoles)(constants_1.USER_ROLE.ADMIN, constants_1.USER_ROLE.SUB_ADMIN),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Claim school enquiry updated successfully.',
    }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden to access resource.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized access.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_claim_school_enquiry_dto_1.UpdateClaimSchoolEnquiryDto]),
    __metadata("design:returntype", void 0)
], ClaimSchoolEnquiryController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(),
    (0, swagger_1.ApiBearerAuth)('JWT_Auth'),
    (0, roles_guard_1.AllowedRoles)(constants_1.USER_ROLE.ADMIN),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Claim school Enquiries removed successfully.',
    }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden to access resource.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized access.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [remove_claim_school_enquiry_1.BulkRemoveClaimSchoolEnquiry]),
    __metadata("design:returntype", void 0)
], ClaimSchoolEnquiryController.prototype, "removeMany", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiBearerAuth)('JWT_Auth'),
    (0, roles_guard_1.AllowedRoles)(constants_1.USER_ROLE.ADMIN),
    (0, swagger_1.ApiParam)({ type: String, name: 'id', description: 'School enquiry id' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Claim school enquiry removed successfully.',
    }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden to access resource.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized access.' }),
    __param(0, (0, common_1.Param)('id', decorators_1.ValidateMongoId)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ClaimSchoolEnquiryController.prototype, "remove", null);
exports.ClaimSchoolEnquiryController = ClaimSchoolEnquiryController = __decorate([
    (0, swagger_1.ApiTags)('Claim School Enquiry'),
    (0, common_1.Controller)('claim-school-enquiry'),
    __metadata("design:paramtypes", [claim_school_enquiry_service_1.ClaimSchoolEnquiryService])
], ClaimSchoolEnquiryController);
//# sourceMappingURL=claim-school-enquiry.controller.js.map