import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { Funding } from './funding.model';
import { FundingService } from './funding.service';
import { CreateFundingDto } from './dto/create-funding.dto';

@Controller('funding')
export class FundingController {
  constructor(private fundingService: FundingService) {}

  @Get('/')
  async getAllFunding(@Res() res): Promise<void> {
    const data = await this.fundingService.getAllFundings();
    res.json(data);
  }

  @Post()
  createFunding(@Body() createFundingDto: CreateFundingDto): Funding {
    return this.fundingService.createFunding(createFundingDto);
  }

  @Get('/:id')
  getFundingById(@Param('id') id: string): Funding {
    return this.fundingService.getFundingById(id);
  }

  @Delete('/:id')
  deleteFunding(@Param('id') id: string): void {
    this.fundingService.deletefunding(id);
  }
}
