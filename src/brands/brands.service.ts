import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brands } from './brands.entity';
import { Repository } from 'typeorm';
import { CreateBrandsDto } from './dto/create-brand.dto';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brands)
    private brandsRepository: Repository<Brands>,
  ) {}

  async saveBrand(sentData: CreateBrandsDto): Promise<Brands> {
    const instance = await this.brandsRepository.save(sentData);
    if (!instance) {
      throw new NotFoundException(`브랜드 리스트를 생성할 수 없습니다.`);
    }
    return instance;
  }

  async findAllBrands(): Promise<Brands[]> {
    const brands = await this.brandsRepository.find();
    if (!brands)
      throw new NotFoundException(`브랜드 리스트를 찾을 수 없습니다.`);

    return brands;
  }

  async findBrandById(id: number): Promise<Brands> {
    const brand = await this.brandsRepository.findOne({ where: { id },relations: ['upload'] } );
    if (!brand)
      throw new NotFoundException(`브랜드 리스트를 찾을 수 없습니다.`);
    return brand;
  }

  async updateBrand(newBrand: Brands): Promise<Brands> {
    const brand = await this.brandsRepository.findOne({
      where: { id: newBrand.id },
    });
    if (!brand)
      throw new NotFoundException(`브랜드 리스트를 찾을 수 없습니다.`);
    Object.keys(newBrand).forEach((key) => {
      if (key === 'id' || key === 'createdId' || key === 'createdAt') return;
      brand[key] = newBrand[key];
    });
    return brand;
  }

  async deleteBrand(id: number): Promise<number> {
    const affectedRowsCnt = (await this.brandsRepository.delete(id)).affected;
    if (affectedRowsCnt === 0)
      throw new NotFoundException(`삭제할 브랜드 리스트를 찾을 수 없습니다.`);
    return HttpStatus.ACCEPTED;
  }
}
