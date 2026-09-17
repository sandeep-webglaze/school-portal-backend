import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  Delete,
  Query,
  BadRequestException,
  Get,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { FILE_TYPE, USER_ROLE } from '@/src/lib/constants';
import { AllowedRoles } from '../auth/guards/roles.guard';
import { GetFilesListDto, UploadImageDto } from './dto/create-upload.dto';
import { ImageFileValidationBuilder } from './file-type.validator';
import { UploadService } from './upload.service';
import { Public } from '../auth/guards/jwt.guard';

@ApiTags('File Upload')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) { }

  @Delete()
  @ApiBearerAuth('JWT_Auth')
  @ApiResponse({ status: 200, description: 'File Removed Successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  async removeFile(@Query('url') url: string) {
    return await this.uploadService.checkAndRemoveOldFile(url);
  }

  @Post()
  @ApiBearerAuth('JWT_Auth')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        type: {
          type: 'string',
          enum: Object.values(FILE_TYPE),
        },
        file: {
          type: 'string',
          format: 'binary',
          nullable: false,
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  @ApiResponse({ status: 200, description: 'File uploaded successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  async uploadImage(
    @UploadedFile('file', ImageFileValidationBuilder('image'))
    file: Express.Multer.File,
    @Body() body: UploadImageDto,
  ) {
    if (file == null) throw new BadRequestException('Invalid file');
    return this.uploadService.uploadFile(body.type, file);
  }

  @ApiBearerAuth('JWT_Auth')
  @AllowedRoles(USER_ROLE.ADMIN)
  @Get()
  getFiles(@Query() filterDto: GetFilesListDto) {
    return this.uploadService.getFiles(filterDto);
  }

  // @Post('multiple')
  // @ApiConsumes('multipart/form-data')
  // @ApiBody({
  //   schema: {
  //     type: 'object',
  //     properties: {
  //       type: {
  //         type: 'string',
  //         enum: Object.values(FILE_TYPE)
  //       },
  //       file: {
  //         type: 'array',
  //         items: {
  //           type: 'string',
  //           format: 'binary',
  //           nullable: false
  //         }
  //       },
  //     },
  //   },
  // })
  // @UseInterceptors(FileInterceptor('file'))
  // async uploadMultipleImages(
  //   @UploadedFiles(/* ImageFileValidationBuilder('image') */) files: Express.Multer.File[],
  //   @Body() body: UploadImageDto
  // ) {

  //   try {
  //     const uploadPromises = files.map(async (file) => {
  //       try {
  //         const key = await this.uploadService.uploadFile(body.type, file);
  //         return { fileName: file.originalname, key, success: true };
  //       } catch (error) {
  //         return { fileName: file.originalname, success: false, error: 'Failed to upload' };
  //       }
  //     });
  //     const uploadedFilesWithStatus = await Promise.all(uploadPromises);

  //     // Separate successful uploads and failed uploads
  //     const successfulUploads = uploadedFilesWithStatus.filter((upload) => upload.success);
  //     const failedUploads = uploadedFilesWithStatus.filter((upload) => !upload.success);

  //     return { successfulUploads, failedUploads };
  //   } catch (error) {
  //     return { error: 'Failed to upload files' };
  //   }
  // }
}
