import { Controller, Get, Post, Body, Param, Delete, Query, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { USER_ROLE } from '@/src/lib/constants';
import { ValidateMongoId } from '@/src/lib/decorators';
import { CurrentUser } from '../auth/guards/jwt.guard';
import { IUserObj } from '../user/interface';
import { SchoolReviewService } from './school-review.service';
import { CreateSchoolReviewDto } from './dto/create-school-review.dto';
import { UpdateSchoolReviewDto } from './dto/update-school-review.dto';
import { SchoolReviewFilterDto } from './dto/school-review-filter.dto';

@ApiTags('School Review')
@Controller('school-review')
@ApiBearerAuth('JWT_Auth')
export class SchoolReviewController {
  constructor(private readonly schoolReviewService: SchoolReviewService) { }

  @Post()
  @ApiBody({ type: CreateSchoolReviewDto, description: "Json schema for add review to school" })
  @ApiResponse({ status: 200, description: 'School Review Added.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  create(@CurrentUser() user: IUserObj, @Body() createSchoolReviewDto: CreateSchoolReviewDto) {
    return this.schoolReviewService.create(user._id, createSchoolReviewDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'School Review list.' })
  @ApiResponse({ status: 403, description: 'Forbidden to access resource.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  findAll(@CurrentUser() user: IUserObj, @Query() filter: SchoolReviewFilterDto) {
    if (user.role === USER_ROLE.USER) filter.user = user._id.toString();
    return this.schoolReviewService.findAll(filter);
  }

  @Get(':id')
  @ApiParam({ type: String, name: "id", description: "School id" })
  @ApiResponse({ status: 200, description: 'School Review list.' })
  @ApiResponse({ status: 403, description: 'Forbidden to access resource.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  schoolReviews(@Param('id', ValidateMongoId) schoolId: string, @Query() filter: SchoolReviewFilterDto) {
    filter.schoolId = schoolId;
    return this.schoolReviewService.findAll(filter);
  }

  @Put(':id')
  @ApiParam({ type: String, name: "id", description: "Review id" })
  @ApiBody({ type: UpdateSchoolReviewDto, description: "Json schema for updating school review" })
  @ApiResponse({ status: 200, description: 'Review updated successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden to access resource.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  update(@CurrentUser() user: IUserObj, @Param('id', ValidateMongoId) id: string, @Body() updateSchoolReviewDto: UpdateSchoolReviewDto) {
    return this.schoolReviewService.update(id, updateSchoolReviewDto);
  }

  @Delete(':id')
  @ApiParam({ type: String, name: "id", description: "Review id" })
  @ApiResponse({ status: 200, description: 'School Review removed.' })
  @ApiResponse({ status: 403, description: 'Forbidden to access resource.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  remove(@CurrentUser() user: IUserObj, @Param('id', ValidateMongoId) id: string) {
    return this.schoolReviewService.remove(id);
  }
}
