import { Module } from '@nestjs/common';
import { SlackNoticeController } from './slack.controller';
import { SlackNoticeService } from 'src/slack/slack.service';
import { SlackService } from 'nestjs-slack';

@Module({
  controllers: [SlackNoticeController],
  providers: [SlackService, SlackNoticeService],
})
export class SlackNoticeModule {}
