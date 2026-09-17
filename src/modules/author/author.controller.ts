import { Controller, Get, Post, Body, Param, Delete, Query, Put, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { USER_ROLE } from '@/src/lib/constants';
import { ValidateMongoId } from '@/src/lib/decorators';
import { CachingInterceptor } from '@/src/lib/interceptors';
import { Public } from '../auth/guards/jwt.guard';
import { AllowedRoles } from '../auth/guards/roles.guard';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { AuthorFilterDto } from './dto/filter-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@ApiTags('Author')
@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) { }

  @Post()
  @ApiBearerAuth('JWT_Auth')
  @AllowedRoles(USER_ROLE.ADMIN, USER_ROLE.SUB_ADMIN)
  @ApiBody({ type: CreateAuthorDto, description: 'Json schema for creating Author' })
  @ApiResponse({ status: 201, description: 'Author created successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden to access resource.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorService.create(createAuthorDto);
  }

  @UseInterceptors(CachingInterceptor)
  @Public()
  @Get()
  @ApiResponse({ status: 200, description: 'Author list based on applied filters.' })
  findAll(@Query() filterDto: AuthorFilterDto) {
    return this.authorService.findAll(filterDto);
  }

  // Public payload for the /author/[slug] page on the web app — returns the
  // author document plus all combination slugs assigned to them ("articles").
  @UseInterceptors(CachingInterceptor)
  @Public()
  @Get(':slug/detail')
  @ApiParam({ type: String, name: 'slug', description: 'Author page slug' })
  @ApiResponse({ status: 200, description: 'Author detail with assigned slugs.' })
  @ApiResponse({ status: 404, description: 'Author with provided slug not found.' })
  authorDetail(@Param('slug') slug: string) {
    return this.authorService.findBySlug(slug);
  }

  // Admin: where is this author published? Every slug attributed to them
  // (dropdown assignment OR /author/<slug> link inside the content).
  @UseInterceptors(CachingInterceptor)
  @Get(':id/pages')
  @ApiBearerAuth('JWT_Auth')
  @AllowedRoles(USER_ROLE.ADMIN, USER_ROLE.SUB_ADMIN)
  @ApiParam({ type: String, name: 'id', description: 'Author id' })
  @ApiResponse({ status: 200, description: 'Pages where this author is published.' })
  @ApiResponse({ status: 404, description: 'Author with provided id not found.' })
  findPublishedPages(@Param('id', ValidateMongoId) id: string) {
    return this.authorService.publishedPages(id);
  }

  @UseInterceptors(CachingInterceptor)
  @Get(':id')
  @ApiBearerAuth('JWT_Auth')
  @AllowedRoles(USER_ROLE.ADMIN, USER_ROLE.SUB_ADMIN)
  @ApiParam({ type: String, name: 'id', description: 'Author id' })
  @ApiResponse({ status: 200, description: 'Author detail.' })
  @ApiResponse({ status: 404, description: 'Author with provided id not found.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  findOne(@Param('id', ValidateMongoId) id: string) {
    return this.authorService.findOne(id);
  }

  @Put(':id')
  @ApiBearerAuth('JWT_Auth')
  @AllowedRoles(USER_ROLE.ADMIN, USER_ROLE.SUB_ADMIN)
  @ApiParam({ type: String, name: 'id', description: 'Author id' })
  @ApiBody({ type: UpdateAuthorDto, description: 'Json schema for updating Author' })
  @ApiResponse({ status: 200, description: 'Author detail.' })
  @ApiResponse({ status: 403, description: 'Forbidden to access resource.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  updateOne(@Param('id', ValidateMongoId) id: string, @Body() updateDto: UpdateAuthorDto) {
    return this.authorService.updateOne(id, updateDto);
  }

  @Delete(':id')
  @ApiBearerAuth('JWT_Auth')
  @AllowedRoles(USER_ROLE.ADMIN)
  @ApiParam({ type: String, name: 'id', description: 'Author id' })
  @ApiResponse({ status: 200, description: 'Author deleted.' })
  @ApiResponse({ status: 403, description: 'Forbidden to access resource.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  remove(@Param('id', ValidateMongoId) id: string) {
    return this.authorService.remove(id);
  }
}
