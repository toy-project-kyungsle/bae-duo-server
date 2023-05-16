import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AttendantMenuInfoService } from './attendantMenuInfo.service';
import { CreateAttendantMenuInfoDto } from './attendantMenuInfo.dto';
import { attendantMenuInfoType } from './attendantMenuInfo.type';
import { AttendantService } from 'src/attendant/attendant.service';
import { FundingService } from 'src/funding/funding.service';

@Controller('attendantMenuInfo')
export class AttendantMenuInfoController {
  constructor(
    private attendantService: AttendantService,
    private attendantMenuInfoService: AttendantMenuInfoService,
    private fundingService: FundingService,
  ) {}

  @Post()
  async saveAttendantMenuInfo(@Body() sentData: CreateAttendantMenuInfoDto) {
    return this.attendantMenuInfoService.saveAttendantMenuInfo(sentData);
  }

  @Get('/')
  async findAllAttendantMenuInfo(): Promise<attendantMenuInfoType[]> {
    return this.attendantMenuInfoService.findAllAttendantMenuInfo();
  }

  @Get('/:attendantMenuInfoId')
  async findAttendantMenuInfosByAttendantId(
    @Param('attendantMenuInfoId') attendantMenuInfoId: number,
  ): Promise<attendantMenuInfoType> {
    return this.attendantMenuInfoService.findAttendantMenuInfosById(
      attendantMenuInfoId,
    );
  }

  @Delete('/:id')
  async deleteAttendantMenuInfoById(@Param('id') id: number): Promise<number> {
    const targetMunuInfo =
      await this.attendantMenuInfoService.findAttendantMenuInfosById(id);
    const targetAttendant = await this.attendantService.findAttendantById(
      targetMunuInfo.attendantId,
    );
    const targetFunding = await this.fundingService.findFundingById(
      targetAttendant.fundingId,
    );

    // menu의 가격에 맞게 funding의 curPrice를 낮추어줌
    targetFunding['curPrice'] -= targetMunuInfo.menuPrice;

    const putTargetFunding = await this.fundingService.updateFunding(
      targetFunding,
    );

    return this.attendantMenuInfoService.deleteAttendantMenuInfoById(id);
  }
}
