"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchoolEnquiryModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const leads_module_1 = require("../leads/leads.module");
const school_enquiry_service_1 = require("./school-enquiry.service");
const school_enquiry_controller_1 = require("./school-enquiry.controller");
const school_enquiry_repository_1 = require("./school-enquiry.repository");
const school_enquiry_entity_1 = require("./entities/school-enquiry.entity");
const mails_handler_module_1 = require("../mails-handler/mails-handler.module");
let SchoolEnquiryModule = class SchoolEnquiryModule {
};
exports.SchoolEnquiryModule = SchoolEnquiryModule;
exports.SchoolEnquiryModule = SchoolEnquiryModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([school_enquiry_entity_1.SchoolEnquiryModel]), leads_module_1.LeadsModule, mails_handler_module_1.MailsHandlerModule],
        controllers: [school_enquiry_controller_1.SchoolEnquiryController],
        providers: [school_enquiry_repository_1.SchoolEnquiryRepository, school_enquiry_service_1.SchoolEnquiryService],
    })
], SchoolEnquiryModule);
//# sourceMappingURL=school-enquiry.module.js.map