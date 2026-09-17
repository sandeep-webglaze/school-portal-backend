import { Controller, Get, Post, Body, Put, Param, Delete, Query, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { USER_ROLE } from '@/src/lib/constants';
import { ValidateMongoId } from '@/src/lib/decorators';
import { CachingInterceptor } from '@/src/lib/interceptors';
import { Public } from '../../auth/guards/jwt.guard';
import { AllowedRoles } from '../../auth/guards/roles.guard';
import { FacilityService } from '../services/facility.service';
import { CreateFacilityDto, FacilityFilterDto, UpdateFacilityDto } from '../dto/facility.dto';

@ApiTags('School Facility')
@Controller('school-facility')
export class FacilityController {
  constructor(private readonly facilityService: FacilityService) { }

  @Post()
  @ApiBearerAuth('JWT_Auth')
  @AllowedRoles(USER_ROLE.ADMIN, USER_ROLE.SUB_ADMIN)
  @ApiBody({ type: CreateFacilityDto, description: "Json schema for creating facility" })
  @ApiResponse({ status: 201, description: "facility created successfully" })
  @ApiResponse({ status: 403, description: 'Forbidden to access resource.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  create(@Body() body: CreateFacilityDto) {
    return this.facilityService.create(body);
  }

  @UseInterceptors(CachingInterceptor)
  @Public()
  @Get()
  @ApiResponse({ status: 200, description: 'Facility Lists based on applied filters.' })
  findAll(@Query() filter: FacilityFilterDto) {
    return this.facilityService.findAll(filter);
  }

  @UseInterceptors(CachingInterceptor)
  @Public()
  @Get(':id')
  @ApiParam({ type: String, name: "id", description: "Facility id" })
  @ApiResponse({ status: 200, description: 'Facility Detail.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  findOne(@Param('id', ValidateMongoId) id: string) {
    return this.facilityService.findOne(id);
  }

  @Put(':id')
  @ApiBearerAuth('JWT_Auth')
  @AllowedRoles(USER_ROLE.ADMIN, USER_ROLE.SUB_ADMIN)
  @ApiParam({ type: String, name: "id", description: "Facility id" })
  @ApiBody({ type: UpdateFacilityDto, description: "Json schema for updating Facility" })
  @ApiResponse({ status: 200, description: 'Facility Detail.' })
  @ApiResponse({ status: 403, description: 'Forbidden to access resource.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  update(@Param('id', ValidateMongoId) id: string, @Body() updateSchoolDto: UpdateFacilityDto) {
    return this.facilityService.update(id, updateSchoolDto);
  }

  @Delete(':id')
  @ApiBearerAuth('JWT_Auth')
  @AllowedRoles(USER_ROLE.ADMIN)
  @ApiParam({ type: String, name: "id", description: "Facility id" })
  @ApiResponse({ status: 200, description: 'Facility deleted.' })
  @ApiResponse({ status: 403, description: 'Forbidden to access resource.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  remove(@Param('id', ValidateMongoId) id: string) {
    return this.facilityService.remove(id);
  }
}
