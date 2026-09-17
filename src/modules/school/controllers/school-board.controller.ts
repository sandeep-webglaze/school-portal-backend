import { Controller, Get, Post, Body, Put, Param, Delete, Query, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { USER_ROLE } from '@/src/lib/constants';
import { ValidateMongoId } from '@/src/lib/decorators';
import { CachingInterceptor } from '@/src/lib/interceptors';
import { AllowedRoles } from '../../auth/guards/roles.guard';
import { Public } from '../../auth/guards/jwt.guard';
import { CreateSchoolBoardDto, SchoolBoardFilterDto, UpdateSchoolBoardDto } from '../dto/school-board.dto';
import { SchoolBoardService } from '../services/school-board.service';

@ApiTags('School Boards')
@Controller('school-board')
export class SchoolBoardController {
  constructor(private readonly schoolBoardService: SchoolBoardService) { }

  @Post()
  @ApiBearerAuth('JWT_Auth')
  @AllowedRoles(USER_ROLE.ADMIN, USER_ROLE.SUB_ADMIN)
  @ApiBody({ type: CreateSchoolBoardDto, description: "Json schema for creating School board" })
  @ApiResponse({ status: 201, description: "School board created successfully" })
  @ApiResponse({ status: 403, description: 'Forbidden to access resource.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  create(@Body() createSchoolBoardDto: CreateSchoolBoardDto) {
    return this.schoolBoardService.create(createSchoolBoardDto);
  }

  @UseInterceptors(CachingInterceptor)
  @Public()
  @Get()
  @ApiResponse({ status: 200, description: 'School board Lists based on applied filters.' })
  findAll(@Query() filter: SchoolBoardFilterDto) {
    return this.schoolBoardService.findAll(filter);
  }

  @UseInterceptors(CachingInterceptor)
  @Public()
  @Get(':id')
  @ApiParam({ type: String, name: "id", description: "School board id" })
  @ApiResponse({ status: 200, description: 'School board Detail.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  findOne(@Param('id', ValidateMongoId) id: string) {
    return this.schoolBoardService.findOne(id);
  }

  @Put(':id')
  @ApiBearerAuth('JWT_Auth')
  @AllowedRoles(USER_ROLE.ADMIN, USER_ROLE.SUB_ADMIN)
  @ApiParam({ type: String, name: "id", description: "School board id" })
  @ApiBody({ type: UpdateSchoolBoardDto, description: "Json schema for updating School board" })
  @ApiResponse({ status: 200, description: 'School board Detail.' })
  @ApiResponse({ status: 403, description: 'Forbidden to access resource.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  update(
    @Param('id', ValidateMongoId) id: string,
    @Body() updateSchoolBoardDto: UpdateSchoolBoardDto,
  ) {
    return this.schoolBoardService.update(id, updateSchoolBoardDto);
  }

  @Delete(':id')
  @ApiBearerAuth('JWT_Auth')
  @AllowedRoles(USER_ROLE.ADMIN)
  @ApiParam({ type: String, name: "id", description: "School board id" })
  @ApiResponse({ status: 200, description: 'School board deleted.' })
  @ApiResponse({ status: 403, description: 'Forbidden to access resource.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  remove(@Param('id', ValidateMongoId) id: string) {
    return this.schoolBoardService.remove(id);
  }
}
