import { Controller, Get } from '@nestjs/common';
import { BillService } from './bill.service';
import { Bill } from './bill.entity';

@Controller('bill')
export class BillController {
  constructor(private billService: BillService) {}

  @Get('/')
  async getAllFunding(): Promise<Bill[]> {
    return this.billService.getAllFundings();
  }
}
