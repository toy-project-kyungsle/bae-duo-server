import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
// import { FundingStatus } from './funding.model';
import { FundingService } from './funding.service';
import { CreateFundingDto } from './dto/create-funding.dto';
import { Funding } from './funding.entity';

@Controller('funding')
export class FundingController {
  constructor(private fundingService: FundingService) {}

  @Get('/:id')
  async findFundingById(@Param('id') id: number): Promise<Funding> {
    return this.fundingService.findFundingById(id);
  }

  @Get('/')
  async getAllFunding(): Promise<Funding[]> {
    return this.fundingService.findAllFundings();
  }

  @Post('/')
  async createFunding(
    @Body() createFundingDto: CreateFundingDto,
  ): Promise<Funding> {
    return this.fundingService.saveFunding(createFundingDto);
  }

  @Delete('/:id')
  async deleteFundingById(@Param('id') id: number): Promise<number> {
    return this.fundingService.deleteFunding(id);
  }
}
