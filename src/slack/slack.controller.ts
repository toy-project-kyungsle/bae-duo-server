import { Body, Controller, Get, Post, Delete, Param } from '@nestjs/common';
import { SlackNoticeService } from 'src/slack/slack.service';
import { PostMessageDto } from 'src/slack/dto/post-message.dto';
import { PostMessageType } from 'src/slack/slack.type';

@Controller('slack')
export class SlackNoticeController {
  constructor(private slackService: SlackNoticeService) {}

  @Post('/message')
  async postMessage(
    @Body() sentData: PostMessageDto,
  ): Promise<PostMessageType> {
    return await this.slackService.postMessage(sentData);
  }
}
