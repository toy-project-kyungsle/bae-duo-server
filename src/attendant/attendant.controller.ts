import { Body, Controller, Get, Post } from '@nestjs/common';
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
}
