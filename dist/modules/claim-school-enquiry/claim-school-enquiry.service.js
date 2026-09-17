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
exports.ClaimSchoolEnquiryService = void 0;
const common_1 = require("@nestjs/common");
const utils_1 = require("../../lib/utils");
const claim_school_enquiry_repository_1 = require("./claim-school-enquiry.repository");
let ClaimSchoolEnquiryService = class ClaimSchoolEnquiryService {
    constructor(repository) {
        this.repository = repository;
    }
    create(createSchoolEnquiryDto) {
        return this.repository.create(createSchoolEnquiryDto);
    }
    findAll(filterDto) {
        const { skip, limit, ...filter } = (0, utils_1.createPaginatedMongoOptions)(filterDto);
        return this.repository.findAll({
            filter: {
                name: filter.name && { $regex: `^${filter.name}`, $options: 'i' },
                email: filter.email && { $regex: `^${filter.email}`, $options: 'i' },
                school: filter.school && { $regex: `^${filter.school}`, $options: 'i' },
            },
            options: {
                skip,
                limit,
                sort: { createdAt: -1 },
            }
        });
    }
    findOne(id) {
        return this.repository.findById(id);
    }
    async update(id, updateDto) {
        return this.repository.updateById(id, updateDto);
    }
    remove(id) {
        return this.repository.delete({ _id: id });
    }
};
exports.ClaimSchoolEnquiryService = ClaimSchoolEnquiryService;
exports.ClaimSchoolEnquiryService = ClaimSchoolEnquiryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [claim_school_enquiry_repository_1.ClaimSchoolEnquiryRepository])
], ClaimSchoolEnquiryService);
//# sourceMappingURL=claim-school-enquiry.service.js.map