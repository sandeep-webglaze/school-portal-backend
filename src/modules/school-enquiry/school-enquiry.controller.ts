import { Request } from 'express';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Req,
  Put,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { USER_ROLE } from '@/src/lib/constants';
import { ValidateMongoId } from '@/src/lib/decorators';
import { Public } from '../auth/guards/jwt.guard';
import { AllowedRoles } from '../auth/guards/roles.guard';
import { SchoolEnquiryService } from './school-enquiry.service';
import { CreateSchoolEnquiryDto } from './dto/create-school-enquiry.dto';
import { SchoolEnquiryFilterDto } from './dto/school-enquiry-filter.dto';
import { BulkRemoveSchoolEnquiry } from './dto/delete-school-enquiry.dto';
import { UpdateEnquiriesDto } from './dto/update-school-enquiry.dto';

@ApiTags('School Enquiry')
@Controller('school-enquiry')
export class SchoolEnquiryController {
  constructor(private readonly schoolEnquiryService: SchoolEnquiryService) {}

  @Public()
  @Post()
  @ApiBody({
    type: CreateSchoolEnquiryDto,
    description: 'Json schema for registering School enquiry',
  })
  @ApiResponse({
    status: 201,
    description: 'School enquiry registered successfully',
  })
  create(
    @Body() createSchoolEnquiryDto: CreateSchoolEnquiryDto,
    @Req() request: Request,
  ) {
    // x-forwarded-for se pehli real IPv4 nikalo
    const forwardedFor = request.headers['x-forwarded-for'] as string;
    const rawIp =
      createSchoolEnquiryDto.userIp ||
      forwardedFor?.split(',')[0]?.trim() ||
      request.socket.remoteAddress ||
      request.ip ||
      '';

    // IPv6 mapped IPv4 handle karo — "::ffff:192.168.1.1" → "192.168.1.1"
    const ip = rawIp.startsWith('::ffff:')
      ? rawIp.replace('::ffff:', '')
      : rawIp;

    return this.schoolEnquiryService.create(ip, createSchoolEnquiryDto);
  }
  @Get()
  @ApiBearerAuth('JWT_Auth')
  @AllowedRoles(USER_ROLE.ADMIN, USER_ROLE.SUB_ADMIN)
  @ApiResponse({
    status: 200,
    description: 'School Enquiry List based on applied filters.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden to access resource.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  findAll(@Query() filter: SchoolEnquiryFilterDto) {
    return this.schoolEnquiryService.findAll(filter);
  }

  @Get(':id')
  @ApiBearerAuth('JWT_Auth')
  @AllowedRoles(USER_ROLE.ADMIN, USER_ROLE.SUB_ADMIN)
  @ApiParam({ type: String, name: 'id', description: 'School enquiry id' })
  @ApiResponse({ status: 200, description: 'School Enquiry Detail.' })
  @ApiResponse({ status: 403, description: 'Forbidden to access resource.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  findOne(@Param('id', ValidateMongoId) id: string) {
    return this.schoolEnquiryService.findOne(id);
  }

  @Put()
  @ApiBearerAuth('JWT_Auth')
  @AllowedRoles(USER_ROLE.ADMIN, USER_ROLE.SUB_ADMIN)
  @ApiResponse({
    status: 200,
    description: 'School Enquiries status updated successfully.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden to access resource.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  update(@Body() updateLeadDto: UpdateEnquiriesDto) {
    return this.schoolEnquiryService.updateEnquiries(updateLeadDto);
  }

  @Delete()
  @ApiBearerAuth('JWT_Auth')
  @AllowedRoles(USER_ROLE.ADMIN)
  @ApiResponse({
    status: 200,
    description: 'School Enquiries removed successfully.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden to access resource.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  removeMany(@Body() body: BulkRemoveSchoolEnquiry) {
    return this.schoolEnquiryService.remove(body.ids);
  }

  @Delete(':id')
  @ApiBearerAuth('JWT_Auth')
  @AllowedRoles(USER_ROLE.ADMIN)
  @ApiParam({ type: String, name: 'id', description: 'School enquiry id' })
  @ApiResponse({
    status: 200,
    description: 'School Enquiry removed successfully.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden to access resource.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  remove(@Param('id', ValidateMongoId) id: string) {
    return this.schoolEnquiryService.remove(id);
  }
}
