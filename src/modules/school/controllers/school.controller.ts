import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  Headers,
  ForbiddenException,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { USER_ROLE, USER_VERIFICATION_STATUS } from '@/src/lib/constants';
import { ValidateMongoId } from '@/src/lib/decorators';
import { IUserObj } from '../../user/interface';
import { AuthService } from '../../auth/auth.service';
import { AllowedRoles } from '../../auth/guards/roles.guard';
import { CurrentUser, Public } from '../../auth/guards/jwt.guard';
import { CreateSchoolDto, UpdateFeaturedSchoolsPriorityDto, UpdateSchoolDto } from '../dto/school.dto';
import { SchoolService } from '../services/school.service';
import { SchoolFilterDto } from '../dto/school-filter.dto';
import { SchoolChangesDto } from '../dto/school-request.dto';

@ApiTags('School')
@Controller('school')
export class SchoolController {
  constructor(
    private readonly schoolService: SchoolService,
    private readonly authService: AuthService,
  ) { }

  @Post()
  @ApiBearerAuth('JWT_Auth')
  @AllowedRoles(USER_ROLE.ADMIN, USER_ROLE.SUB_ADMIN)
  @ApiBody({
    type: CreateSchoolDto,
    description: 'Json schema for creating School',
  })
  @ApiResponse({ status: 201, description: 'School created successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden to access resource.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  create(@Body() createSchoolDto: CreateSchoolDto) {
    return this.schoolService.create(createSchoolDto);
  }

  @Get()
  @ApiBearerAuth('JWT_Auth')
  @AllowedRoles(USER_ROLE.ADMIN, USER_ROLE.SUB_ADMIN)
  @ApiResponse({
    status: 200,
    description: 'School Lists based on applied filters.',
  })
  findAll(@Query() filterDto: SchoolFilterDto) {
    return this.schoolService.findAll(filterDto);
  }

  @Public()
  @Post('list')
  @ApiBearerAuth('JWT_Auth')
  @ApiResponse({
    status: 200,
    description:
      'Public route for published School Lists based on applied filters.',
  })
  async findAll2(
    @Body() filterDto: SchoolFilterDto,
    @Headers('Authorization') authHeader: any,
  ) {
    let published = true;
    if (authHeader && !filterDto.userId) {
      const user =
        await this.authService.validateUserFromAuthHeader(authHeader);

      // only admin and sub-admin can view unpublished school
      if ([USER_ROLE.SUB_ADMIN, USER_ROLE.ADMIN].includes(user.role)) {
        published = filterDto.published;
      }

      filterDto.userId = user._id.toString();
    }

    filterDto.published = published;

    return this.schoolService.findAll(filterDto);
  }

  @Public()
  @Get(':id')
  @ApiParam({ type: String, name: 'id', description: 'School id' })
  @ApiResponse({ status: 200, description: 'School Detail.' })
  @ApiResponse({
    status: 404,
    description: 'School with provided id not found.',
  })
  findOne(@Param('id', ValidateMongoId) id: string) {
    return this.schoolService.findOne({ id });
  }

  @Public()
  @Get(':slug/slug')
  @ApiParam({ type: String, name: 'slug', description: 'School slug' })
  @ApiResponse({ status: 200, description: 'School Detail.' })
  @ApiResponse({
    status: 404,
    description: 'School with provided slug not found.',
  })
  findOneBySlug(@Param('slug') slug: string) {
    return this.schoolService.findOne({ slug });
  }

  @Put('')
  @ApiBearerAuth('JWT_Auth')
  @AllowedRoles(USER_ROLE.SCHOOL_ADMIN)
  @ApiParam({ type: String, name: 'id', description: 'School id' })
  @ApiBody({
    type: SchoolChangesDto,
    description: 'Json schema for updating School for school user',
  })
  @ApiResponse({ status: 200, description: 'School updated.' })
  @ApiResponse({ status: 403, description: 'Forbidden to access resource.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  updateSchool(
    @CurrentUser() user: IUserObj,
    @Body() updateSchoolDto: SchoolChangesDto,
  ) {
    if (!user.school)
      throw new ForbiddenException('unable to find associated school');
    if (user.verificationStatus != USER_VERIFICATION_STATUS.VERIFIED)
      throw new ForbiddenException(
        `Account verification is ${user.verificationStatus}`,
      );
    return this.schoolService.update(user.school.toString(), updateSchoolDto);
  }

  @Put(':id')
  @ApiBearerAuth('JWT_Auth')
  @AllowedRoles(USER_ROLE.ADMIN, USER_ROLE.SUB_ADMIN)
  @ApiParam({ type: String, name: 'id', description: 'School id' })
  @ApiBody({
    type: UpdateSchoolDto,
    description: 'Json schema for updating School',
  })
  @ApiResponse({ status: 200, description: 'School Detail.' })
  @ApiResponse({ status: 403, description: 'Forbidden to access resource.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  update(
    @CurrentUser() user: IUserObj,
    @Param('id', ValidateMongoId) id: string,
    @Body() updateSchoolDto: UpdateSchoolDto,
  ) {
    return this.schoolService.update(id, updateSchoolDto);
  }

  @Put('featured-school/priority')
  @ApiBearerAuth('JWT_Auth')
  @AllowedRoles(USER_ROLE.ADMIN, USER_ROLE.SUB_ADMIN)
  @ApiBody({
    type: UpdateFeaturedSchoolsPriorityDto,
    description: 'Json schema for updating featured School Priorities',
  })
  @ApiResponse({ status: 200, description: 'Priorities Updated.' })
  @ApiResponse({ status: 403, description: 'Forbidden to access resource.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  updateSchoolPriorities(
    @Body() updateSchoolPriorityDto: UpdateFeaturedSchoolsPriorityDto,
  ) {
    return this.schoolService.updateFeaturedSchoolPriority(updateSchoolPriorityDto.priorities);
  }

  @Put(':id/mail-detail')
  @ApiBearerAuth('JWT_Auth')
  @AllowedRoles(USER_ROLE.USER)
  @ApiParam({ type: String, name: "id", description: "School id" })
  @ApiResponse({ status: 200, description: 'School Details mailed successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden to access resource.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  sendDetailsToMail(
    @CurrentUser() user: IUserObj,
    @Param('id', ValidateMongoId) id: string,
  ) {
    return this.schoolService.sendDetailsToMail(user, id);
  }

  @Delete(':id')
  @ApiBearerAuth('JWT_Auth')
  @AllowedRoles(USER_ROLE.ADMIN)
  @ApiParam({ type: String, name: 'id', description: 'School id' })
  @ApiResponse({ status: 200, description: 'School deleted.' })
  @ApiResponse({ status: 403, description: 'Forbidden to access resource.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  remove(@Param('id', ValidateMongoId) id: string) {
    return this.schoolService.remove(id);
  }
}
