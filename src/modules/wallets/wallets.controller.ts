import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { USER_ROLE } from '@/src/lib/constants';
import { IUserObj } from '../user/interface';
import { CurrentUser } from '../auth/guards/jwt.guard';
import { AllowedRoles } from '../auth/guards/roles.guard';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { WalletsService } from './wallets.service';
import { FilterWalletDto } from './dto/filter-wallet.dto';

@ApiTags('Wallets')
@ApiBearerAuth('JWT_Auth')
@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) { }

  @Post()
  @AllowedRoles(USER_ROLE.ADMIN)
  @ApiBody({ type: CreateWalletDto, description: 'Json schema for creating new wallet for user' })
  @ApiResponse({ status: 201, description: 'Wallet created successfully', })
  @ApiResponse({ status: 403, description: 'Forbidden to access resource.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  create(@Body() createWalletDto: CreateWalletDto) {
    return this.walletsService.create(createWalletDto);
  }

  @AllowedRoles(USER_ROLE.ADMIN)
  @Get()
  @ApiResponse({ status: 200, description: 'All Wallets List based on applied filters.' })
  @ApiResponse({ status: 403, description: 'Forbidden to access resource.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  findAll(@Query() filterDto: FilterWalletDto) {
    return this.walletsService.findAll(filterDto);
  }

  @Get('my-wallet')
  @ApiResponse({ status: 200, description: 'Get logged in user wallet.' })
  @ApiResponse({ status: 403, description: 'Forbidden to access resource.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  myWallet(@CurrentUser() user: IUserObj) {
    return this.walletsService.myWallet(user._id);
  }

  @AllowedRoles(USER_ROLE.ADMIN)
  @Put(':id')
  @ApiParam({ type: String, name: 'id', description: 'user id' })
  @ApiResponse({ status: 200, description: 'Wallet updated.' })
  @ApiResponse({ status: 403, description: 'Forbidden to access resource.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  update(@Param('id') userId: string, @Body() updateWalletDto: UpdateWalletDto) {
    return this.walletsService.updateUserWallet(userId, updateWalletDto);
  }

  @AllowedRoles(USER_ROLE.ADMIN)
  @Delete(':id')
  @ApiParam({ type: String, name: 'id', description: 'Wallet id' })
  @ApiResponse({ status: 200, description: 'Wallet removed successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden to access resource.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  delete(@Param('id') userId: string) {
    return this.walletsService.deleteUserWallet(userId);
  }
}
