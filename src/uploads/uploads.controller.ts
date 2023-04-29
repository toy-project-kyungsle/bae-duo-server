import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as AWS from 'aws-sdk';
import { UploadsService } from './uploads.service';
import { Uploads } from './uploads.entity';

@Controller('uploads')
export class UploadsController {
  constructor(private uploadsService: UploadsService) {}

  @Post('')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file) {
    AWS.config.update({
      region: 'ap-northeast-2',
      credentials: {
        accessKeyId: process.env.IAMAccess,
        secretAccessKey: process.env.IAMSecret,
      },
    });
    try {
      await new AWS.S3()
        .putObject({
          Bucket: process.env.BUCKET_NAME,
          Key: `${Date.now() + file.originalname}`,
          Body: file.buffer,
        })
        .promise();

      this.uploadsService.saveUploads(file);
      return {
        result: 'success',
        data: file.originalname,
      };
    } catch (error) {
      console.error('ERROR : ', error);
    }
  }
}
