import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Attendant as AttendantEntity } from './attendant.entity';
import { Repository } from 'typeorm';
import { CreateAttendantDto, UpdateAttendantDto } from './attendant.dto';
import { AttendantMenuInfoService } from 'src/attendantMenuInfo/attendantMenuInfo.service';
import { AttendantType } from './attendant.type';
import { attendantMenuInfoType } from 'src/attendantMenuInfo/attendantMenuInfo.type';

@Injectable()
export class AttendantService {
  constructor(
    @InjectRepository(AttendantEntity)
    private attendantRepository: Repository<AttendantEntity>,
    private attendantMenuInfoService: AttendantMenuInfoService,
  ) {}

  async saveAttendant(sentData: CreateAttendantDto): Promise<AttendantEntity> {
    const result = await this.attendantRepository.save(sentData);
    if (!result) throw new NotFoundException(`참석 정보를 추가할 수 없습니다.`);
    return result;
  }

  async findAttendantById(id: number): Promise<AttendantType> {
    const attendant = await this.attendantRepository.findOne({
      where: { id },
    });
    if (!attendant)
      throw new NotFoundException(`참석 정보를 찾을 수 없습니다.`);
    return this.getAttendantWithMenuInfo(attendant);
  }

  async findAllAttendants(): Promise<AttendantType[]> {
    const attendants = await this.attendantRepository.find();
    if (!attendants)
      throw new NotFoundException(`참석 정보를 찾을 수 없습니다.`);

    return this.getAttendantsWithMenuInfo(attendants);
  }

  async findAttendantsByFundingId(fundingId: number): Promise<AttendantType[]> {
    const attendants = await this.attendantRepository.find({
      where: { fundingId },
    });
    if (!attendants)
      throw new NotFoundException(`참석 정보를 찾을 수 없습니다.`);
    return this.getAttendantsWithMenuInfo(attendants);
  }

  async updateAttendant(
    newAttendant: UpdateAttendantDto,
    newMenuInfos: attendantMenuInfoType[],
  ): Promise<AttendantType> {
    const attendant = await this.attendantRepository.findOne({
      where: { id: newAttendant.id },
    });
    if (!attendant)
      throw new NotFoundException(`참석 메뉴 정보를 찾을 수 없습니다.`);
    attendant['hasPaid'] = newAttendant['hasPaid'];
    await this.attendantRepository.save(attendant);

    const menuInfos =
      await this.attendantMenuInfoService.findAttendantMenuInfosByAttendantId(
        attendant.id,
      );

    const insertingMenuInfos = [];

    newMenuInfos.forEach((newMenuInfo) => {
      newMenuInfo['attendantId'] = newAttendant.id;
      newMenuInfo['userId'] = newAttendant.userId;
      const existedMenuInfo = menuInfos.find(
        (menuInfo) => menuInfo.id === newMenuInfo.id,
      );

      if (existedMenuInfo) {
        for (const key in newMenuInfo) {
          existedMenuInfo[key] = newMenuInfo[key];
        }
      } else {
        insertingMenuInfos.push(newMenuInfo);
      }
    });

    insertingMenuInfos.forEach((insertingMenuInfo) =>
      menuInfos.push(insertingMenuInfo),
    );

    await this.attendantMenuInfoService.saveAttendantMenuInfos(menuInfos);

    return this.getAttendantWithMenuInfo(attendant);
  }

  async deleteAttendant(id: number): Promise<number> {
    const affectedRowsCnt = (await this.attendantRepository.delete(id))
      .affected;
    if (affectedRowsCnt === 0)
      throw new NotFoundException(`삭제할 참석 정보를 삭제할 수 없습니다.`);
    return HttpStatus.ACCEPTED;
  }

  // attendant에 menu info를 넣어주는 함수들
  async getAttendantWithMenuInfo(attendant: AttendantEntity) {
    const attendantWithMenuInfo: AttendantType = {
      ...attendant,
      menuInfo:
        await this.attendantMenuInfoService.findAttendantMenuInfosByAttendantId(
          attendant.id,
        ),
    };
    return attendantWithMenuInfo;
  }

  async getAttendantsWithMenuInfo(attendants: AttendantEntity[]) {
    const attendantsWithMenuInfo: AttendantType[] = await Promise.all(
      attendants.map(async (attendant) => {
        return this.getAttendantWithMenuInfo(attendant);
      }),
    );
    return attendantsWithMenuInfo;
  }
}
