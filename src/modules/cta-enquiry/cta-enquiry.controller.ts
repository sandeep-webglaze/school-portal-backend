import { Controller, Get, Post, Body, Param, Delete, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { USER_ROLE } from '@/src/lib/constants';
import { ValidateMongoId } from '@/src/lib/decorators';
import { Public } from '../auth/guards/jwt.guard';
import { AllowedRoles } from '../auth/guards/roles.guard';
import { CtaEnquiryService } from './cta-enquiry.service';
import { CreateCtaEnquiryDto } from './dto/create-cta-enquiry.dto';
import { CtaEnquiryFilterDto } from './dto/filter-cta-enquiry.dto';

@ApiTags('CTA Enquiry')
@Controller('cta-enquiry')
export class CtaEnquiryController {
  constructor(private readonly ctaEnquiryService: CtaEnquiryService) { }

  @Public()
  @Post()
  @ApiBody({ type: CreateCtaEnquiryDto, description: "Json schema for registering CTA enquiry" })
  @ApiResponse({ status: 201, description: "CTA enquiry registered successfully" })
  create(
    @Body() createSchoolEnquiryDto: CreateCtaEnquiryDto,
  ) {
    return this.ctaEnquiryService.create(createSchoolEnquiryDto);
  }

  @Get()
  @ApiBearerAuth('JWT_Auth')
  @AllowedRoles(USER_ROLE.ADMIN, USER_ROLE.SUB_ADMIN)
  @ApiResponse({ status: 200, description: 'CTA Enquiry List based on applied filters.' })
  @ApiResponse({ status: 403, description: 'Forbidden to access resource.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  findAll(@Query() filter: CtaEnquiryFilterDto) {
    return this.ctaEnquiryService.findAll(filter);
  }

  @Get(':id')
  @ApiBearerAuth('JWT_Auth')
  @AllowedRoles(USER_ROLE.ADMIN, USER_ROLE.SUB_ADMIN)
  @ApiParam({ type: String, name: "id", description: "Cta enquiry id" })
  @ApiResponse({ status: 200, description: 'CTA Enquiry Detail.' })
  @ApiResponse({ status: 403, description: 'Forbidden to access resource.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  findOne(@Param('id', ValidateMongoId) id: string) {
    return this.ctaEnquiryService.findOne(id);
  }

  @Delete(':id')
  @ApiBearerAuth('JWT_Auth')
  @AllowedRoles(USER_ROLE.ADMIN)
  @ApiParam({ type: String, name: "id", description: "Cta enquiry id" })
  @ApiResponse({ status: 200, description: 'CTA Enquiry has been removed successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden to access resource.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  remove(@Param('id', ValidateMongoId) id: string) {
    return this.ctaEnquiryService.remove(id);
  }
}
