import { Module } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { UploadsController } from './uploads.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Uploads } from './uploads.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Uploads])],
  controllers: [UploadsController],
  providers: [UploadsService],
})
export class UploadsModule {}
