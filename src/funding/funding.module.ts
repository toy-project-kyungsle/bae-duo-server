import { Module } from '@nestjs/common';
import { FundingController } from './funding.controller';
import { FundingService } from './funding.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Funding } from './funding.entity';
import { Brands } from 'src/brands/brands.entity';
import { Uploads } from 'src/uploads/uploads.entity';
import { UploadsController } from 'src/uploads/uploads.controller';
import { UploadsService } from 'src/uploads/uploads.service';
import { SlackNoticeModule } from 'src/slack/slack.module';
import { SlackNoticeController } from 'src/slack/slack.controller';
import { SlackNoticeService } from 'src/slack/slack.service';

@Module({
  imports: [
    SlackNoticeModule,
    TypeOrmModule.forFeature([Funding, Brands, Uploads]),
  ],
  controllers: [FundingController, UploadsController, SlackNoticeController],
  providers: [FundingService, UploadsService, SlackNoticeService],
})
export class FundingModule {}
