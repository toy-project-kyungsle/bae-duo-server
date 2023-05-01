import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AttendantMenuInfo as AttendantMenuInfoEntity } from './attendantMenuInfo.entity';
import { Repository } from 'typeorm';
import { CreateAttendantMenuInfoDto } from './attendantMenuInfo.dto';
import { attendantMenuInfoType } from './attendantMenuInfo.type';

@Injectable()
export class AttendantMenuInfoService {
  constructor(
    @InjectRepository(AttendantMenuInfoEntity)
    private attendantMenuInfoRepository: Repository<AttendantMenuInfoEntity>,
  ) {}

  async saveAttendantMenuInfo(
    sentData: CreateAttendantMenuInfoDto,
  ): Promise<attendantMenuInfoType> {
    const instance = await this.attendantMenuInfoRepository.save(sentData);
    if (!instance) {
      throw new NotFoundException(`참석 메뉴 정보를 추가할 수 없습니다.`);
    }
    return instance;
  }

  async saveAttendantMenuInfos(
    sentData: CreateAttendantMenuInfoDto[],
  ): Promise<attendantMenuInfoType[]> {
    const instance = await this.attendantMenuInfoRepository.save(sentData);
    if (!instance) {
      throw new NotFoundException(`참석 메뉴 정보를 추가할 수 없습니다.`);
    }
    return instance;
  }

  async findAllAttendantMenuInfo(): Promise<attendantMenuInfoType[]> {
    const found = await this.attendantMenuInfoRepository.find();
    if (!found) {
      throw new NotFoundException(`참석 메뉴 정보를 찾을 수 없습니다.`);
    }
    return found;
  }

  async findAttendantMenuInfosByAttendantId(
    attendantId: number,
  ): Promise<attendantMenuInfoType[]> {
    const found = await this.attendantMenuInfoRepository.find({
      where: { attendantId },
    });
    if (!found) {
      throw new NotFoundException(`참석 메뉴 정보를 찾을 수 없습니다.`);
    }
    return found;
  }

  async deleteAttendantMenuInfoById(id: number): Promise<number> {
    const affectedRowsCnt = (await this.attendantMenuInfoRepository.delete(id))
      .affected;
    if (affectedRowsCnt === 0)
      throw new NotFoundException(`참석 메뉴 정보를 삭제할 수 없습니다.`);
    return HttpStatus.ACCEPTED;
  }
}
