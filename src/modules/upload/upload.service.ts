import Jimp from 'jimp';
import { Injectable } from '@nestjs/common';

import { S3Service } from '@/src/lib/shared/services';
import { FILE_TYPE } from '@/src/lib/constants';
import { GetFilesListDto } from './dto/create-upload.dto';

@Injectable()
export class UploadService {
  constructor(private readonly s3Service: S3Service) { }

  async uploadFile(type: FILE_TYPE, file: Express.Multer.File) {
    if (type === FILE_TYPE.SCHOOL) {
      type = FILE_TYPE.NEW_SCHOOL_IMAGES;
      file = await this.generateWaterMarkImage2(file);
    }

    const newFileName = this.s3Service.generateUniqueFileName(
      file.originalname,
    );
    const destination = `${type}/${newFileName}`;

    return this.s3Service.uploadFileSignedUrl(
      file.buffer,
      file.mimetype,
      destination,
    );
  }

  getFiles(data: GetFilesListDto) {
    return this.s3Service.listObjects(data.prefix);
  }

  async checkAndRemoveOldFile(removeFilePath?: string, newFilePath?: string) {
    if (removeFilePath == null || removeFilePath == '') return;

    // checks whether both files are same or not, if both are same than just return
    if (newFilePath != null && newFilePath === removeFilePath) return;

    return this.s3Service.removeFile(removeFilePath);
  }

  async removeFiles(urls?: string[]) {
    if (urls == null) return;
    if (urls.length < 1) return;
    const promises = urls.map((url) => {
      if (!this.s3Service.validateUrl(url)) return;
      return this.s3Service.removeFile(url);
    });

    await Promise.all(promises);

    return {
      message: 'Removed Successfully',
    };
  }

  private async generateWaterMarkImage2(file: Express.Multer.File) {
    const watermarkText = 'EdHippo Academy';
    const jimpFile = await Jimp.read(file.buffer);
    try {
      const font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);

      const textWidth = Jimp.measureText(font, watermarkText);

      const textImage = new Jimp(
        jimpFile.bitmap.width,
        jimpFile.bitmap.height,
        '#ffffff00',
      );

      textImage.print(
        font,
        (jimpFile.bitmap.width - textWidth) / 2,
        jimpFile.bitmap.height / 2 - 32,
        watermarkText,
      );

      textImage.composite(jimpFile, 0, 0, {
        mode: Jimp.BLEND_SOURCE_OVER,
        opacityDest: 1,
        opacitySource: 0.4,
      });

      const modifiedBuffer = await textImage.getBufferAsync(file.mimetype);

      file.buffer = modifiedBuffer;
      file.size = modifiedBuffer.length;

      return file;
    } catch (err) {
      throw err;
    }
  }
}
