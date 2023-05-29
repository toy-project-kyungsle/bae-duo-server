import { Module } from '@nestjs/common';
import { SlackNoticeController } from './slack.controller';
import { SlackNoticeService } from './slack.service';
import { SlackService, SlackModule } from 'nestjs-slack';

@Module({
  imports: [
    SlackModule.forRoot({
      type: 'api',
      token: '',
    }),
  ],
  controllers: [SlackNoticeController],
  providers: [SlackService, SlackNoticeService],
})
export class SlackNoticeModule {}
