import { Module } from '@nestjs/common';
import { AttendantController } from './attendant.controller';
import { AttendantService } from './attendant.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendant as AttendantEntity } from './attendant.entity';
import { AttendantMenuInfoService } from 'src/attendantMenuInfo/attendantMenuInfo.service';
import { AttendantMenuInfoController } from 'src/attendantMenuInfo/attendantMenuInfo.controller';
import { AttendantMenuInfo as AttendantMenuInfoEntity } from 'src/attendantMenuInfo/attendantMenuInfo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AttendantEntity]),
    TypeOrmModule.forFeature([AttendantMenuInfoEntity]),
  ],
  controllers: [AttendantController, AttendantMenuInfoController],
  providers: [AttendantService, AttendantMenuInfoService],
})
export class AttendantModule {}
