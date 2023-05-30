import {
  NotFoundException,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Uploads } from './uploads.entity';
import { Repository } from 'typeorm';
import { CreateUploadsDto } from '../brands/dto/create-uploads.dto';
import * as AWS from 'aws-sdk';
import { UploadsDto } from './dto/uploads.dto';

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

  async findUploadsById(id: number): Promise<Uploads> {
    const upload = await this.uploadsRepository.findOne({ where: { id } });
    if (!upload) throw new NotFoundException(`업로드 파일을 찾을 수 없습니다.`);
    return upload;
  }

  async findUploadsListByIds(ids: number[]): Promise<Uploads[]> {
    const uploadList = await this.uploadsRepository.find({
      where: ids.map((id) => ({
        id,
      })),
    });
    if (!uploadList)
      throw new NotFoundException(`업로드 파일을 찾을 수 없습니다.`);
    return uploadList;
  }

  async deleteUploads(id: number) {
    const file = await this.findUploadsById(id);
    file.isDeleted = 1;
    const uploads = await this.uploadsRepository.update(id, file);
    return uploads;
  }

  async uploadFile(file: Express.Multer.File): Promise<UploadsDto> {
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

      const uploads = await this.saveUploads(files);

      return {
        id: uploads.id,
        url: files.url,
      };
    } catch (error) {
      console.error('ERROR : ', error);
      throw new BadRequestException(error);
    }
  }

  async uploadFileWithFundingId(
    file: Express.Multer.File,
    fundingId: number,
  ): Promise<UploadsDto> {
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
        fundingId,
      };

      const uploads = await this.saveUploads(files);

      return {
        id: uploads.id,
        url: files.url,
      };
    } catch (error) {
      console.error('ERROR : ', error);
      throw new BadRequestException(error);
    }
  }
}
