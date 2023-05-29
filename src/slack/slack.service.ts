import { Injectable } from '@nestjs/common';
import { SlackService } from 'nestjs-slack';
import { PostMessageType } from 'src/slack/slack.type';

@Injectable()
export class SlackNoticeService {
  constructor(private slackService: SlackService) {}

  async postMessage(messageInfo: PostMessageType) {
    const { text, channel } = messageInfo;
    await this.slackService.postMessage({
      text,
      channel,
    });
    return messageInfo;
  }
}
