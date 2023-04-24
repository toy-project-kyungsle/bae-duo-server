import { Module } from '@nestjs/common';
import { BillController } from './bill.controller';
import { BillService } from './bill.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bill } from './bill.entity';
import { Attendant } from 'src/attendant/attendant.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Bill]),
    TypeOrmModule.forFeature([Attendant]),
  ],
  controllers: [BillController],
  providers: [BillService],
})
export class BillModule {}
