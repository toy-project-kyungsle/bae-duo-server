import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { FundingModule } from './funding/funding.module';

@Module({
  imports: [BoardsModule, FundingModule],
})
export class AppModule {}
