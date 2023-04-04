import { Body, Controller, Get, Post } from '@nestjs/common';
import { BillService } from './bill.service';
import { Bill } from './bill.entity';
import { CreateBillDto } from './dto/create-bill.dto';

@Controller('bill')
export class BillController {
  constructor(private billService: BillService) {}

  @Post()
  async setBill(@Body() sentData: CreateBillDto) {
    this.billService.setBill(sentData);
    return;
  }

  @Get('/')
  async getAllBills(): Promise<Bill[]> {
    return this.billService.getAllBills();
  }
}
