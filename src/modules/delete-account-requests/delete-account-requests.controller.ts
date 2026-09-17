import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { USER_ROLE } from '@/src/lib/constants';
import { CreateDeleteAccountRequestDto } from './dto/create-delete-account-request.dto';
import { DeleteAccountRequestsService } from './delete-account-requests.service';
import { AllowedRoles } from '../auth/guards/roles.guard';
import { CurrentUser } from '../auth/guards/jwt.guard';
import { IUserObj } from '../user/interface';

@ApiTags('Delete Account Requests')
@Controller('delete-account-requests')
export class DeleteAccountRequestsController {
  constructor(private readonly deleteAccountRequestsService: DeleteAccountRequestsService) { }

  @Post()
  @ApiBearerAuth('JWT_Auth')
  @AllowedRoles(USER_ROLE.SCHOOL_ADMIN, USER_ROLE.USER)
  @ApiBody({ type: CreateDeleteAccountRequestDto, description: "Json schema for creating delete account request" })
  @ApiResponse({ status: 201, description: "Delete account request added successfully" })
  @ApiResponse({ status: 403, description: 'Forbidden to access resource.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  create(@CurrentUser() user: IUserObj, @Body() createDeleteAccountRequestDto: CreateDeleteAccountRequestDto) {
    return this.deleteAccountRequestsService.create(user, createDeleteAccountRequestDto);
  }

  @Get()
  @AllowedRoles(USER_ROLE.ADMIN, USER_ROLE.SUB_ADMIN)
  @ApiResponse({ status: 200, description: 'List of all delete account requests.' })
  findAll() {
    return this.deleteAccountRequestsService.findAll();
  }

  @Delete(':id')
  @ApiBearerAuth('JWT_Auth')
  @AllowedRoles(USER_ROLE.ADMIN)
  @ApiParam({ type: String, name: "id", description: "User id" })
  @ApiResponse({ status: 200, description: 'request removed successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden to access resource.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  remove(@Param('id') id: string) {
    return this.deleteAccountRequestsService.remove(id);
  }
}
