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
exports.SchoolEnquiryService = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const axios_1 = require("axios");
const utils_1 = require("../../lib/utils");
const constants_1 = require("../../lib/constants");
const leads_service_1 = require("../leads/leads.service");
const events_1 = require("../mails-handler/events");
const create_lead_dto_1 = require("../leads/dto/create-lead.dto");
const school_enquiry_repository_1 = require("./school-enquiry.repository");
let SchoolEnquiryService = class SchoolEnquiryService {
    constructor(connection, mailEvents, configService, repository, leadsService) {
        this.connection = connection;
        this.mailEvents = mailEvents;
        this.configService = configService;
        this.repository = repository;
        this.leadsService = leadsService;
    }
    async create(userIp, createSchoolEnquiryDto) {
        const enquiry = await this.repository.create({
            ...createSchoolEnquiryDto,
            userIp,
            platform: this.getEnquiryPlatform(createSchoolEnquiryDto.pageUrl),
        });
        if (enquiry.created) {
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
    async sendToWgLeadApi(data) {
        try {
            const baseUrl = 'https://crm.web-glaze.com/api/save-lead.php';
            const apiKey = '17c7dc07d0e2be661eaa18f5';
            if (!apiKey) {
                console.error('❌ CRM: LEAD_PORTAL_API_KEY is not set in .env');
                return;
            }
            const payload = {
                name: data.name || '',
                email: data.email || '',
                phone: data.phoneNumber || '',
                message: data.message || 'EdHippo School Enquiry',
                page_url: data.pageUrl || 'https://www.edhippo.com',
                platform: data.platform || 'EDHIPPO',
                ip_address: data.userIp || '',
            };
            if (data.city)
                payload.city = data.city?.city || data.city;
            if (data.schoolType)
                payload.school_type = data.schoolType?.name || data.schoolType;
            if (data.class)
                payload.class = data.class;
            if (data.gender)
                payload.gender = data.gender;
            if (data.location)
                payload.location = data.location;
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
            axios_1.default
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
                    console.error(`   Status   : ${err.response.status} ${err.response.statusText}`);
                    console.error(`   Body     : ${JSON.stringify(err.response.data)}`);
                }
                else {
                    console.error(`   No response — ${err.message}`);
                }
                console.error(`   Payload sent : ${JSON.stringify(payload)}`);
                console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            });
        }
        catch (error) {
            console.error('CRM sendToWgLeadApi error:', error.message);
        }
    }
    findAll(filterDto) {
        const { skip, limit, ...filter } = (0, utils_1.createPaginatedMongoOptions)(filterDto);
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
    findOne(id) {
        return this.repository.findById(id);
    }
    async updateEnquiries({ enquiriesIds, ...updateDto }) {
        if (enquiriesIds.length < 1)
            return;
        const transactionSession = await this.connection.startSession();
        transactionSession.startTransaction();
        try {
            const enquiries = await this.repository.findAll({
                filter: { _id: enquiriesIds, status: constants_1.SCHOOL_ENQUIRY_STATUS.PENDING },
                options: { session: transactionSession },
            });
            const updatedEnquiries = await this.repository.updateMany({ _id: enquiriesIds, status: constants_1.SCHOOL_ENQUIRY_STATUS.PENDING }, updateDto, { session: transactionSession });
            if (updateDto.status &&
                updateDto.status === constants_1.SCHOOL_ENQUIRY_STATUS.ACCEPTED) {
                const leads = enquiries.data.map(create_lead_dto_1.CreateLeadDto.create_lead_from_enquiry);
                await this.leadsService.createBulkLeads(leads, {
                    session: transactionSession,
                });
            }
            await transactionSession.commitTransaction();
            return updatedEnquiries;
        }
        catch (error) {
            await transactionSession.abortTransaction();
            throw error;
        }
        finally {
            transactionSession.endSession();
        }
    }
    remove(id) {
        return this.repository.delete({ _id: id });
    }
    getEnquiryPlatform(pageUrl) {
        switch (true) {
            case pageUrl === '/app':
                return constants_1.PLATFORMS.EDHIPPO_APP;
            case new RegExp(/^https?:\/\/(?:[^.]+\.)?schoolsofdehradun\.com(?:[:/]|$)/).test(pageUrl):
                return constants_1.PLATFORMS.SOD;
            case new RegExp(/^https?:\/\/(?:[^.]+\.)?edhippo\.com(?:[:/]|$)/).test(pageUrl):
                return constants_1.PLATFORMS.EDHIPPO;
            default:
                return '';
        }
    }
};
exports.SchoolEnquiryService = SchoolEnquiryService;
exports.SchoolEnquiryService = SchoolEnquiryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectConnection)()),
    __metadata("design:paramtypes", [mongoose_1.Connection,
        events_1.MailEvents,
        config_1.ConfigService,
        school_enquiry_repository_1.SchoolEnquiryRepository,
        leads_service_1.LeadsService])
], SchoolEnquiryService);
//# sourceMappingURL=school-enquiry.service.js.map