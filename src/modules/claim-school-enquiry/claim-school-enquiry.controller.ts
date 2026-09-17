import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { USER_ROLE } from '@/src/lib/constants';
import { ValidateMongoId } from '@/src/lib/decorators';
import { Public } from '../auth/guards/jwt.guard';
import { AllowedRoles } from '../auth/guards/roles.guard';
import { ClaimSchoolEnquiryService } from './claim-school-enquiry.service';
import { CreateClaimSchoolEnquiryDto } from './dto/create-claim-school-enquiry.dto';
import { UpdateClaimSchoolEnquiryDto } from './dto/update-claim-school-enquiry.dto';
import { BulkRemoveClaimSchoolEnquiry } from './dto/remove-claim-school-enquiry';
import { FilterClaimSchoolEnquiryDto } from './dto/filter-claim-school-enquiry.dto';

@ApiTags('Claim School Enquiry')
@Controller('claim-school-enquiry')
export class ClaimSchoolEnquiryController {
  constructor(private readonly claimSchoolEnquiryService: ClaimSchoolEnquiryService) { }

  @Public()
  @Post()
  @ApiBody({
    type: CreateClaimSchoolEnquiryDto,
    description: 'Json schema for registering claim school enquiry',
  })
  @ApiResponse({
    status: 201,
    description: 'Claim school enquiry registered successfully',
  })
  create(@Body() createClaimSchoolEnquiryDto: CreateClaimSchoolEnquiryDto) {
    return this.claimSchoolEnquiryService.create(createClaimSchoolEnquiryDto);
  }

  @Get()
  @ApiBearerAuth('JWT_Auth')
  @AllowedRoles(USER_ROLE.ADMIN, USER_ROLE.SUB_ADMIN)
  @ApiResponse({
    status: 200,
    description: 'Claim school enquiry List based on applied filters.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden to access resource.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  findAll(@Query() filter: FilterClaimSchoolEnquiryDto) {
    return this.claimSchoolEnquiryService.findAll(filter);
  }

  @Get(':id')
  @ApiBearerAuth('JWT_Auth')
  @AllowedRoles(USER_ROLE.ADMIN, USER_ROLE.SUB_ADMIN)
  @ApiParam({ type: String, name: 'id', description: 'Claim school enquiry id' })
  @ApiResponse({ status: 200, description: 'Claim school enquiry Detail.' })
  @ApiResponse({ status: 403, description: 'Forbidden to access resource.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  findOne(@Param('id') id: string) {
    return this.claimSchoolEnquiryService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth('JWT_Auth')
  @AllowedRoles(USER_ROLE.ADMIN, USER_ROLE.SUB_ADMIN)
  @ApiResponse({
    status: 200,
    description: 'Claim school enquiry updated successfully.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden to access resource.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  update(@Param('id') id: string, @Body() updateClaimSchoolEnquiryDto: UpdateClaimSchoolEnquiryDto) {
    return this.claimSchoolEnquiryService.update(id, updateClaimSchoolEnquiryDto);
  }

  @Delete()
  @ApiBearerAuth('JWT_Auth')
  @AllowedRoles(USER_ROLE.ADMIN)
  @ApiResponse({
    status: 200,
    description: 'Claim school Enquiries removed successfully.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden to access resource.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  removeMany(@Body() body: BulkRemoveClaimSchoolEnquiry) {
    return this.claimSchoolEnquiryService.remove(body.ids);
  }

  @Delete(':id')
  @ApiBearerAuth('JWT_Auth')
  @AllowedRoles(USER_ROLE.ADMIN)
  @ApiParam({ type: String, name: 'id', description: 'School enquiry id' })
  @ApiResponse({
    status: 200,
    description: 'Claim school enquiry removed successfully.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden to access resource.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  remove(@Param('id', ValidateMongoId) id: string) {
    return this.claimSchoolEnquiryService.remove(id);
  }
}
