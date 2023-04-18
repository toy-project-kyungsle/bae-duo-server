import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AttendantService } from './attendant.service';
import { Attendant } from './attendant.entity';
import { CreateAttendantDto } from './dto/create-attendant.dto';

@Controller('attendant')
export class AttendantController {
  constructor(private attendantService: AttendantService) {}

  convertStringToJSON = (string: string) => {
    const regex = /['`]/g;
    return string.replace(regex, '"');
  };

  @Post()
  async setAttendant(@Body() sentData: CreateAttendantDto) {
    sentData.menuInfo = this.convertStringToJSON(sentData.menuInfo);
    return this.attendantService.setAttendant(sentData);
  }

  @Get('/')
  async getAllAttendants(): Promise<Attendant[]> {
    return this.attendantService.getAllAttendants();
  }

  @Get('/:userId')
  async getAttendantByUserId(
    @Param('userId') userId: number,
  ): Promise<Attendant> {
    return this.attendantService.getAttendantByUserId(userId);
  }

  @Patch('/:userId')
  async updateAttendant(
    @Param('userId') userId: number,
    @Body() sentData: { menuInfo: string },
  ): Promise<void> {
    const targetAttendant = await this.attendantService.getAttendantByUserId(
      userId,
    );
    const originMenuInfo = JSON.parse(targetAttendant.menuInfo);
    const newMenuInfo = JSON.parse(this.convertStringToJSON(sentData.menuInfo));

    // TODO origin과 new 데이터를 가지고 update 로직 짜야함
    console.log(originMenuInfo, newMenuInfo);
    // this.attendantService.updateAttendant(userId);
    return;
  }

  @Delete('/:id')
  deleteAttendantById(@Param('id') id: number): Promise<number> {
    return this.attendantService.removeAttendant(id);
  }
}
