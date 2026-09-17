import { Controller, Get, Post, Body, Put, Param, Delete, Query, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { USER_ROLE } from '@/src/lib/constants';
import { ValidateMongoId } from '@/src/lib/decorators';
import { IUserObj } from '../../user/interface';
import { CurrentUser } from '../../auth/guards/jwt.guard';
import { AllowedRoles } from '../../auth/guards/roles.guard';
import { SchoolRequestService } from '../services/school-request.service';
import { CreateSchoolRequestDto, SchoolRequestFilterDto, UpdateSchoolRequestDto } from '../dto/school-request.dto';

@ApiTags('School Request')
@Controller('school-requests')
@ApiBearerAuth('JWT_Auth')
export class SchoolRequestController {
    constructor(private readonly schoolRequestService: SchoolRequestService) { }

    @Post()
    @AllowedRoles(USER_ROLE.SCHOOL_ADMIN)
    @ApiBody({ type: CreateSchoolRequestDto, description: "Json schema for creating School request" })
    @ApiResponse({ status: 201, description: "School request created successfully" })
    @ApiResponse({ status: 403, description: 'Forbidden to access resource.' })
    @ApiResponse({ status: 401, description: 'Unauthorized access.' })
    create(@CurrentUser() user: IUserObj, @Body() body: CreateSchoolRequestDto) {
        return this.schoolRequestService.create(user.school.toString(), body);
    }

    @Get()
    @AllowedRoles(USER_ROLE.SCHOOL_ADMIN, USER_ROLE.ADMIN, USER_ROLE.SUB_ADMIN)
    @ApiResponse({ status: 200, description: 'School request Lists based on applied filters.' })
    findAll(@CurrentUser() user: IUserObj, @Query() filter: SchoolRequestFilterDto) {
        if (user.role === USER_ROLE.SCHOOL_ADMIN) filter.school = user.school.toString();
        return this.schoolRequestService.findAll(filter);
    }

    @Get(':id')
    @AllowedRoles(USER_ROLE.SCHOOL_ADMIN, USER_ROLE.ADMIN, USER_ROLE.SUB_ADMIN)
    @ApiParam({ type: String, name: "id", description: "School request id" })
    @ApiResponse({ status: 200, description: 'School request Detail.' })
    @ApiResponse({ status: 401, description: 'Unauthorized access.' })
    findOne(@Param('id', ValidateMongoId) id: string) {
        return this.schoolRequestService.findOne(id);
    }

    @Put(':id')
    @AllowedRoles(USER_ROLE.ADMIN, USER_ROLE.SUB_ADMIN)
    @ApiParam({ type: String, name: "id", description: "School id" })
    @ApiBody({ type: UpdateSchoolRequestDto, description: "Json schema for updating School request" })
    @ApiResponse({ status: 200, description: 'School request update success.' })
    @ApiResponse({ status: 403, description: 'Forbidden to access resource.' })
    @ApiResponse({ status: 401, description: 'Unauthorized access.' })
    update(@Param('id', ValidateMongoId) id: string, @Body() updateSchoolDto: UpdateSchoolRequestDto) {
        return this.schoolRequestService.updateRequest(id, updateSchoolDto);
    }

    @Delete(':id')
    @AllowedRoles(USER_ROLE.ADMIN)
    @ApiParam({ type: String, name: "id", description: "School request id" })
    @ApiResponse({ status: 200, description: 'School request deleted.' })
    @ApiResponse({ status: 403, description: 'Forbidden to access resource.' })
    @ApiResponse({ status: 401, description: 'Unauthorized access.' })
    remove(@Param('id', ValidateMongoId) id: string) {
        return this.schoolRequestService.remove(id);
    }
}
