import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Body, Put, UseInterceptors } from '@nestjs/common';
import { CacheTTL } from '@nestjs/cache-manager';

import { USER_ROLE } from '@/src/lib/constants';
import { CachingInterceptor } from '@/src/lib/interceptors';
import { Public } from '../auth/guards/jwt.guard';
import { AllowedRoles } from '../auth/guards/roles.guard';
import { AppConfigurationService } from './app-configuration.service';
import { CreateAppConfigurationDto } from './dto/create-app-configuration.dto';

@ApiTags('App Configuration')
@Controller('app-configuration')
export class AppConfigurationController {
  constructor(
    private readonly appConfigurationsService: AppConfigurationService,
  ) { }

  @UseInterceptors(CachingInterceptor)
  @CacheTTL(30)
  @Public()
  @Get()
  @ApiResponse({ status: 200, description: "Global app configurations" })
  findOne() {
    return this.appConfigurationsService.findOne();
  }

  @Put()
  @ApiBearerAuth('JWT_Auth')
  @AllowedRoles(USER_ROLE.ADMIN)
  @ApiBody({ type: CreateAppConfigurationDto, description: "Json schema for adding/updating global app configurations" })
  @ApiResponse({ status: 200, description: 'Review updated successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden to access resource.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  update(@Body() body: CreateAppConfigurationDto) {
    return this.appConfigurationsService.update(body);
  }
}
