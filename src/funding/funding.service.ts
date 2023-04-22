import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
// import { FundingStatus } from './funding.model';
// import { CreateFundingDto } from './dto/create-funding.dto';
// import { v1 as uuid } from 'uuid';
// import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
// import { FundingRepository } from './funding.repository';
import { Funding } from './funding.entity';
import { Repository } from 'typeorm';
import { CreateFundingDto } from './dto/create-funding.dto';

@Injectable()
export class FundingService {
  constructor(
    @InjectRepository(Funding)
    private fundingRepository: Repository<Funding>,
  ) {}

  async findFundingById(id: number): Promise<Funding> {
    const found = await this.fundingRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`펀딩을 찾을 수 없습니다. : ${id}`);
    }
    return found;
  }

  async findAllFundings(): Promise<Funding[]> {
    const found = await this.fundingRepository.find();
    if (!found) {
      throw new NotFoundException(`펀딩을 불러올 수 없습니다.`);
    }
    return found;
  }

  async saveFunding(sentData: CreateFundingDto): Promise<Funding> {
    const instance = await this.fundingRepository.save(sentData);
    if (!instance) {
      throw new NotFoundException(`펀딩을 생성할 수 없습니다.`);
    }
    return instance;
  }

  async deleteFunding(id: number): Promise<number> {
    const affectedRowsCnt = (await this.fundingRepository.delete(id)).affected;
    if (affectedRowsCnt === 0)
      throw new NotFoundException(`삭제할 펀딩을 찾을 수 없습니다.`);
    return HttpStatus.ACCEPTED;
  }
}
