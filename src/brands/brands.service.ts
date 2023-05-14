import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brands } from './brands.entity';
import { Repository } from 'typeorm';
import { CreateBrandsDto } from './dto/create-brand.dto';
import { UpdateBrandsDto } from './dto/update-brand.dto';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brands)
    private brandsRepository: Repository<Brands>,
  ) {}

  async saveBrand(sentData: CreateBrandsDto, file?: File): Promise<Brands> {
    if (file) {
      console.log('File');
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
}
