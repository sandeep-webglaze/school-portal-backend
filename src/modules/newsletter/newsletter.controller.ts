import { Controller, Get, Post, Body, Param, Delete, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { USER_ROLE } from '@/src/lib/constants';
import { ValidateMongoId } from '@/src/lib/decorators';
import { Public } from '../auth/guards/jwt.guard';
import { AllowedRoles } from '../auth/guards/roles.guard';
import { NewsletterService } from './newsletter.service';
import { CreateNewsletterDto } from './dto/create-newsletter.dto';
import { NewsletterFilterDto } from './dto/filter-newsletter.dto';

@ApiTags('Newsletter')
@Controller('newsletter')
export class NewsletterController {
  constructor(private readonly service: NewsletterService) {}

  @Public()
  @Post()
  @ApiBody({ type: CreateNewsletterDto, description: 'Subscribe to the newsletter' })
  @ApiResponse({ status: 201, description: 'Subscribed successfully' })
  create(@Body() dto: CreateNewsletterDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiBearerAuth('JWT_Auth')
  @AllowedRoles(USER_ROLE.ADMIN, USER_ROLE.SUB_ADMIN)
  @ApiResponse({ status: 200, description: 'List of subscribers.' })
  findAll(@Query() filter: NewsletterFilterDto) {
    return this.service.findAll(filter);
  }

  @Delete(':id')
  @ApiBearerAuth('JWT_Auth')
  @AllowedRoles(USER_ROLE.ADMIN)
  @ApiParam({ type: String, name: 'id', description: 'subscriber id' })
  @ApiResponse({ status: 200, description: 'Subscriber removed.' })
  remove(@Param('id', ValidateMongoId) id: string) {
    return this.service.remove(id);
  }
}
