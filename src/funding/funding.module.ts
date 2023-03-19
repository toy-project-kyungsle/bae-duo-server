import { Module } from '@nestjs/common';
import { FundingController } from './funding.controller';
import { FundingService } from './funding.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FundingRepository } from './funding.repository';

@Module({
  imports: [TypeOrmModule.forFeature([FundingRepository])],
  controllers: [FundingController],
  providers: [FundingService],
})
export class FundingModule {}
