import { Injectable } from '@nestjs/common';

import { createPaginatedMongoOptions } from '@/src/lib/utils';
import { CreateNewsletterDto } from './dto/create-newsletter.dto';
import { NewsletterFilterDto } from './dto/filter-newsletter.dto';
import { NewsletterRepository } from './newsletter.repository';

@Injectable()
export class NewsletterService {
  constructor(readonly repository: NewsletterRepository) {}

  async create(dto: CreateNewsletterDto) {
    const email = dto.email.toLowerCase().trim();
    try {
      return await this.repository.create({ email });
    } catch (err: any) {
      // duplicate email -> treat as success (already subscribed)
      if (err?.code === 11000) return { email, message: 'Already subscribed' };
      throw err;
    }
  }

  findAll(filterDto: NewsletterFilterDto) {
    const { skip, limit, ...filter } = createPaginatedMongoOptions(filterDto);
    return this.repository.findAll({
      filter: {
        email: filter.email && { $regex: `^${filter.email}`, $options: 'i' },
      },
      options: { skip, limit, sort: { createdAt: -1 } },
    });
  }

  remove(id: string) {
    return this.repository.deleteById(id);
  }
}
