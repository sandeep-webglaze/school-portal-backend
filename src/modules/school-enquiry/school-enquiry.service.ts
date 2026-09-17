import { Connection } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { createPaginatedMongoOptions } from '@/src/lib/utils';
import { PLATFORMS, SCHOOL_ENQUIRY_STATUS } from '@/src/lib/constants';
import { LeadsService } from '../leads/leads.service';
import { MailEvents } from '../mails-handler/events';
import { CreateLeadDto } from '../leads/dto/create-lead.dto';
import { SchoolEnquiryRepository } from './school-enquiry.repository';
import { CreateSchoolEnquiryDto } from './dto/create-school-enquiry.dto';
import { SchoolEnquiryFilterDto } from './dto/school-enquiry-filter.dto';
import { UpdateEnquiriesDto } from './dto/update-school-enquiry.dto';

@Injectable()
export class SchoolEnquiryService {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    private readonly mailEvents: MailEvents,
    private readonly configService: ConfigService,
    readonly repository: SchoolEnquiryRepository,
    readonly leadsService: LeadsService,
  ) {}

  async create(userIp: string, createSchoolEnquiryDto: CreateSchoolEnquiryDto) {
    const enquiry = await this.repository.create({
      ...createSchoolEnquiryDto,
      userIp,
      platform: this.getEnquiryPlatform(createSchoolEnquiryDto.pageUrl),
    });

    if (enquiry.created) {
      // Populate karke CRM ko bhejo — city aur schoolType ka name milega
      const populated = await this.repository['entity']
        .findById(enquiry.data._id)
        .populate('city', 'city')
        .populate('schoolType', 'name')
        .lean();

      this.mailEvents.schoolEnquiryMail(enquiry.data);
      this.sendToWgLeadApi(populated);
    }

    return enquiry;
  }

  // -------------------------------------------
  //   CRM LEAD API — crm.web-glaze.com
  //   Docs: X-API-KEY header + JSON body
  // -------------------------------------------
  async sendToWgLeadApi(data: any) {
    try {
      const baseUrl = 'https://crm.web-glaze.com/api/save-lead.php';
      const apiKey = '17c7dc07d0e2be661eaa18f5';

      if (!apiKey) {
        console.error('❌ CRM: LEAD_PORTAL_API_KEY is not set in .env');
        return;
      }

      const payload: any = {
        name: data.name || '',
        email: data.email || '',
        phone: data.phoneNumber || '',
        message: data.message || 'EdHippo School Enquiry',
        page_url: data.pageUrl || 'https://www.edhippo.com',
        platform: data.platform || 'EDHIPPO',
        ip_address: data.userIp || '',
      };

      // City — populated object se name nikalo, ya string as-is
      if (data.city) payload.city = (data.city as any)?.city || data.city;

      // School Type — populated object se name nikalo
      if (data.schoolType)
        payload.school_type = (data.schoolType as any)?.name || data.schoolType;

      // Optional fields — sirf tab bhejo jab value ho
      if (data.class) payload.class = data.class;
      if (data.gender) payload.gender = data.gender;
      if (data.location) payload.location = data.location;

      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      // 🔍 DEV MODE LOGS — Raw incoming data
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('📩 RAW DATA RECEIVED:');
      console.log(`   name        : ${data.name}`);
      console.log(`   email       : ${data.email}`);
      console.log(`   phoneNumber : ${data.phoneNumber}`);
      console.log(`   city (raw)  : ${JSON.stringify(data.city)}`);
      console.log(`   schoolType  : ${JSON.stringify(data.schoolType)}`);
      console.log(`   class       : ${data.class}`);
      console.log(`   gender      : ${data.gender}`);
      console.log(`   location    : ${data.location}`);
      console.log(`   message     : ${data.message}`);
      console.log(`   pageUrl     : ${data.pageUrl}`);
      console.log(`   platform    : ${data.platform}`);
      console.log(`   userIp      : ${data.userIp}`);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('📤 PAYLOAD SENDING TO CRM:');
      console.log(JSON.stringify(payload, null, 2));
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

      // Fire-and-forget
      axios
        .post(baseUrl, payload, {
          headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': apiKey,
          },
          timeout: 8000,
        })
        .then((res) => {
          console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
          console.log('📥 CRM RESPONSE (SUCCESS)');
          console.log(`   Status  : ${res.status} ${res.statusText}`);
          console.log(`   Body    : ${JSON.stringify(res.data, null, 2)}`);
          console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        })
        .catch((err) => {
          console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
          console.log('📥 CRM RESPONSE (ERROR)');
          if (err.response) {
            console.error(
              `   Status   : ${err.response.status} ${err.response.statusText}`,
            );
            console.error(`   Body     : ${JSON.stringify(err.response.data)}`);
          } else {
            console.error(`   No response — ${err.message}`);
          }
          console.error(`   Payload sent : ${JSON.stringify(payload)}`);
          console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        });
    } catch (error) {
      console.error('CRM sendToWgLeadApi error:', error.message);
    }
  }
  findAll(filterDto: SchoolEnquiryFilterDto) {
    const { skip, limit, ...filter } = createPaginatedMongoOptions(filterDto);
    return this.repository.findAll({
      filter: {
        name: filter.name && { $regex: `^${filter.name}`, $options: 'i' },
        email: filter.email && { $regex: `^${filter.email}`, $options: 'i' },
        schoolType: filter.schoolType,
        city: filter.city,
        userIp: filter.userIp,
        pageUrl: filter.pageUrl,
        gender: filter.gender,
        status: filter.status,
        platform: filter.platform,
      },
      options: {
        skip,
        limit,
        sort: { createdAt: -1 },
        populate: [
          {
            path: 'city',
            options: { projection: 'city' },
          },
          {
            path: 'schoolType',
            options: { projection: 'name' },
          },
        ],
      },
    });
  }

  findOne(id: string) {
    return this.repository.findById(id);
  }

  async updateEnquiries({ enquiriesIds, ...updateDto }: UpdateEnquiriesDto) {
    if (enquiriesIds.length < 1) return;

    const transactionSession = await this.connection.startSession();
    transactionSession.startTransaction();

    try {
      const enquiries = await this.repository.findAll({
        filter: { _id: enquiriesIds, status: SCHOOL_ENQUIRY_STATUS.PENDING },
        options: { session: transactionSession },
      });
      const updatedEnquiries = await this.repository.updateMany(
        { _id: enquiriesIds, status: SCHOOL_ENQUIRY_STATUS.PENDING },
        updateDto,
        { session: transactionSession },
      );

      if (
        updateDto.status &&
        updateDto.status === SCHOOL_ENQUIRY_STATUS.ACCEPTED
      ) {
        const leads = enquiries.data.map(
          CreateLeadDto.create_lead_from_enquiry,
        );
        await this.leadsService.createBulkLeads(leads, {
          session: transactionSession,
        });
      }

      await transactionSession.commitTransaction();
      return updatedEnquiries;
    } catch (error) {
      await transactionSession.abortTransaction();
      throw error;
    } finally {
      transactionSession.endSession();
    }
  }

  remove(id: string[] | string) {
    return this.repository.delete({ _id: id });
  }

  getEnquiryPlatform(pageUrl: string) {
    switch (true) {
      case pageUrl === '/app':
        return PLATFORMS.EDHIPPO_APP;
      case new RegExp(
        /^https?:\/\/(?:[^.]+\.)?schoolsofdehradun\.com(?:[:/]|$)/,
      ).test(pageUrl):
        return PLATFORMS.SOD;
      case new RegExp(/^https?:\/\/(?:[^.]+\.)?edhippo\.com(?:[:/]|$)/).test(
        pageUrl,
      ):
        return PLATFORMS.EDHIPPO;
      default:
        return '';
    }
  }
}
