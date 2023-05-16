import { Module } from '@nestjs/common';
import { FundingController } from './funding.controller';
import { FundingService } from './funding.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Funding } from './funding.entity';
import { Brands } from 'src/brands/brands.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Funding, Brands])],
  controllers: [FundingController],
  providers: [FundingService],
})
export class FundingModule {}
