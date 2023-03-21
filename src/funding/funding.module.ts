import { Module } from '@nestjs/common';
import { FundingController } from './funding.controller';
import { FundingService } from './funding.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Funding } from './funding.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Funding])],
  controllers: [FundingController],
  providers: [FundingService],
})
export class FundingModule {}
