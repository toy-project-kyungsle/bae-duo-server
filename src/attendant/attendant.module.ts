import { Module } from '@nestjs/common';
import { AttendantController } from './attendant.controller';
import { AttendantService } from './attendant.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendant } from './attendant.entity';
import { AttendantMenuInfoService } from 'src/attendantMenuInfo/attendantMenuInfo.service';
import { AttendantMenuInfoController } from 'src/attendantMenuInfo/attendantMenuInfo.controller';
import { AttendantMenuInfo } from 'src/attendantMenuInfo/attendantMenuInfo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Attendant]),
    TypeOrmModule.forFeature([AttendantMenuInfo]),
  ],
  controllers: [AttendantController, AttendantMenuInfoController],
  providers: [AttendantService, AttendantMenuInfoService],
})
export class AttendantModule {}
