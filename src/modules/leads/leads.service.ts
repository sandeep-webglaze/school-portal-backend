import { QueryOptions } from 'mongoose';
import { Injectable } from '@nestjs/common';

import { USER_ROLE } from '@/src/lib/constants';
import { createPaginatedMongoOptions } from '@/src/lib/utils';
import { IUserObj } from '../user/interface';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { LeadRepository } from './leads.repository';
import { LeadFilterDto } from './dto/filter-lead.dto';
import { ILeadDocument } from './interface';

@Injectable()
export class LeadsService {
  ignoreObscureTexts = ['gmail']
  constructor(readonly repository: LeadRepository) { }

  private computeLeadPrice(lead: CreateLeadDto) {
    // TODO: implement price calculation logic
    lead.actualPrice = lead.actualPrice ?? 10000;
    lead.currentPrice = lead.currentPrice ?? lead.actualPrice;
    return lead;
  }

  private obscureText(textToObscure: string, obscuringChar: string = "*") {
    if (!textToObscure) return textToObscure;
    if (this.ignoreObscureTexts.includes(textToObscure.toLowerCase())) return textToObscure;
    // Ensure the text length is sufficient for obscuring
    if (textToObscure.length <= 4) {
      return obscuringChar.repeat(4);
    }

    // Extract the first two characters
    const prefix = textToObscure.substring(0, 2);

    // Extract the last two characters
    const suffix = textToObscure.substring(textToObscure.length - 2);

    // Generate the obscured middle part
    const obscuredMiddle = obscuringChar.repeat(textToObscure.length - 4);

    // Concatenate the parts and return the obscured text
    return prefix + obscuredMiddle + suffix;
  }

  private formatLead(user: IUserObj, lead: ILeadDocument) {
    const obscureChar = '*';

    const isSchoolUser = [USER_ROLE.SCHOOL_ADMIN].includes(user.role);
    // if school user roles increases change this check to school id rather than user id
    const isLeadOwner = lead.owner && lead.owner.toString() === user._id.toString(); // ignore obscuring lead data if user is owner of lead

    if (isLeadOwner || !isSchoolUser) return lead;

    const [emailPrefix, emailDomain] = lead.email.split('@');
    const [emailDomainName, emailTLDS] = emailDomain.split('.');
    const obscuredEmail = this.obscureText(emailPrefix) +
      '@' +
      this.obscureText(emailDomainName) + '.' + emailTLDS;
    lead.phoneNumber = this.obscureText(lead.phoneNumber)
    lead.name = this.obscureText(lead.name);
    lead.email = obscuredEmail;

    return lead;
  }

  createBulkLeads(data: CreateLeadDto[], options: QueryOptions) {
    if (data.length < 1) return;
    const leads = data.map(this.computeLeadPrice);

    return this.repository.createMany(leads, options);
  }

  create(createLeadDto: CreateLeadDto) {
    createLeadDto = this.computeLeadPrice(createLeadDto);
    return this.repository.create(createLeadDto);
  }

  async availableLeadsForPurchase(user: IUserObj, filterDto: LeadFilterDto) {
    const { skip, limit, ...filter } = createPaginatedMongoOptions(filterDto);
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

  async findAll(user: IUserObj, filterDto: LeadFilterDto) {
    const { skip, limit, ...filter } = createPaginatedMongoOptions(filterDto);

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

  findOne(id: number) {
    return `This action returns a #${id} lead`;
  }

  update(id: string, updateLeadDto: UpdateLeadDto) {
    return this.repository.updateOne({ _id: id, freezed: false }, updateLeadDto);
  }

  remove(id: string | string[]) {
    return this.repository.delete({ _id: id, freezed: false });
  }
}
