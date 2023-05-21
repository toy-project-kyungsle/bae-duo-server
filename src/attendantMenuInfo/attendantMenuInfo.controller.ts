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
    return this.attendantMenuInfoService.findAttendantMenuInfoById(
      attendantMenuInfoId,
    );
  }

  @Delete('/:id')
  async deleteAttendantMenuInfoById(@Param('id') id: number): Promise<number> {
    const targetMunuInfo =
      await this.attendantMenuInfoService.findAttendantMenuInfoById(id);
    const menuInfosByAttendantId =
      await this.attendantMenuInfoService.findAttendantMenuInfosByAttendantId(
        targetMunuInfo.attendantId,
      );
    const targetAttendant = await this.attendantService.findAttendantById(
      targetMunuInfo.attendantId,
    );

    await this.lowerFundingPrice(
      targetAttendant.fundingId,
      targetMunuInfo.menuPrice,
      targetMunuInfo.count,
    );

    await this.deleteAttendantIfNeeded(
      menuInfosByAttendantId,
      targetMunuInfo.id,
      targetAttendant.id,
    );

    return this.attendantMenuInfoService.deleteAttendantMenuInfoById(id);
  }

  // menu의 가격에 맞게 funding의 curPrice를 낮추어줌
  async lowerFundingPrice(
    fundingId: number,
    menuPrice: number,
    menuCount: number,
  ) {
    const targetFunding = await this.fundingService.findFundingById(fundingId);

    targetFunding['curPrice'] -= menuPrice * menuCount;

    const putTargetFunding = await this.fundingService.updateFunding(
      targetFunding.id,
      targetFunding,
    );
  }

  // attendant ID를 가진 메뉴 인포들을 가져왔는데, 한 개이며 id가 같은 경우 삭제해야 함
  async deleteAttendantIfNeeded(
    menuInfos: attendantMenuInfoType[],
    menuInfoId: number,
    attendantId: number,
  ) {
    if (menuInfos.length === 1 && menuInfos[0].id === menuInfoId)
      await this.attendantService.deleteAttendant(attendantId);
  }
}
