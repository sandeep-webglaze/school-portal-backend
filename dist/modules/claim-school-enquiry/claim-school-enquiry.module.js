"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClaimSchoolEnquiryModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const claim_school_enquiry_service_1 = require("./claim-school-enquiry.service");
const claim_school_enquiry_controller_1 = require("./claim-school-enquiry.controller");
const claim_school_enquiry_repository_1 = require("./claim-school-enquiry.repository");
const claim_school_enquiry_entity_1 = require("./entities/claim-school-enquiry.entity");
let ClaimSchoolEnquiryModule = class ClaimSchoolEnquiryModule {
};
exports.ClaimSchoolEnquiryModule = ClaimSchoolEnquiryModule;
exports.ClaimSchoolEnquiryModule = ClaimSchoolEnquiryModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([claim_school_enquiry_entity_1.ClaimSchoolEnquiryModel])],
        controllers: [claim_school_enquiry_controller_1.ClaimSchoolEnquiryController],
        providers: [claim_school_enquiry_repository_1.ClaimSchoolEnquiryRepository, claim_school_enquiry_service_1.ClaimSchoolEnquiryService],
    })
], ClaimSchoolEnquiryModule);
//# sourceMappingURL=claim-school-enquiry.module.js.map