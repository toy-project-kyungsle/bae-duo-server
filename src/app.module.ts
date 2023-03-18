import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { FundingModule } from './funding/funding.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    BoardsModule,
    FundingModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: `.env` }),
  ],
})
export class AppModule {}
