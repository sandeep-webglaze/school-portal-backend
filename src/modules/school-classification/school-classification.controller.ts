import { Controller, Get, Post, Body, Put, Param, Delete, Query, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { USER_ROLE } from '@/src/lib/constants';
import { ValidateMongoId } from '@/src/lib/decorators';
import { CachingInterceptor } from '@/src/lib/interceptors';
import { Public } from '../auth/guards/jwt.guard';
import { AllowedRoles } from '../auth/guards/roles.guard';
import { SchoolClassificationService } from './school-classification.service';
import { CreateSchoolClassificationDto } from './dto/create-school-classification.dto';
import { UpdateSchoolClassificationDto } from './dto/update-school-classification.dto';
import { SchoolClassificationFilterDto } from './dto/school-classification-filter.dto';

@ApiTags('School Classification')
@Controller('school-classification')
export class SchoolClassificationController {
  constructor(
    private readonly schoolClassificationService: SchoolClassificationService,
  ) { }

  @Post()
  @ApiBearerAuth('JWT_Auth')
  @AllowedRoles(USER_ROLE.ADMIN, USER_ROLE.SUB_ADMIN)
  @ApiBody({ type: CreateSchoolClassificationDto, description: "Json schema for creating classification" })
  @ApiResponse({ status: 201, description: "Classification added successfully" })
  @ApiResponse({ status: 403, description: 'Forbidden to access resource.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  create(@Body() createDto: CreateSchoolClassificationDto) {
    return this.schoolClassificationService.create(createDto);
  }

  @UseInterceptors(CachingInterceptor)
  @Public()
  @Get()
  @ApiResponse({ status: 200, description: 'Classifications List based on applied filters.' })
  findAll(@Query() filter: SchoolClassificationFilterDto) {
    return this.schoolClassificationService.findAll(filter);
  }

  @UseInterceptors(CachingInterceptor)
  @Public()
  @Get(':id')
  @ApiParam({ type: String, name: "id", description: "Classification id" })
  @ApiResponse({ status: 200, description: 'Classification Detail.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  findOne(@Param('id', ValidateMongoId) id: string) {
    return this.schoolClassificationService.findOne(id);
  }

  @Put(':id')
  @ApiBearerAuth('JWT_Auth')
  @AllowedRoles(USER_ROLE.ADMIN, USER_ROLE.SUB_ADMIN)
  @ApiParam({ type: String, name: "id", description: "Classification id" })
  @ApiBody({ type: UpdateSchoolClassificationDto, description: "Json schema for updating classification" })
  @ApiResponse({ status: 200, description: 'Classification Detail.' })
  @ApiResponse({ status: 403, description: 'Forbidden to access resource.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  update(
    @Param('id', ValidateMongoId) id: string,
    @Body() updateDto: UpdateSchoolClassificationDto,
  ) {
    return this.schoolClassificationService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiBearerAuth('JWT_Auth')
  @AllowedRoles(USER_ROLE.ADMIN)
  @ApiParam({ type: String, name: "id", description: "Classification id" })
  @ApiResponse({ status: 200, description: 'Classification removed successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden to access resource.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  remove(@Param('id', ValidateMongoId) id: string) {
    return this.schoolClassificationService.remove(id);
  }
}
