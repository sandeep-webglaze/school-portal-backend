import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { USER_ROLE } from '@/src/lib/constants';
import { ValidateMongoId } from '@/src/lib/decorators';
import { IUserObj } from '../user/interface';
import { CurrentUser } from '../auth/guards/jwt.guard';
import { AllowedRoles } from '../auth/guards/roles.guard';
import { FavoriteSchoolService } from './favorite-school.service';
import { CreateFavoriteSchoolDto } from './dto/create-favorite-school.dto';
import { FilterFavoriteSchoolDto } from './dto/filter-favorite-school.dto';

@ApiTags('Favorite School')
@ApiBearerAuth('JWT_Auth')
@Controller('favorite-school')
export class FavoriteSchoolController {
  constructor(private readonly favoriteSchoolService: FavoriteSchoolService) { }

  @Post()
  @AllowedRoles(USER_ROLE.ADMIN, USER_ROLE.SUB_ADMIN)
  @ApiBody({ type: CreateFavoriteSchoolDto, description: "Json structure of add school to user wishlist" })
  @ApiResponse({ status: 201, description: 'User created Successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden to access resource.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  create(@Body() createFavoriteSchoolDto: CreateFavoriteSchoolDto) {
    return this.favoriteSchoolService.create(createFavoriteSchoolDto.user, createFavoriteSchoolDto.school);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'User Favorite Schools.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  findAll(@CurrentUser() user: IUserObj, filterDto: FilterFavoriteSchoolDto) {
    return this.favoriteSchoolService.myFavoriteSchools(user, filterDto);
  }

  @Put(':id')
  @ApiParam({ type: String, name: "id", description: "School id" })
  @ApiResponse({ status: 200, description: 'Add school to user school wishlist successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden to access resource.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  addToWishList(@CurrentUser() user: IUserObj, @Param('id', ValidateMongoId) school: string) {
    return this.favoriteSchoolService.create(user._id, school);
  }

  @Delete(':id')
  @ApiParam({ type: String, name: "id", description: "School id" })
  @ApiResponse({ status: 200, description: 'Remove school successfully from wishlist.' })
  @ApiResponse({ status: 403, description: 'Forbidden to access resource.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  removeFromWishList(@CurrentUser() user: IUserObj, @Param('id', ValidateMongoId) school: string) {
    return this.favoriteSchoolService.remove(user, school);
  }
}
