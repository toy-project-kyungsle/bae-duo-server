import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Attendant } from './attendant.entity';
import { Repository } from 'typeorm';
import { CreateAttendantDto } from './dto/create-attendant.dto';
import { AttendantMenuInfo } from 'src/attendantMenuInfo/attendantMenuInfo.entity';

@Injectable()
export class AttendantService {
  constructor(
    @InjectRepository(Attendant)
    private attendantRepository: Repository<Attendant>,
    @InjectRepository(AttendantMenuInfo)
    private attendantMenuInfoRepository: Repository<AttendantMenuInfo>,
  ) {}

  async saveAttendant(sentData: CreateAttendantDto): Promise<Attendant> {
    const result = await this.attendantRepository.save(sentData);
    if (!result) throw new NotFoundException(`참석 정보를 추가할 수 없습니다.`);
    return result;
  }

  async updateAttendant(
    newAttendant: Attendant,
    newMenuInfos: AttendantMenuInfo[],
  ): Promise<Attendant> {
    const attendant: Attendant = await this.findAttendantById(newAttendant.id);
    if (!attendant)
      throw new NotFoundException(`참석 메뉴 정보를 찾을 수 없습니다.`);
    attendant['hasPaid'] = newAttendant['hasPaid'];
    await this.attendantRepository.save(attendant);

    const menuInfos = await this.attendantMenuInfoRepository.find({
      where: { attendantId: attendant.id },
    });

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

    await this.attendantMenuInfoRepository.save(menuInfos);

    return this.findAttendantWithMenuInfo(attendant);
  }

  async findAttendantById(id: number): Promise<Attendant> {
    const attendant = await this.attendantRepository.findOne({
      where: { id },
    });
    if (!attendant)
      throw new NotFoundException(`참석 정보를 찾을 수 없습니다.`);
    return this.findAttendantWithMenuInfo(attendant);
  }

  async findAttendantByIdAndUserId(
    attendantId: number,
    userId: number,
  ): Promise<Attendant> {
    const attendant = await this.attendantRepository.findOne({
      where: { id: attendantId, userId },
    });
    if (!attendant)
      throw new NotFoundException(`참석 정보를 찾을 수 없습니다.`);
    return this.findAttendantWithMenuInfo(attendant);
  }

  async findAllAttendants(): Promise<Attendant[]> {
    const attendants = await this.attendantRepository.find();
    if (!attendants)
      throw new NotFoundException(`참석 정보를 찾을 수 없습니다.`);

    return this.findAttendantsWithMenuInfo(attendants);
  }

  async deleteAttendant(id: number): Promise<number> {
    const affectedRowsCnt = (await this.attendantRepository.delete(id))
      .affected;
    if (affectedRowsCnt === 0)
      throw new NotFoundException(`삭제할 참석 정보를 삭제할 수 없습니다.`);
    return HttpStatus.ACCEPTED;
  }

  // menu Info codes
  async findMenuInfoFromDB(attendantId: number) {
    return await this.attendantMenuInfoRepository.find({
      where: { attendantId },
    });
  }

  async findAttendantWithMenuInfo(attendant: Attendant) {
    attendant['menuInfo'] = await this.findMenuInfoFromDB(attendant.id);
    return attendant;
  }

  async findAttendantsWithMenuInfo(attendants: Attendant[]) {
    return await Promise.all(
      attendants.map(async (attendant) => {
        attendant['menuInfo'] = await this.findMenuInfoFromDB(attendant.id);
        return attendant;
      }),
    );
  }
}
