import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendantMenuInfoController } from './attendantMenuInfo.controller';
import { AttendantMenuInfoService } from './attendantMenuInfo.service';
import { AttendantMenuInfo as AttendantMenuInfoEntity } from './attendantMenuInfo.entity';

import { Funding as FundingEntity } from 'src/funding/funding.entity';
import { FundingController } from 'src/funding/funding.controller';
import { FundingService } from 'src/funding/funding.service';
import { Attendant as AttendantEntity } from 'src/attendant/attendant.entity';
import { AttendantController } from 'src/attendant/attendant.controller';
import { AttendantService } from 'src/attendant/attendant.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AttendantEntity]),
    TypeOrmModule.forFeature([AttendantMenuInfoEntity]),
    TypeOrmModule.forFeature([FundingEntity]),
  ],
  controllers: [
    AttendantController,
    AttendantMenuInfoController,
    FundingController,
  ],
  providers: [AttendantService, AttendantMenuInfoService, FundingService],
})
export class AttendantMenuInfoModule {}
