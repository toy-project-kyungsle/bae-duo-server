import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Put,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { BrandsService } from './brands.service';
import { Brands } from './brands.entity';
import { CreateBrandsDto } from './dto/create-brand.dto';
import { UpdateBrandsDto } from './dto/update-brand.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('brands')
export class BrandsController {
  constructor(private brandsService: BrandsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async saveBrand(@UploadedFile() file, @Body() sentData: CreateBrandsDto) {
    return this.brandsService.saveBrand(sentData, file);
  }

  @Get('/')
  async findAllBrands(): Promise<Brands[]> {
    return this.brandsService.findAllBrands();
  }

  @Get('/:id')
  async findBrandById(@Param('id') id: number): Promise<Brands> {
    return this.brandsService.findBrandById(id);
  }

  @Put('/:id')
  @UseInterceptors(FileInterceptor('file'))
  async updateBrand(
    @UploadedFile() file,
    @Param('id') id: number,
    @Body() newBrand: UpdateBrandsDto,
  ): Promise<Brands> {
    return this.brandsService.updateBrand(id, newBrand, file);
  }

  @Delete('/:id')
  async deleteBrandById(@Param('id') id: number): Promise<number> {
    return this.brandsService.deleteBrand(id);
  }
}
