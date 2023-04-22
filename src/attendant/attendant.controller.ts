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
  async saveAttendant(@Body() sentData: CreateAttendantDto) {
    sentData.menuInfo = this.convertStringToJSON(sentData.menuInfo);
    return this.attendantService.saveAttendant(sentData);
  }

  @Get('/')
  async findAllAttendants(): Promise<Attendant[]> {
    return this.attendantService.findAllAttendants();
  }

  @Get('/:userId')
  async findAttendantByUserId(
    @Param('userId') userId: number,
  ): Promise<Attendant> {
    return this.attendantService.findAttendantByUserId(userId);
  }

  @Patch('/:userId')
  async updateAttendant(
    @Param('userId') userId: number,
    @Body() sentData: { menuInfo: string },
  ): Promise<void> {
    const targetAttendant = await this.attendantService.findAttendantByUserId(
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
    return this.attendantService.deleteAttendant(id);
  }
}
