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
import { AttendantMenuInfoService } from 'src/attendantMenuInfo/attendantMenuInfo.service';

@Controller('attendant')
export class AttendantController {
  constructor(
    private attendantService: AttendantService,
    private attendantMenuInfoService: AttendantMenuInfoService,
  ) {}

  // convertStringToJSON = (string: string) => {
  //   const regex = /['`]/g;
  //   return string.replace(regex, '"');
  // };

  @Post()
  async saveAttendant(@Body() sentData: CreateAttendantDto) {
    return this.attendantService.saveAttendant(sentData);
  }

  @Get('/')
  async findAllAttendants(): Promise<Attendant[]> {
    const attendants = await this.attendantService.findAllAttendants();

    const getMenuInfoFromDB = async (attendantId: number) => {
      return await this.attendantMenuInfoService.findAttendantMenuInfosByAttendantId(
        attendantId,
      );
    };

    const getAttendantWithMenuInfo = async (attendants: Attendant[]) => {
      return await Promise.all(
        attendants.map(async (attendant) => {
          attendant['menuInfo'] = await getMenuInfoFromDB(attendant.id);
          return attendant;
        }),
      );
    };

    return getAttendantWithMenuInfo(attendants);
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

    return;
  }

  @Delete('/:id')
  deleteAttendantById(@Param('id') id: number): Promise<number> {
    return this.attendantService.deleteAttendant(id);
  }
}
