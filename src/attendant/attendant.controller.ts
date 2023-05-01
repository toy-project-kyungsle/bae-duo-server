import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AttendantService } from './attendant.service';
import { CreateAttendantDto } from './dto/create-attendant.dto';
import { AttendantMenuInfoService } from 'src/attendantMenuInfo/attendantMenuInfo.service';
import { AttendantType } from './attendant.type';

@Controller('attendant')
export class AttendantController {
  constructor(
    private attendantService: AttendantService,
    private attendantMenuInfoService: AttendantMenuInfoService,
  ) {}

  convertStringToJSON = (string: string) => {
    const regex = /['`]/g;
    return string.replace(regex, '"');
  };

  @Post()
  async saveAttendant(@Body() sentData: CreateAttendantDto) {
    const menuInfos = JSON.parse(this.convertStringToJSON(sentData.menuInfo));
    const result = await this.attendantService.saveAttendant(sentData);
    menuInfos.forEach((menuInfo) => {
      menuInfo['attendantId'] = result.id;
      menuInfo['userId'] = result.userId;
    });
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

  // TODO patch 로직 짜기
  @Put('/')
  async updateAttendant(@Body() sentData): Promise<AttendantType> {
    const menuInfos = JSON.parse(this.convertStringToJSON(sentData.menuInfo));
    return this.attendantService.updateAttendant(sentData, menuInfos);
  }

  @Delete('/:id')
  deleteAttendantById(@Param('id') id: number): Promise<number> {
    return this.attendantService.deleteAttendant(id);
  }
}
