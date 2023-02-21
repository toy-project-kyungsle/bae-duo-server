import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { Funding } from './funding.model';
import { FundingService } from './funding.service';
import { CreateFundingDto } from './dto/create-funding.dto';

@Controller('funding')
export class FundingController {
  constructor(private fundingService: FundingService) {}

  @Get('/')
  getAllFunding(): Funding[] {
    return this.fundingService.getAllFundings();
  }

  @Post()
  createFunding(@Body() createFundingDto: CreateFundingDto): Funding {
    return this.fundingService.createFunding(createFundingDto);
  }

  @Get('/:id')
  getFundingById(@Param('id') id: string): Funding {
    return this.fundingService.getFundingById(id);
  }
}
