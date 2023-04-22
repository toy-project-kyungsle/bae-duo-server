import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendantMenuInfoController } from './attendantMenuInfo.controller';
import { AttendantMenuInfoService } from './attendantMenuInfo.service';
import { AttendantMenuInfo } from './attendantMenuInfo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AttendantMenuInfo])],
  controllers: [AttendantMenuInfoController],
  providers: [AttendantMenuInfoService],
})
export class AttendantMenuInfoModule {}
