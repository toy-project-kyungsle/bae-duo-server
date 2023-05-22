import { NotFoundException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Uploads } from './uploads.entity';
import { Repository } from 'typeorm';
import { CreateUploadsDto } from '../brands/dto/create-uploads.dto';
import * as AWS from 'aws-sdk';

@Injectable()
export class UploadsService {
  constructor(
    @InjectRepository(Uploads)
    private uploadsRepository: Repository<Uploads>,
  ) {}

  async saveUploads(sentData: CreateUploadsDto): Promise<Uploads> {
    console.log('SENT', sentData);
    const instance = await this.uploadsRepository.save(sentData);
    if (!instance) {
      throw new NotFoundException(`업로드 리스트를 생성할 수 없습니다.`);
    }
    return instance;
  }

  async findUploadsById(name: string): Promise<Uploads> {
    const upload = await this.uploadsRepository.findOne({ where: { name } });
    if (!upload) throw new NotFoundException(`업로드 파일을 찾을 수 없습니다.`);
    return upload;
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    AWS.config.update({
      region: 'ap-northeast-2',
      accessKeyId: process.env.IAMAccess,
      secretAccessKey: process.env.IAMSecret,
    });
    try {
      const key = `${Date.now() + file.originalname}`;
      const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: key,
        Body: file.buffer,
        ContentType: 'image/jpeg',
        ACL: 'public-read',
      };
      await new AWS.S3().putObject(params).promise();

      const files = {
        createdId: key,
        name: file.originalname,
        extension: file.mimetype,
        size: file.size,
        url: `https://baeduo.s3.ap-northeast-2.amazonaws.com/${key}`,
      };

      console.log('files', file);
      await this.saveUploads(files);
      return files.url;
    } catch (error) {
      console.error('ERROR : ', error);
    }
    return '';
  }
}
