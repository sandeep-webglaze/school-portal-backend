import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CacheTTL } from '@nestjs/cache-manager';

import { USER_ROLE } from '@/src/lib/constants';
import { CachingInterceptor, NoCache } from '@/src/lib/interceptors';
import { AllowedRoles } from '../auth/guards/roles.guard';
import { IUser, IUserObj } from '../user/interface';
import { CurrentUser, Public } from '../auth/guards/jwt.guard';
import { HomepageService } from './homepage.service';
import { Headers } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';

@ApiTags('Homepage')
@Controller('homepage')
export class HomepageController {
  constructor(private readonly homepageService: HomepageService, private readonly authService: AuthService) { }

  @UseInterceptors(CachingInterceptor)
  @CacheTTL(15)
  @Public()
  @Get('')
  @ApiResponse({ status: 200, description: 'Data for main website homepage.' })
  async website(@Headers('Authorization') authHeader: any) {
    let user: IUserObj | null = null;
    if (authHeader) {
      user = await this.authService.validateUserFromAuthHeader(authHeader);
    }
    return this.homepageService.websiteHomepage(user?._id);
  }

  @ApiBearerAuth('JWT_Auth')
  @Get('/admin-panel')
  @AllowedRoles(USER_ROLE.ADMIN, USER_ROLE.SUB_ADMIN)
  @ApiResponse({ status: 200, description: 'Data for admin website homepage.' })
  @ApiResponse({ status: 403, description: 'Forbidden to access resource.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  adminPanel(@CurrentUser() user: IUserObj) {
    return this.homepageService.adminPanelHomePage(user);
  }

  @ApiBearerAuth('JWT_Auth')
  @Get('/school-panel')
  @AllowedRoles(USER_ROLE.SCHOOL_ADMIN)
  @ApiResponse({ status: 200, description: 'Data for school admin website homepage.' })
  @ApiResponse({ status: 403, description: 'Forbidden to access resource.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  schoolPanel(@CurrentUser() user: IUserObj) {
    return this.homepageService.schoolPanelHomePage(user);
  }

  @UseInterceptors(CachingInterceptor)
  @CacheTTL(15)
  @Public()
  @Get('school-filters')
  @ApiResponse({ status: 200, description: 'Objects of All school filters.' })
  schoolFilters() {
    return this.homepageService.schoolFilters();
  }
}
