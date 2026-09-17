import { Injectable } from '@nestjs/common';

import { OTP_TIME_OUT_MINUTE } from '@/src/lib/constants';
import { IOtp } from '../otp/interface';
import { IUser } from '../user/interface';
import { ISchoolEnquiry } from '../school-enquiry/interface';
import * as Templates from './templates';
import { MailService } from './mail.service';
import { ISchool } from '../school/interface';

@Injectable()
export class MailEvents {
  private supportEmail: string;
  private enquiryNotificationMails: string;
  constructor(private mailService: MailService) {
    this.supportEmail = this.mailService.config.get('EDHIPPO_SUPPORT_MAIL');
    this.enquiryNotificationMails = this.mailService.config.get(
      'EDHIPPO_ENQUIRY_NOTIFICATION_MAILS',
    );
  }

  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  //        Authentication Email Events
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  userRegistrationOtpMail(userName: string, userEmail: string, otp: IOtp) {
    const template = Templates.RegistrationUserTemplates({
      supportMail: this.supportEmail,
      name: userName,
      otp: otp.otp,
      validTill: OTP_TIME_OUT_MINUTE,
    });
    this.mailService.addEmailJob({
      to: userEmail,
      ...template,
    });
  }

  forgotPasswordOtpMail(user: IUser, otp: IOtp) {
    const template = Templates.ForgotPasswordTemplates({
      supportMail: this.supportEmail,
      name: user.name,
      otp: otp.otp,
      validTill: OTP_TIME_OUT_MINUTE,
    });
    this.mailService.addEmailJob({
      to: user.mail,
      ...template,
    });
  }

  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  //          School Enquiry Events
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

  schoolEnquiryMail(enquiry: ISchoolEnquiry) {
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

  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  //              School Events
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

  mailSchoolDetails(userMail: string, school: ISchool) {
    const template = Templates.SchoolDetailTemplates({
      name: school.name,
      city: (school.city as unknown)?.['city'] ?? '',
      classification: (school.classification as unknown)?.['name'] ?? '',
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
}
