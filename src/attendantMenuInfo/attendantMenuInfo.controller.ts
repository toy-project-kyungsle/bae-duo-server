import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AttendantMenuInfoService } from './attendantMenuInfo.service';
import { CreateAttendantMenuInfoDto } from './attendantMenuInfo.dto';
import { attendantMenuInfoType } from './attendantMenuInfo.type';

@Controller('attendantMenuInfo')
export class AttendantMenuInfoController {
  constructor(private attendantMenuInfoService: AttendantMenuInfoService) {}

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
  deleteAttendantMenuInfoById(@Param('id') id: number): Promise<number> {
    return this.attendantMenuInfoService.deleteAttendantMenuInfoById(id);
  }
}
