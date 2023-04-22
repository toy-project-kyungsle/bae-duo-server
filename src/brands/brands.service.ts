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

  async setBrands(sentData: CreateBrandsDto): Promise<Brands> {
    const instance = await this.brandsRepository.save(sentData);
    if (!instance) {
      throw new NotFoundException(`브랜드 리스트를 생성할 수 없습니다.`);
    }
    return instance;
  }

  async getAllBrands(): Promise<Brands[]> {
    const found = await this.brandsRepository.find();
    if (!found) {
      throw new NotFoundException(`값을 찾을 수 없습니다.`);
    }
    return found;
  }

  async deleteBrand(id: number): Promise<number> {
    const affectedRowsCnt = (await this.brandsRepository.delete(id)).affected;
    if (affectedRowsCnt === 0)
      throw new NotFoundException(`삭제할 펀딩을 찾을 수 없습니다.`);
    return HttpStatus.ACCEPTED;
  }
}
