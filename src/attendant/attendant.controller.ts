import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AttendantService } from './attendant.service';
import { Attendant } from './attendant.entity';
import { CreateAttendantDto } from './dto/create-attendant.dto';
import { AttendantMenuInfoService } from 'src/attendantMenuInfo/attendantMenuInfo.service';

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
    menuInfos.forEach((menuInfo) => (menuInfo['attendantId'] = result.id));
    const createdMenuInfo =
      await this.attendantMenuInfoService.saveAttendantMenuInfo(menuInfos);
    result['menuInfo'] = createdMenuInfo;
    return result;
  }

  @Get('/')
  async findAllAttendants(): Promise<Attendant[]> {
    return await this.attendantService.findAllAttendants();
  }

  @Get('/:userId')
  async findAttendantByUserId(
    @Param('userId') userId: number,
  ): Promise<Attendant> {
    return this.attendantService.findAttendantByUserId(userId);
  }

  // TODO patch 로직 짜기
  // @Patch('/:userId')
  // async updateAttendant(
  //   @Param('userId') userId: number,
  //   @Body() sentData: { menuInfo: string },
  // ): Promise<void> {
  //   const targetAttendant = await this.attendantService.findAttendantByUserId(
  //     userId,
  //   );

  //   return;
  // }

  @Delete('/:id')
  deleteAttendantById(@Param('id') id: number): Promise<number> {
    return this.attendantService.deleteAttendant(id);
  }
}
