import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brands } from './brands.entity';
import { Uploads } from './brands.uploads.entity';
import { Repository } from 'typeorm';
import { CreateBrandsDto } from './dto/create-brand.dto';
import { UpdateBrandsDto } from './dto/update-brand.dto';
//import * as AWS from 'aws-sdk';

//const s3 = new AWS.S3({ useAccelerateEndpoint: true });

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brands)
    private brandsRepository: Repository<Brands>,
  ) {}

  async saveBrand(sentData: CreateBrandsDto, file: any): Promise<Brands> {
    if (file) {
      // AWS.config.update({
      //   region: 'ap-northeast-2',
      //   credentials: {
      //     accessKeyId: process.env.IAMAccess,
      //     secretAccessKey: process.env.IAMSecret,
      //   },
      // });
      // try {
      //   const params = {
      //     Bucket: process.env.BUCKET_NAME,
      //     Key: `${Date.now() + file.originalname}`,
      //     Body: file.buffer,
      //     ContentType: 'image/jpeg',
      //     ACL: 'public-read',
      //   };
      //   await new AWS.S3().putObject(params).promise();
      //   const s3Url = await s3.getSignedUrlPromise('putObject', params);
      //   file.url = s3Url;
      //   file.createdId = `${Date.now() + file.originalname}`;
      //   this.saveUploads(file);
      //   return  file.originalname
      // } catch (error) {
      //   console.error('ERROR : ', error);
      // }
    }

    const instance = await this.brandsRepository.save({
      ...sentData,
      brandImage: '',
    });

    if (!instance) {
      throw new NotFoundException(`브랜드 리스트를 생성할 수 없습니다.`);
    }

    return instance;
  }

  async findAllBrands(): Promise<Brands[]> {
    const brands = await this.brandsRepository.find();
    if (!brands) {
      throw new NotFoundException(`브랜드 리스트를 찾을 수 없습니다.`);
    }

    return brands;
  }

  async findBrandById(id: number): Promise<Brands> {
    const brand = await this.brandsRepository.findOne({
      where: { id },
      relations: ['upload'],
    });
    if (!brand) {
      throw new NotFoundException(`브랜드 리스트를 찾을 수 없습니다.`);
    }
    return brand;
  }

  async updateBrand(
    id: number,
    sentData: UpdateBrandsDto,
    file?: File,
  ): Promise<Brands> {
    if (file) {
      console.log('File');
    }

    const brand = await this.brandsRepository.findOne({
      where: { id },
    });
    if (!brand) {
      throw new NotFoundException(`브랜드 리스트를 찾을 수 없습니다.`);
    }

    if (brand.createdUserId !== Number(sentData.createdUserId)) {
      throw new NotFoundException(`브랜드를 만든 사용자만 수정할 수 있습니다.`);
    }

    Object.keys(sentData).forEach((key) => {
      if (['id', 'createdUserId', 'createdAt', 'file'].includes(key)) return;
      brand[key] = sentData[key];
    });
    await this.brandsRepository.update(id, brand);
    return brand;
  }

  async deleteBrand(id: number): Promise<number> {
    const affectedRowsCnt = (await this.brandsRepository.delete(id)).affected;
    if (affectedRowsCnt === 0) {
      throw new NotFoundException(`삭제할 브랜드 리스트를 찾을 수 없습니다.`);
    }
    return HttpStatus.ACCEPTED;
  }

  // async saveUploads(sentData: File): Promise<Uploads> {
  //   console.log('SENT', sentData);
  //   const instance = await this.uploadsRepository.save(sentData);
  //   if (!instance) {
  //     throw new NotFoundException(`업로드 리스트를 생성할 수 없습니다.`);
  //   }
  //   return instance;
  // }

  // async findUploadsById(name: string): Promise<Uploads> {
  //   const upload = await this.uploadsRepository.findOne({ where: { name } });
  //   if (!upload) throw new NotFoundException(`업로드 파일을 찾을 수 없습니다.`);
  //   return upload;
  // }
}
