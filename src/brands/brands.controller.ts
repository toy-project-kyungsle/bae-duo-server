import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import { BrandsService } from './brands.service';
import { Brands } from './brands.entity';
import { CreateBrandsDto } from './dto/create-brand.dto';

@Controller('brands')
export class BrandsController {
  constructor(private brandsService: BrandsService) {}

  @Post()
  async saveBrand(@Body() sentData: CreateBrandsDto) {
    return this.brandsService.saveBrand(sentData);
  }

  @Get('/')
  async findAllBrands(): Promise<Brands[]> {
    return this.brandsService.findAllBrands();
  }

  @Get('/:id')
  async findBrandById(@Param('id') id: number): Promise<Brands> {
    return this.brandsService.findBrandById(id);
  }

  @Put('/')
  async updateBrand(@Body() newBrand: Brands): Promise<Brands> {
    return this.brandsService.updateBrand(newBrand);
  }

  @Delete('/:id')
  async deleteBrandById(@Param('id') id: number): Promise<number> {
    return this.brandsService.deleteBrand(id);
  }
}
