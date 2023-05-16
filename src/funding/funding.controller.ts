import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseInterceptors,
  Query,
} from '@nestjs/common';
// import { FundingStatus } from './funding.model';
import { FundingService } from './funding.service';
import { CreateFundingDto } from './dto/create-funding.dto';
import { Funding } from './funding.entity';
import { SearchFundingDto } from './dto/search-funding.dto';
import { UpdateFundingDto } from './dto/update-funding.dto';

@Controller('funding')
export class FundingController {
  constructor(private fundingService: FundingService) {}

  @Get('/')
  async findAllFundings(@Query() query: SearchFundingDto): Promise<Funding[]> {
    return this.fundingService.findAllFundings(query);
  }

  @Get('/:id')
  async findFundingById(@Param('id') id: number): Promise<Funding> {
    return this.fundingService.findFundingById(id);
  }

  @Post('/')
  async saveFunding(
    @Body() createFundingDto: CreateFundingDto,
  ): Promise<Funding> {
    return this.fundingService.saveFunding(createFundingDto);
  }

  @Put('/:id')
  async updateFunding(
    @Param('id') id: number,
    @Body() newFunding: UpdateFundingDto,
  ): Promise<void> {
    return this.fundingService.updateFunding(id, newFunding);
  }

  @Delete('/:id')
  async deleteFundingById(@Param('id') id: number): Promise<number> {
    return this.fundingService.deleteFundingById(id);
  }
}
