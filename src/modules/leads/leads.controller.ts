import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { USER_ROLE } from '@/src/lib/constants';
import { ValidateMongoId } from '@/src/lib/decorators';
import { IUserObj } from '../user/interface';
import { CurrentUser } from '../auth/guards/jwt.guard';
import { AllowedRoles } from '../auth/guards/roles.guard';
import { LeadsService } from './leads.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { LeadFilterDto } from './dto/filter-lead.dto';

@ApiTags('School Leads')
@ApiBearerAuth('JWT_Auth')
@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) { }

  @Post()
  @AllowedRoles(USER_ROLE.ADMIN, USER_ROLE.SUB_ADMIN)
  @ApiBody({ type: CreateLeadDto, description: 'Json schema for registering School lead' })
  @ApiResponse({ status: 201, description: 'School lead registered successfully', })
  @ApiResponse({ status: 403, description: 'Forbidden to access resource.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  create(@Body() createLeadDto: CreateLeadDto) {
    return this.leadsService.create(createLeadDto);
  }

  @Get()
  @AllowedRoles(USER_ROLE.ADMIN, USER_ROLE.SUB_ADMIN)
  @ApiResponse({ status: 200, description: 'All School Leads List based on applied filters.' })
  @ApiResponse({ status: 403, description: 'Forbidden to access resource.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  findAll(@CurrentUser() user: IUserObj, @Query() filter: LeadFilterDto) {
    return this.leadsService.findAll(user, filter);
  }

  @Get('available')
  @AllowedRoles(USER_ROLE.ADMIN, USER_ROLE.SUB_ADMIN, USER_ROLE.SCHOOL_ADMIN)
  @ApiResponse({ status: 200, description: 'School Leads available for purchase based on applied filters.' })
  @ApiResponse({ status: 403, description: 'Forbidden to access resource.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  availableLeads(@CurrentUser() user: IUserObj, @Query() filter: LeadFilterDto) {
    return this.leadsService.availableLeadsForPurchase(user, filter);
  }

  @Get('my-leads')
  @AllowedRoles(USER_ROLE.SCHOOL_ADMIN)
  @ApiResponse({ status: 200, description: 'Leads Purchased by logged in user.' })
  @ApiResponse({ status: 403, description: 'Forbidden to access resource.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  myLeads(@CurrentUser() user: IUserObj, @Query() filter: LeadFilterDto) {
    filter.owner = user._id;
    return this.leadsService.findAll(user, filter);
  }

  @Put(':id')
  @AllowedRoles(USER_ROLE.ADMIN, USER_ROLE.SUB_ADMIN)
  @ApiParam({ type: String, name: 'id', description: 'School Lead id' })
  @ApiResponse({ status: 200, description: 'School Lead updated.' })
  @ApiResponse({ status: 403, description: 'Forbidden to access resource.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  update(@Param('id', ValidateMongoId) id: string, @Body() updateLeadDto: UpdateLeadDto) {
    return this.leadsService.update(id, updateLeadDto);
  }

  @Delete(':id')
  @AllowedRoles(USER_ROLE.ADMIN)
  @ApiParam({ type: String, name: 'id', description: 'Lead id' })
  @ApiResponse({ status: 200, description: 'School Lead removed successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden to access resource.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  remove(@Param('id', ValidateMongoId) id: string) {
    return this.leadsService.remove(id);
  }
}
