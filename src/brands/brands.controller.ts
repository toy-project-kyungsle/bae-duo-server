import { Body, Controller, Get, Post, Delete, Param } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { Brands } from './brands.entity';
import { CreateBrandsDto } from './dto/create-brand.dto';

@Controller('brands')
export class BrandsController {
  constructor(private brandsService: BrandsService) {}

  @Post()
  async setBrands(@Body() sentData: CreateBrandsDto) {
    return this.brandsService.setBrands(sentData);
  }

  @Get('/')
  async getAllBrands(): Promise<Brands[]> {
    return this.brandsService.getAllBrands();
  }

  @Delete('/:id')
  async deleteFundingById(@Param('id') id: number): Promise<number> {
    return this.brandsService.deleteBrand(id);
  }
}
