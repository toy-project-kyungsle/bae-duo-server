import { Injectable, NotFoundException } from '@nestjs/common';
// import { FundingStatus } from './funding.model';
// import { CreateFundingDto } from './dto/create-funding.dto';
// import { v1 as uuid } from 'uuid';
// import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
// import { FundingRepository } from './funding.repository';
import { Funding } from './funding.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FundingService {
  constructor(
    @InjectRepository(Funding)
    private fundingRepository: Repository<Funding>,
  ) {}

  async getFundingById(id: number): Promise<Funding> {
    const found = await this.fundingRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`값을 찾을 수 없습니다. : ${id}`);
    }
    return found;
  }

  async getAllFundings(): Promise<Funding[]> {
    const found = await this.fundingRepository.find();
    if (!found) {
      throw new NotFoundException(`값을 찾을 수 없습니다.`);
    }
    return found;
  }
}
