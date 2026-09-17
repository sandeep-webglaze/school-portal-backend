import { Module } from '@nestjs/common';

import { S3Service } from '@/src/lib/shared';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';

@Module({
  controllers: [UploadController],
  providers: [S3Service, UploadService],
  exports: [UploadService]
})
export class UploadModule { }
