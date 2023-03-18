import { Injectable } from '@nestjs/common';
import { Funding } from './funding.model';
import { CreateFundingDto } from './dto/create-funding.dto';
import { v1 as uuid } from 'uuid';
import { createPool } from 'mysql2';
// import connection from 'src/db';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FundingService {
  constructor(private readonly configService: ConfigService) {}
  private funding: Funding[] = [];
  private connection = createPool({
    host: this.configService.get<string>('MYSQL_HOST'),
    user: this.configService.get<string>('MYSQL_USER'),
    port: this.configService.get<number>('MYSQL_PORT'),
    database: this.configService.get<string>('MYSQL_DATABASE'),
    password: this.configService.get<string>('MYSQL_PASSWORD'),
  }).promise();

  async getAllFundings(): Promise<Funding[]> {
    return this.connection
      .execute('SELECT * FROM funding')
      .then((result: [Funding[]]) => result[0]);
  }

  createFunding(createFundingDto: CreateFundingDto) {
    const {
      brand,
      deadline,
      min_member,
      cur_price,
      starter,
      total_price,
      status,
    } = createFundingDto;
    const funding: Funding = {
      id: uuid(),
      starter,
      brand,
      total_price,
      cur_price,
      deadline,
      min_member,
      status,
      cur_member: 0,
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
