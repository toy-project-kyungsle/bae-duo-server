import { Injectable } from '@nestjs/common';
import { Funding, FundingStatus } from './funding.model';
import { CreateFundingDto } from './dto/create-funding.dto';
import { v1 as uuid } from 'uuid';

@Injectable()
export class FundingService {
  private funding: Funding[] = [];

  getAllFundings(): Funding[] {
    return this.funding;
  }

  createFunding(createFundingDto: CreateFundingDto) {
    const {
      funding_brand,
      funding_deadtime,
      funding_min_member,
      funding_price_ing,
      funding_stater,
      funding_total_price,
    } = createFundingDto;
    const funding: Funding = {
      id: uuid(),
      funding_stater,
      funding_brand,
      funding_total_price,
      funding_price_ing,
      funding_deadtime,
      funding_min_member,
      funding_status: FundingStatus.PUBLIC,
      created_at: Date(),
      updated_at: Date(),
    };
    this.funding.push(funding);
    return funding;
  }

  getFundingById(id: string): Funding {
    return this.funding.find((funding) => funding.id === id);
  }

  deletefunding(id: string): void {
    this.funding = this.funding.filter((funding) => funding.id !== id);
  }
}
