import { Module } from '@nestjs/common';
import { AttendantController } from './attendant.controller';
import { AttendantService } from './attendant.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendant } from './attendant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Attendant])],
  controllers: [AttendantController],
  providers: [AttendantService],
})
export class AttendantModule {}
