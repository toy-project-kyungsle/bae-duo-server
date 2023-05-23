import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FundingService } from './funding.service';
import { CreateFundingDto } from './dto/create-funding.dto';
import { Funding } from './funding.entity';
import { SearchFundingDto } from './dto/search-funding.dto';
import { UpdateFundingDto } from './dto/update-funding.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FundingDto } from './dto/funding.dto';

@Controller('funding')
export class FundingController {
  constructor(private fundingService: FundingService) {}

  @Get('/')
  async findAllFundings(@Query() query: SearchFundingDto) {
    return this.fundingService.findAllFundings(query);
  }

  @Get('/:id')
  async findFundingById(@Param('id') id: number): Promise<FundingDto> {
    return this.fundingService.findFundingResById(id);
  }

  @Post('/')
  @UseInterceptors(FilesInterceptor('files'))
  async saveFunding(
    @UploadedFiles() files,
    @Body() createFundingDto: CreateFundingDto,
  ): Promise<Funding> {
    return this.fundingService.saveFunding(createFundingDto, files);
  }

  @Put('/:id')
  @UseInterceptors(FilesInterceptor('files'))
  async updateFunding(
    @UploadedFiles() files,
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
