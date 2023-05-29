import { Injectable } from '@nestjs/common';
import { SlackService } from 'nestjs-slack';

@Injectable()
export class SlackNoticeService {
  constructor(private slackService: SlackService) {}

  helloWorldMethod() {
    this.slackService.sendText('Hello world was sent!');
    return 'hello world';
  }
}
