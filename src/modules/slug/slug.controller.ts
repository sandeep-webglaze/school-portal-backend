import { Controller, Get, Post, Body, Put, Param, Delete, Query, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { USER_ROLE } from '@/src/lib/constants';
import { ValidateMongoId } from '@/src/lib/decorators';
import { CachingInterceptor } from '@/src/lib/interceptors';
import { Public } from '../auth/guards/jwt.guard';
import { AllowedRoles } from '../auth/guards/roles.guard';
import { SlugService } from './slug.service';
import { CreateSlugDto } from './dto/create-slug.dto';
import { SlugFilterDto } from './dto/filter-slug.dto';
import { UpdateSlugDto } from './dto/update-slug.dto';

@ApiTags('Slug')
@Controller('slug')
@ApiBearerAuth('JWT_Auth')
export class SlugController {
  constructor(private readonly slugService: SlugService) { }

  @Post()
  @AllowedRoles(USER_ROLE.ADMIN, USER_ROLE.SUB_ADMIN)
  @ApiBody({ type: CreateSlugDto, description: "Json schema for creating Slug" })
  @ApiResponse({ status: 201, description: "Slug created successfully" })
  @ApiResponse({ status: 403, description: 'Forbidden to access resource.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  create(@Body() body: CreateSlugDto) {
    return this.slugService.create(body);
  }

  @UseInterceptors(CachingInterceptor)
  @Get()
  @AllowedRoles(USER_ROLE.ADMIN, USER_ROLE.SUB_ADMIN)
  @ApiResponse({ status: 200, description: 'Slug List based on applied filters.' })
  @ApiResponse({ status: 403, description: 'Forbidden to access resource.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  findAll(@Query() filterDto: SlugFilterDto) {
    return this.slugService.findAll(filterDto);
  }

  @UseInterceptors(CachingInterceptor)
  @Public()
  @Get('search/site-map')
  @ApiResponse({ status: 200, description: 'All non school slugs.' })
  slugSearchSitemap(@Query() filterDto: SlugFilterDto) {
    return this.slugService.slugSitemap(false, filterDto);
  }

  @UseInterceptors(CachingInterceptor)
  @Public()
  @Get('school/site-map')
  @ApiResponse({ status: 200, description: 'All school slugs.' })
  slugSchoolSitemap(@Query() filterDto: SlugFilterDto) {
    return this.slugService.slugSitemap(true, filterDto);
  }

  @UseInterceptors(CachingInterceptor)
  @Public()
  @Get(':id/slug')
  @ApiParam({ type: String, name: "id", description: "Slug string" })
  @ApiResponse({ status: 200, description: 'Slug Detail.' })
  @ApiResponse({ status: 404, description: 'Slug detail with provided slug not found.' })
  slugData(@Param('id') id: string) {
    return this.slugService.findBySlug(id);
  }

  @UseInterceptors(CachingInterceptor)
  @Get(':id')
  @ApiParam({ type: String, name: "id", description: "Slug id" })
  @ApiResponse({ status: 200, description: 'Slug Detail.' })
  @ApiResponse({ status: 404, description: 'Slug with provided id not found.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  findOne(@Param('id', ValidateMongoId) id: string) {
    return this.slugService.findOne(id);
  }

  @Put(':id')
  @AllowedRoles(USER_ROLE.ADMIN, USER_ROLE.SUB_ADMIN)
  @ApiParam({ type: String, name: "id", description: "Slug id" })
  @ApiBody({ type: UpdateSlugDto, description: "Json schema for updating Slug" })
  @ApiResponse({ status: 200, description: 'Slug Detail.' })
  @ApiResponse({ status: 403, description: 'Forbidden to access resource.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  update(
    @Param('id', ValidateMongoId) id: string,
    @Body() body: UpdateSlugDto,
  ) {
    return this.slugService.updateOne(id, body);
  }

  @Delete(':id')
  @AllowedRoles(USER_ROLE.ADMIN)
  @ApiParam({ type: String, name: "id", description: "Slug id" })
  @ApiResponse({ status: 200, description: 'Slug deleted.' })
  @ApiResponse({ status: 403, description: 'Forbidden to access resource.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  remove(@Param('id', ValidateMongoId) id: string) {
    return this.slugService.remove(id);
  }
}
