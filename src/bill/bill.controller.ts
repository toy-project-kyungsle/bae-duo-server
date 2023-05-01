import { Body, Controller, Get, Post, Delete, Param } from '@nestjs/common';
import { BillService } from './bill.service';
import { CreateBillDto } from './dto/create-bill.dto';
import { billType } from './biil.type';

@Controller('bill')
export class BillController {
  constructor(private billService: BillService) {}

  @Post()
  async saveBill(@Body() sentData: CreateBillDto) {
    return this.billService.saveBill(sentData);
  }

  @Get('/')
  async findAllBills(): Promise<billType[]> {
    return this.billService.findAllBills();
  }

  @Get('/:id')
  async findBillById(@Param('id') id: number): Promise<billType> {
    return this.billService.findBillById(id);
  }

  @Delete('/:id')
  async deleteBillById(@Param('id') id: number): Promise<number> {
    return this.billService.deleteBill(id);
  }
}
