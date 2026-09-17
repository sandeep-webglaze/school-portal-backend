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
exports.LeadsService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../lib/constants");
const utils_1 = require("../../lib/utils");
const leads_repository_1 = require("./leads.repository");
let LeadsService = class LeadsService {
    constructor(repository) {
        this.repository = repository;
        this.ignoreObscureTexts = ['gmail'];
    }
    computeLeadPrice(lead) {
        lead.actualPrice = lead.actualPrice ?? 10000;
        lead.currentPrice = lead.currentPrice ?? lead.actualPrice;
        return lead;
    }
    obscureText(textToObscure, obscuringChar = "*") {
        if (!textToObscure)
            return textToObscure;
        if (this.ignoreObscureTexts.includes(textToObscure.toLowerCase()))
            return textToObscure;
        if (textToObscure.length <= 4) {
            return obscuringChar.repeat(4);
        }
        const prefix = textToObscure.substring(0, 2);
        const suffix = textToObscure.substring(textToObscure.length - 2);
        const obscuredMiddle = obscuringChar.repeat(textToObscure.length - 4);
        return prefix + obscuredMiddle + suffix;
    }
    formatLead(user, lead) {
        const obscureChar = '*';
        const isSchoolUser = [constants_1.USER_ROLE.SCHOOL_ADMIN].includes(user.role);
        const isLeadOwner = lead.owner && lead.owner.toString() === user._id.toString();
        if (isLeadOwner || !isSchoolUser)
            return lead;
        const [emailPrefix, emailDomain] = lead.email.split('@');
        const [emailDomainName, emailTLDS] = emailDomain.split('.');
        const obscuredEmail = this.obscureText(emailPrefix) +
            '@' +
            this.obscureText(emailDomainName) + '.' + emailTLDS;
        lead.phoneNumber = this.obscureText(lead.phoneNumber);
        lead.name = this.obscureText(lead.name);
        lead.email = obscuredEmail;
        return lead;
    }
    createBulkLeads(data, options) {
        if (data.length < 1)
            return;
        const leads = data.map(this.computeLeadPrice);
        return this.repository.createMany(leads, options);
    }
    create(createLeadDto) {
        createLeadDto = this.computeLeadPrice(createLeadDto);
        return this.repository.create(createLeadDto);
    }
    async availableLeadsForPurchase(user, filterDto) {
        const { skip, limit, ...filter } = (0, utils_1.createPaginatedMongoOptions)(filterDto);
        const leads = await this.repository.findAll({
            filter: {
                schoolType: filter.schoolType,
                city: filter.city,
                gender: filter.gender,
                currentPrice: (filter.minPrice || filter.maxPrice) && {
                    $gte: filter.minPrice,
                    $lte: filter.maxPrice,
                },
                owner: { $exists: false },
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
        leads.data = leads.data.map((lead) => this.formatLead(user, lead));
        return leads;
    }
    async findAll(user, filterDto) {
        const { skip, limit, ...filter } = (0, utils_1.createPaginatedMongoOptions)(filterDto);
        const leads = await this.repository.findAll({
            filter: {
                schoolType: filter.schoolType,
                city: filter.city,
                gender: filter.gender,
                currentPrice: (filter.minPrice || filter.maxPrice) && {
                    $gte: filter.minPrice,
                    $lte: filter.maxPrice,
                },
                owner: filter?.owner,
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
        leads.data = leads.data.map((lead) => this.formatLead(user, lead));
        return leads;
    }
    findOne(id) {
        return `This action returns a #${id} lead`;
    }
    update(id, updateLeadDto) {
        return this.repository.updateOne({ _id: id, freezed: false }, updateLeadDto);
    }
    remove(id) {
        return this.repository.delete({ _id: id, freezed: false });
    }
};
exports.LeadsService = LeadsService;
exports.LeadsService = LeadsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [leads_repository_1.LeadRepository])
], LeadsService);
//# sourceMappingURL=leads.service.js.map