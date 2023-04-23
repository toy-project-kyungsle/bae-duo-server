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

  async updateAttendant(id: number, newAttendant: Attendant): Promise<void> {
    const res = await this.attendantRepository.update(id, newAttendant);
    if (!res) {
      // TODO NotFoundException 을 쓰는게 아닌 것 같은데 일단 씀
      throw new NotFoundException('참석 정보를 업데이트 할 수 없습니다.');
    }
    return;
  }

  async findAttendantById(id: number): Promise<Attendant> {
    const attendant = await this.attendantRepository.findOne({
      where: { id },
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
