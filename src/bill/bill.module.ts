import { Module } from '@nestjs/common';
import { BillController } from './bill.controller';
import { BillService } from './bill.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bill as BillEntity } from './bill.entity';
import { AttendantModule } from 'src/attendant/attendant.module';
import { AttendantMenuInfo as AttendantMenuInfoEntity } from 'src/attendantMenuInfo/attendantMenuInfo.entity';
import { Attendant as AttendantEntity } from 'src/attendant/attendant.entity';
import { AttendantController } from 'src/attendant/attendant.controller';
import { AttendantMenuInfoController } from 'src/attendantMenuInfo/attendantMenuInfo.controller';
import { AttendantService } from 'src/attendant/attendant.service';
import { AttendantMenuInfoService } from 'src/attendantMenuInfo/attendantMenuInfo.service';
import { Funding as FundingEntity } from 'src/funding/funding.entity';
import { FundingController } from 'src/funding/funding.controller';
import { FundingService } from 'src/funding/funding.service';

@Module({
  imports: [
    AttendantModule,
    TypeOrmModule.forFeature([
      BillEntity,
      AttendantEntity,
      AttendantMenuInfoEntity,
      FundingEntity,
    ]),
  ],
  controllers: [
    BillController,
    AttendantController,
    AttendantMenuInfoController,
    FundingController,
  ],
  providers: [
    BillService,
    AttendantService,
    AttendantMenuInfoService,
    FundingService,
  ],
})
export class BillModule {}
