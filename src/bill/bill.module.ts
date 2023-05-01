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

@Module({
  imports: [
    AttendantModule,
    TypeOrmModule.forFeature([
      BillEntity,
      AttendantEntity,
      AttendantMenuInfoEntity,
    ]),
  ],
  controllers: [
    BillController,
    AttendantController,
    AttendantMenuInfoController,
  ],
  providers: [BillService, AttendantService, AttendantMenuInfoService],
})
export class BillModule {}
