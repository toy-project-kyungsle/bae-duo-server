import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AttendantService } from './attendant.service';
import { Attendant } from './attendant.entity';
import { CreateAttendantDto } from './dto/create-attendant.dto';

@Controller('attendant')
export class AttendantController {
  constructor(private attendantService: AttendantService) {}

  @Post()
  async setAttendant(@Body() sentData: CreateAttendantDto) {
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
  async updateAttendant(@Param('userId') userId: number): Promise<void> {
    // this.attendantService.updateAttendant(userId);
    return;
  }
}
