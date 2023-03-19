import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { FundingModule } from './funding/funding.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MySqlConfigModule } from './db/config.module';
import { MySqlConfigService } from './db/config.service';

@Module({
  imports: [
    BoardsModule,
    FundingModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: `.env` }),
    TypeOrmModule.forRootAsync({
      imports: [MySqlConfigModule],
      useClass: MySqlConfigService,
      inject: [MySqlConfigService],
    }),
  ],
})
export class AppModule {}
