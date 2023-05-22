import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brands } from './brands.entity';
import { Repository } from 'typeorm';
import { CreateBrandsDto } from './dto/create-brand.dto';
import { UpdateBrandsDto } from './dto/update-brand.dto';
import { UploadsService } from 'src/uploads/uploads.service';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brands)
    private brandsRepository: Repository<Brands>,
    private uploadsService: UploadsService,
  ) {}

  async saveBrand(
    sentData: CreateBrandsDto,
    file: Express.Multer.File,
  ): Promise<Brands> {
    const fileUrl = file ? await this.uploadsService.uploadFile(file) : null;

    const instance = await this.brandsRepository.save({
      ...sentData,
      brandImage: fileUrl,
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
    file?: Express.Multer.File,
  ): Promise<Brands> {
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

    brand.brandImage = file
      ? await this.uploadsService.uploadFile(file)
      : brand.brandImage;

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
}
