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
exports.LeadsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const constants_1 = require("../../lib/constants");
const decorators_1 = require("../../lib/decorators");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const leads_service_1 = require("./leads.service");
const create_lead_dto_1 = require("./dto/create-lead.dto");
const update_lead_dto_1 = require("./dto/update-lead.dto");
const filter_lead_dto_1 = require("./dto/filter-lead.dto");
let LeadsController = class LeadsController {
    constructor(leadsService) {
        this.leadsService = leadsService;
    }
    create(createLeadDto) {
        return this.leadsService.create(createLeadDto);
    }
    findAll(user, filter) {
        return this.leadsService.findAll(user, filter);
    }
    availableLeads(user, filter) {
        return this.leadsService.availableLeadsForPurchase(user, filter);
    }
    myLeads(user, filter) {
        filter.owner = user._id;
        return this.leadsService.findAll(user, filter);
    }
    update(id, updateLeadDto) {
        return this.leadsService.update(id, updateLeadDto);
    }
    remove(id) {
        return this.leadsService.remove(id);
    }
};
exports.LeadsController = LeadsController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_guard_1.AllowedRoles)(constants_1.USER_ROLE.ADMIN, constants_1.USER_ROLE.SUB_ADMIN),
    (0, swagger_1.ApiBody)({ type: create_lead_dto_1.CreateLeadDto, description: 'Json schema for registering School lead' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'School lead registered successfully', }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden to access resource.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized access.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_lead_dto_1.CreateLeadDto]),
    __metadata("design:returntype", void 0)
], LeadsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_guard_1.AllowedRoles)(constants_1.USER_ROLE.ADMIN, constants_1.USER_ROLE.SUB_ADMIN),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'All School Leads List based on applied filters.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden to access resource.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized access.' }),
    __param(0, (0, jwt_guard_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, filter_lead_dto_1.LeadFilterDto]),
    __metadata("design:returntype", void 0)
], LeadsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('available'),
    (0, roles_guard_1.AllowedRoles)(constants_1.USER_ROLE.ADMIN, constants_1.USER_ROLE.SUB_ADMIN, constants_1.USER_ROLE.SCHOOL_ADMIN),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'School Leads available for purchase based on applied filters.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden to access resource.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized access.' }),
    __param(0, (0, jwt_guard_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, filter_lead_dto_1.LeadFilterDto]),
    __metadata("design:returntype", void 0)
], LeadsController.prototype, "availableLeads", null);
__decorate([
    (0, common_1.Get)('my-leads'),
    (0, roles_guard_1.AllowedRoles)(constants_1.USER_ROLE.SCHOOL_ADMIN),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Leads Purchased by logged in user.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden to access resource.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized access.' }),
    __param(0, (0, jwt_guard_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, filter_lead_dto_1.LeadFilterDto]),
    __metadata("design:returntype", void 0)
], LeadsController.prototype, "myLeads", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_guard_1.AllowedRoles)(constants_1.USER_ROLE.ADMIN, constants_1.USER_ROLE.SUB_ADMIN),
    (0, swagger_1.ApiParam)({ type: String, name: 'id', description: 'School Lead id' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'School Lead updated.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden to access resource.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized access.' }),
    __param(0, (0, common_1.Param)('id', decorators_1.ValidateMongoId)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_lead_dto_1.UpdateLeadDto]),
    __metadata("design:returntype", void 0)
], LeadsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_guard_1.AllowedRoles)(constants_1.USER_ROLE.ADMIN),
    (0, swagger_1.ApiParam)({ type: String, name: 'id', description: 'Lead id' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'School Lead removed successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden to access resource.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized access.' }),
    __param(0, (0, common_1.Param)('id', decorators_1.ValidateMongoId)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LeadsController.prototype, "remove", null);
exports.LeadsController = LeadsController = __decorate([
    (0, swagger_1.ApiTags)('School Leads'),
    (0, swagger_1.ApiBearerAuth)('JWT_Auth'),
    (0, common_1.Controller)('leads'),
    __metadata("design:paramtypes", [leads_service_1.LeadsService])
], LeadsController);
//# sourceMappingURL=leads.controller.js.map