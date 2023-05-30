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
    const fileInfo = file ? await this.uploadsService.uploadFile(file) : null;

    const instance = await this.brandsRepository.save({
      ...sentData,
      imageId: fileInfo?.id || null,
    });

    if (!instance) {
      throw new NotFoundException(`브랜드 리스트를 생성할 수 없습니다.`);
    }

    return instance;
  }

  async findAllBrands() {
    const brands = await this.brandsRepository.find({
      where: {
        isDeleted: 0,
      },
      relations: ['uploads'],
    });
    if (!brands) {
      throw new NotFoundException(`브랜드 리스트를 찾을 수 없습니다.`);
    }

    return brands.map((brand) => ({
      id: brand.id,
      createdUserId: brand.createdUserId,
      name: brand.name,
      orderType: brand.orderType,
      orderCnt: brand.orderCnt,
      imageId: brand.uploads?.id || null,
      brandImage: brand.uploads?.url || null,
      defaultDeadLine: brand.defaultDeadLine,
      defaultMinPrice: brand.defaultMinPrice,
      defaultMinMember: brand.defaultMinMember,
      createdAt: brand.createdAt,
    }));
  }

  async findBrandById(id: number) {
    const brand = await this.brandsRepository.findOne({
      where: { id },
      relations: ['uploads'],
    });
    if (!brand) {
      throw new NotFoundException(`브랜드를 찾을 수 없습니다.`);
    }
    return {
      id: brand.id,
      createdUserId: brand.createdUserId,
      name: brand.name,
      orderType: brand.orderType,
      orderCnt: brand.orderCnt,
      imageId: brand.uploads?.id || null,
      brandImage: brand.uploads?.url || null,
      defaultDeadLine: brand.defaultDeadLine,
      defaultMinPrice: brand.defaultMinPrice,
      defaultMinMember: brand.defaultMinMember,
      createdAt: brand.createdAt,
    };
  }

  async updateBrand(
    id: number,
    sentData: UpdateBrandsDto,
    file?: Express.Multer.File,
  ): Promise<Brands> {
    const brand = await this.brandsRepository.findOne({
      where: { id },
      relations: ['uploads'],
    });

    if (!brand) {
      throw new NotFoundException(`브랜드를 찾을 수 없습니다.`);
    }

    if (brand.createdUserId !== Number(sentData.createdUserId)) {
      throw new NotFoundException(`브랜드를 만든 사용자만 수정할 수 있습니다.`);
    }

    if (file) {
      await this.uploadsService.deleteUploads(brand.id);
      const fileInfo = await this.uploadsService.uploadFile(file);
      brand.imageId = fileInfo.id;
    }

    Object.keys(sentData).forEach((key) => {
      if (['id', 'createdUserId', 'createdAt', 'file'].includes(key)) return;
      brand[key] = sentData[key];
    });

    await this.brandsRepository.update(id, brand);
    return brand;
  }

  async deleteBrand(id: number): Promise<number> {
    const brand = await this.brandsRepository.findOne({
      where: { id },
    });
    if (!brand) {
      throw new NotFoundException(`브랜드를 찾을 수 없습니다.`);
    }

    brand.isDeleted = 1;
    await this.brandsRepository.update(id, brand);

    return HttpStatus.ACCEPTED;
  }
}
