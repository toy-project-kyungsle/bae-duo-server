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
    const menuInfos = JSON.parse(this.convertStringToJSON(sentData.menuInfo));
    const targetFunding = await this.fundingService.findFundingById(
      sentData.fundingId,
    );
    const result = await this.attendantService.saveAttendant(sentData);
    targetFunding['curMember'] += 1;
    menuInfos.forEach((menuInfo) => {
      menuInfo['attendantId'] = result.id;
      menuInfo['userId'] = result.userId;
      targetFunding['curPrice'] += menuInfo.menuPrice;
    });
    const putTargetFunding = await this.fundingService.updateFunding(
      targetFunding,
    );
    const createdMenuInfo =
      await this.attendantMenuInfoService.saveAttendantMenuInfo(menuInfos);
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

  // TODO patch 로직 짜기
  @Put('/')
  async updateAttendant(
    @Body() newAttendantData: UpdateAttendantDto,
  ): Promise<AttendantType> {
    const targetFunding = await this.fundingService.findFundingById(
      newAttendantData.fundingId,
    );
    const targetIds = [];
    const menuInfos = JSON.parse(
      this.convertStringToJSON(newAttendantData.menuInfo),
    );
    menuInfos.forEach((menuInfo) => {
      targetIds.push(menuInfo.id);
    });
    const originMenuInfos =
      await this.attendantMenuInfoService.findAttendantMenuInfosByIds(
        targetIds,
      );

    // 기존 메뉴 가격을 빼고 새로운 가격으로 펀딩을 채우기
    originMenuInfos.forEach((originMenuInfo) => {
      targetFunding['curPrice'] -= originMenuInfo.menuPrice;
    });
    menuInfos.forEach((menuInfo) => {
      targetFunding['curPrice'] += menuInfo.menuPrice;
    });

    const putTargetFunding = await this.fundingService.updateFunding(
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
      targetFunding,
    );
    return this.attendantService.deleteAttendant(id);
  }
}
