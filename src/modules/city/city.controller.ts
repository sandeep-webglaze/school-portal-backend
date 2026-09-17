import { Controller, Get, Post, Body, Param, Delete, Query, Put, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { USER_ROLE } from '@/src/lib/constants';
import { ValidateMongoId } from '@/src/lib/decorators';
import { CachingInterceptor } from '@/src/lib/interceptors';
import { Public } from '../auth/guards/jwt.guard';
import { AllowedRoles } from '../auth/guards/roles.guard';
import { CityService } from './city.service';
import { CreateCityDto } from './dto/create-city.dto';
import { CityFilterDto } from './dto/city-filter.dto';
import { UpdateCityDto } from './dto/update-city.dto';

@ApiTags('City')
@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) { }

  @Post()
  @ApiBearerAuth('JWT_Auth')
  @AllowedRoles(USER_ROLE.ADMIN, USER_ROLE.SUB_ADMIN)
  @ApiBody({ type: CreateCityDto, description: "Json schema for creating City" })
  @ApiResponse({ status: 201, description: "City added successfully" })
  @ApiResponse({ status: 403, description: 'Forbidden to access resource.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  create(@Body() createCityDto: CreateCityDto) {
    return this.cityService.create(createCityDto);
  }

  @UseInterceptors(CachingInterceptor)
  @Public()
  @Get()
  @ApiResponse({ status: 200, description: 'City Lists based on applied filters.' })
  findAll(@Query() filterDto: CityFilterDto) {
    return this.cityService.findAll(filterDto);
  }

  @UseInterceptors(CachingInterceptor)
  @Public()
  @Get(':id')
  @ApiParam({ type: String, name: "id", description: "City id" })
  @ApiResponse({ status: 200, description: 'City Detail.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  findOne(@Param('id', ValidateMongoId) id: string) {
    return this.cityService.findOne(id);
  }

  @Put(':id')
  @ApiBearerAuth('JWT_Auth')
  @AllowedRoles(USER_ROLE.ADMIN, USER_ROLE.SUB_ADMIN)
  @ApiParam({ type: String, name: "id", description: "City id" })
  @ApiBody({ type: UpdateCityDto, description: "Json schema for updating city" })
  @ApiResponse({ status: 200, description: 'City Detail.' })
  @ApiResponse({ status: 403, description: 'Forbidden to access resource.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  updateOne(@Param('id', ValidateMongoId) id: string, @Body() updateDto: UpdateCityDto) {
    return this.cityService.updateOne(id, updateDto);
  }

  @Delete(':id')
  @ApiBearerAuth('JWT_Auth')
  @AllowedRoles(USER_ROLE.ADMIN)
  @ApiParam({ type: String, name: "id", description: "City id" })
  @ApiResponse({ status: 200, description: 'City deleted.' })
  @ApiResponse({ status: 403, description: 'Forbidden to access resource.' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  remove(@Param('id', ValidateMongoId) id: string) {
    return this.cityService.remove(id);
  }
}
