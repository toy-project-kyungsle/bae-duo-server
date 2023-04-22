import { Body, Controller, Get, Post, Delete, Param } from '@nestjs/common';
import { BillService } from './bill.service';
import { Bill } from './bill.entity';
import { CreateBillDto } from './dto/create-bill.dto';

@Controller('bill')
export class BillController {
  constructor(private billService: BillService) {}

  @Post()
  async saveBill(@Body() sentData: CreateBillDto) {
    return this.billService.saveBill(sentData);
  }

  @Get('/')
  async findAllBills(): Promise<Bill[]> {
    return this.billService.findAllBills();
  }

  @Delete('/:id')
  async deleteBillById(@Param('id') id: number): Promise<number> {
    return this.billService.deleteBill(id);
  }
}
