import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateAttendantDto, UpdateAttendantDto } from './attendant.dto';
import { AttendantService } from './attendant.service';
import { AttendantType } from './attendant.type';
import { AttendantMenuInfoService } from 'src/attendantMenuInfo/attendantMenuInfo.service';
import { FundingService } from 'src/funding/funding.service';
import { attendantMenuInfoType } from 'src/attendantMenuInfo/attendantMenuInfo.type';
import { CreateAttendantMenuInfoDto } from 'src/attendantMenuInfo/attendantMenuInfo.dto';

@Controller('attendant')
export class AttendantController {
  constructor(
    private attendantService: AttendantService,
    private attendantMenuInfoService: AttendantMenuInfoService,
    private fundingService: FundingService,
  ) {}

  convertStringToJSON = (string: string) => {
    const regex = /['`]/g;
    return string.replace(regex, '"');
  };

  @Post()
  async saveAttendant(@Body() sentData: CreateAttendantDto) {
    const menuInfos: CreateAttendantMenuInfoDto[] = JSON.parse(
      this.convertStringToJSON(sentData.menuInfo),
    );
    const targetFunding = await this.fundingService.findFundingById(
      sentData.fundingId,
    );
    const result = await this.attendantService.saveAttendant(sentData);
    targetFunding['curMember'] += 1;
    menuInfos.forEach((menuInfo) => {
      menuInfo['attendantId'] = result.id;
      menuInfo['userId'] = result.userId;
      targetFunding['curPrice'] += menuInfo.menuPrice * menuInfo.count;
    });
    const putTargetFunding = await this.fundingService.updateFunding(
      targetFunding.id,
      targetFunding,
    );
    const createdMenuInfo =
      await this.attendantMenuInfoService.saveAttendantMenuInfos(menuInfos);
    result['menuInfo'] = createdMenuInfo;
    return result;
  }

  @Get('/')
  async findAllAttendants(): Promise<AttendantType[]> {
    return await this.attendantService.findAllAttendants();
  }

  @Get('/:attendantId')
  async findAttendantByUserId(
    @Param('attendantId') attendantId: number,
  ): Promise<AttendantType> {
    return this.attendantService.findAttendantById(attendantId);
  }

  @Get('/fundingId/:fundingId')
  async findAttendantsByFundingId(
    @Param('fundingId') fundingId: number,
  ): Promise<AttendantType[]> {
    return this.attendantService.findAttendantsByFundingId(fundingId);
  }

  @Put('/')
  async updateAttendant(
    @Body() newAttendantData: UpdateAttendantDto,
  ): Promise<AttendantType> {
    const targetFunding = await this.fundingService.findFundingById(
      newAttendantData.fundingId,
    );
    const menuInfos: attendantMenuInfoType[] = JSON.parse(
      this.convertStringToJSON(newAttendantData.menuInfo),
    );
    menuInfos.forEach((menuInfo) => {
      targetFunding['curPrice'] += menuInfo.menuPrice * menuInfo.count;
    });
    const putTargetFunding = await this.fundingService.updateFunding(
      targetFunding.id,
      targetFunding,
    );

    return this.attendantService.updateAttendant(newAttendantData, menuInfos);
  }

  @Delete('/:id')
  async deleteAttendantById(@Param('id') id: number): Promise<number> {
    const targetAttendantInfo = await this.attendantService.findAttendantById(
      id,
    );
    const targetFunding = await this.fundingService.findFundingById(
      targetAttendantInfo.fundingId,
    );
    const targetMenuInfos =
      await this.attendantMenuInfoService.findAttendantMenuInfosByAttendantId(
        id,
      );

    // 삭제하려는 메뉴의 가격로 funding의 curprice 낮추기
    targetMenuInfos.forEach((targetMenuInfo) => {
      targetFunding['curPrice'] -= targetMenuInfo.menuPrice;
    });
    const putTargetFunding = await this.fundingService.updateFunding(
      targetFunding.id,
      targetFunding,
    );
    return this.attendantService.deleteAttendant(id);
  }
}
