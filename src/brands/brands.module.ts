import { Module } from '@nestjs/common';
import { BrandsController } from './brands.controller';
import { BrandsService } from './brands.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brands } from './brands.entity';
import { UploadsService } from 'src/uploads/uploads.service';
import { Uploads } from 'src/uploads/uploads.entity';
import { UploadsController } from 'src/uploads/uploads.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Brands]),
    TypeOrmModule.forFeature([Uploads]),
  ],
  controllers: [BrandsController, UploadsController],
  providers: [BrandsService, UploadsService],
})
export class BrandsModule {}
