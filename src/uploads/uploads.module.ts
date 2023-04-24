import { Module } from '@nestjs/common';
import UploadsController from './uploads.controller';

@Module({
  //imports: [UploadsController],
  controllers: [UploadsController],
})
export class UploadsModule {}
