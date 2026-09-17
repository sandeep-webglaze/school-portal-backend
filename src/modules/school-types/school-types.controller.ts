import { Controller, Get, Post, Body, Put, Param, Delete, Query, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { USER_ROLE } from '@/src/lib/constants';
import { ValidateMongoId } from '@/src/lib/decorators';
import { CachingInterceptor } from '@/src/lib/interceptors';
import { Public } from '../auth/guards/jwt.guard';
import { AllowedRoles } from '../auth/guards/roles.guard';
import { SchoolTypeService } from './school-types.service';
import { CreateSchoolTypeDto } from './dto/create-school-type.dto';
import { UpdateSchoolTypeDto } from './dto/update-school-type.dto';
import { SchoolTypeFilterDto } from './dto/filter-school-type.dto';

@ApiTags('School Type')
@Controller('school-type')
export class SchoolTypeController {
  constructor(private readonly schoolTypeService: SchoolTypeService) { }

  @Post()
  @ApiBearerAuth('JWT_Auth')
  @AllowedRoles(USER_ROLE.ADMIN, USER_ROLE.SUB_ADMIN)
  @ApiBody({ type: CreateSchoolTypeDto, description: "Json schema for creating School type" })
  @ApiResponse({ status: 201, description: "School type added successfully" })
  @ApiResponse({ status: 403, description: 'Forbidden to access resource.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  create(@Body() createDto: CreateSchoolTypeDto) {
    return this.schoolTypeService.create(createDto);
  }

  @UseInterceptors(CachingInterceptor)
  @Public()
  @Get()
  @ApiResponse({ status: 200, description: 'School types List based on applied filters.' })
  findAll(@Query() filter: SchoolTypeFilterDto) {
    return this.schoolTypeService.findAll(filter);
  }

  @UseInterceptors(CachingInterceptor)
  @Public()
  @Get(':id')
  @ApiParam({ type: String, name: "id", description: "School Type id" })
  @ApiResponse({ status: 200, description: 'School Type Detail.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  findOne(@Param('id', ValidateMongoId) id: string) {
    return this.schoolTypeService.findOne(id);
  }

  @Put(':id')
  @ApiBearerAuth('JWT_Auth')
  @AllowedRoles(USER_ROLE.ADMIN, USER_ROLE.SUB_ADMIN)
  @ApiParam({ type: String, name: "id", description: "School Type id" })
  @ApiBody({ type: UpdateSchoolTypeDto, description: "Json schema for updating school type" })
  @ApiResponse({ status: 200, description: 'School Type Detail.' })
  @ApiResponse({ status: 403, description: 'Forbidden to access resource.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  update(@Param('id', ValidateMongoId) id: string, @Body() updateDto: UpdateSchoolTypeDto) {
    return this.schoolTypeService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiBearerAuth('JWT_Auth')
  @AllowedRoles(USER_ROLE.ADMIN)
  @ApiParam({ type: String, name: "id", description: "School Type id" })
  @ApiResponse({ status: 200, description: 'School Type removed successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden to access resource.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  remove(@Param('id', ValidateMongoId) id: string) {
    return this.schoolTypeService.remove(id);
  }
}
