import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
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
  async findAllFundings(): Promise<Funding[]> {
    return this.fundingService.findAllFundings();
  }

  @Post('/')
  async saveFunding(
    @Body() createFundingDto: CreateFundingDto,
  ): Promise<Funding> {
    return this.fundingService.saveFunding(createFundingDto);
  }

  @Put('/')
  async updateFunding(@Body() newFunding: Funding): Promise<Funding> {
    return this.fundingService.updateFunding(newFunding);
  }

  @Delete('/:id')
  async deleteFundingById(@Param('id') id: number): Promise<number> {
    return this.fundingService.deleteFundingById(id);
  }
}
