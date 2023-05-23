import { Body, Controller, Get, Post, Delete, Param } from '@nestjs/common';
import { BillService } from './bill.service';
import { CreateBillDto } from './bill.dto';
import { billType } from './biil.type';
import { FundingService } from 'src/funding/funding.service';
import { FundingStatus } from 'src/funding/funding.model';

@Controller('bill')
export class BillController {
  constructor(
    private billService: BillService,
    private fundingService: FundingService,
  ) {}

  @Post()
  async saveBill(@Body() sentData: CreateBillDto) {
    const targetFunding = await this.fundingService.findFundingById(
      sentData.fundingId,
    );
    targetFunding.status = FundingStatus.SUCCESS;
    this.fundingService.updateFunding(targetFunding.id, targetFunding);
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

  @Get('/fundingId/:fundingId')
  async findBillByFundingId(
    @Param('fundingId') fundingId: number,
  ): Promise<billType> {
    return this.billService.findBillByfundingId(fundingId);
  }

  @Delete('/:id')
  async deleteBillById(@Param('id') id: number): Promise<number> {
    return this.billService.deleteBillById(id);
  }

  @Delete('/fundingId/:fundingId')
  async deleteBillByFundingId(
    @Param('fundingId') fundingId: number,
  ): Promise<number> {
    return this.billService.deleteBillById(fundingId);
  }
}
