import { Body, Controller, Get, Post, Delete, Param } from '@nestjs/common';
import { SlackNoticeService } from './slack.service';

@Controller('slack')
export class SlackNoticeController {
  constructor(private slackService: SlackNoticeService) {}

  @Get('/')
  async helloWorld(): Promise<any> {
    this.slackService.helloWorldMethod();
    return null;
  }
}
