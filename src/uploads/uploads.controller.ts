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

const s3 = new AWS.S3({ useAccelerateEndpoint: true });

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
      const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: `${Date.now() + file.originalname}`,
        Body: file.buffer,
        ContentType: 'image/jpeg',
        ACL: 'public-read',
      };
      await new AWS.S3().putObject(params).promise();

      const s3Url = await s3.getSignedUrlPromise('putObject', params);

      file.url = s3Url;
      file.createdId = `${Date.now() + file.originalname}`;
      console.log('files', file);
      this.uploadsService.saveUploads(file);
      return file.originalname;
    } catch (error) {
      console.error('ERROR : ', error);
    }
  }
}
