import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendantMenuInfoController } from './attendantMenuInfo.controller';
import { AttendantMenuInfoService } from './attendantMenuInfo.service';
import { AttendantMenuInfo as AttendantMenuInfoEntity } from './attendantMenuInfo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AttendantMenuInfoEntity])],
  controllers: [AttendantMenuInfoController],
  providers: [AttendantMenuInfoService],
})
export class AttendantMenuInfoModule {}
