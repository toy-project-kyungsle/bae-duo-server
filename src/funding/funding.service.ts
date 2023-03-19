import { Injectable, NotFoundException } from '@nestjs/common';
import { FundingStatus } from './funding.model';
import { CreateFundingDto } from './dto/create-funding.dto';
import { v1 as uuid } from 'uuid';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { FundingRepository } from './funding.repository';
import { Funding } from './funding.entity';

@Injectable()
export class FundingService {
  constructor(
    @InjectRepository(FundingRepository)
    private fundingRepository: FundingRepository,
  ) {}

  async getFundingById(id: number): Promise<Funding> {
    const found = await this.fundingRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`값을 찾을 수 없습니다. : ${id}`);
    }
    return found;
  }

  // async getAllFundings(): Promise<Funding[]> {
  //   return this.funding;
  // }

  // createFunding(createFundingDto: CreateFundingDto) {
  //   const {
  //     brand,
  //     deadline,
  //     min_member,
  //     cur_price,
  //     starter,
  //     total_price,
  //     status,
  //   } = createFundingDto;
  //   const funding: Funding = {
  //     id: uuid(),
  //     starter,
  //     brand,
  //     total_price,
  //     cur_price,
  //     deadline,
  //     min_member,
  //     status,
  //     cur_member: 0,
  //   };
  //   this.funding.push(funding);
  //   return funding;
  // }

  // getFundingById(id: string): Funding {
  //   return this.funding.find((funding) => funding.id === id);
  // }

  // deletefunding(id: string): void {
  //   this.funding = this.funding.filter((funding) => funding.id !== id);
  // }
}
