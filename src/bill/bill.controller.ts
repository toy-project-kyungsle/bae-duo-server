import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { BillService } from './bill.service';
import { Bill } from './bill.entity';
import { CreateBillDto } from './dto/create-bill.dto';
import { Response } from 'express';

@Controller('bill')
export class BillController {
  constructor(private billService: BillService) {}

  @Post()
  async setBill(@Body() sentData: CreateBillDto) {
    return this.billService.setBill(sentData);
  }

  @Get('/')
  async getAllBills(): Promise<Bill[]> {
    return this.billService.getAllBills();
  }
}
