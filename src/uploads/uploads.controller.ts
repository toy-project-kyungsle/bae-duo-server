import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as AWS from 'aws-sdk';

const BUCKET_NAME = 'baeduo';

@Controller('uploads')
export default class UploadsController {
  @Post('')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file) {
    AWS.config.update({
      region: 'ap-northeast-2',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
      },
    });
    try {
      await new AWS.S3()
        .putObject({
          Bucket: BUCKET_NAME,
          Key: `${Date.now() + file.originalname}`,
          Body: file.buffer,
        })
        .promise();
      return {
        result: 'success',
        data: file.originalname,
      };
    } catch (error) {
      console.error('ERROR : ', error);
    }
  }
}
