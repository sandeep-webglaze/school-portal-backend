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
exports.MailEvents = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../lib/constants");
const Templates = require("./templates");
const mail_service_1 = require("./mail.service");
let MailEvents = class MailEvents {
    constructor(mailService) {
        this.mailService = mailService;
        this.supportEmail = this.mailService.config.get('EDHIPPO_SUPPORT_MAIL');
        this.enquiryNotificationMails = this.mailService.config.get('EDHIPPO_ENQUIRY_NOTIFICATION_MAILS');
    }
    userRegistrationOtpMail(userName, userEmail, otp) {
        const template = Templates.RegistrationUserTemplates({
            supportMail: this.supportEmail,
            name: userName,
            otp: otp.otp,
            validTill: constants_1.OTP_TIME_OUT_MINUTE,
        });
        this.mailService.addEmailJob({
            to: userEmail,
            ...template,
        });
    }
    forgotPasswordOtpMail(user, otp) {
        const template = Templates.ForgotPasswordTemplates({
            supportMail: this.supportEmail,
            name: user.name,
            otp: otp.otp,
            validTill: constants_1.OTP_TIME_OUT_MINUTE,
        });
        this.mailService.addEmailJob({
            to: user.mail,
            ...template,
        });
    }
    schoolEnquiryMail(enquiry) {
        const template = Templates.SchoolEnquiryTemplates({
            name: enquiry.name,
            email: enquiry.email,
            phoneNumber: enquiry.phoneNumber,
            userClass: enquiry.class,
            gender: enquiry.gender,
            message: enquiry.message,
        });
        this.mailService.addEmailJob({
            to: this.enquiryNotificationMails,
            ...template,
        });
    }
    mailSchoolDetails(userMail, school) {
        const template = Templates.SchoolDetailTemplates({
            name: school.name,
            city: school.city?.['city'] ?? '',
            classification: school.classification?.['name'] ?? '',
            chairman: school.chairman,
            medium: school.medium,
            admissionStart: school.admissionStart,
            admissionEnd: school.admissionEnd,
            classFrom: school.classFrom,
            classTo: school.classTo,
            slug: school.slug,
            establishmentYear: school.establishmentYear,
        });
        this.mailService.addEmailJob({
            to: userMail,
            ...template,
        });
    }
};
exports.MailEvents = MailEvents;
exports.MailEvents = MailEvents = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mail_service_1.MailService])
], MailEvents);
//# sourceMappingURL=events.js.map