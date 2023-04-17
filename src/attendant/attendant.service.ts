import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Attendant } from './attendant.entity';
import { Repository } from 'typeorm';
import {
  CreateAttendantDto,
  UpdateAttendantDto,
} from './dto/create-attendant.dto';

@Injectable()
export class AttendantService {
  constructor(
    @InjectRepository(Attendant)
    private attendantRepository: Repository<Attendant>,
  ) {}

  async setAttendant(sentData: CreateAttendantDto): Promise<Attendant> {
    const instance = await this.attendantRepository.save(sentData);
    if (!instance) {
      throw new NotFoundException(`주문서를 생성할 수 없습니다.`);
    }
    return instance;
  }

  async updateAttendant(id: number, newAttendant: Attendant): Promise<void> {
    const res = await this.attendantRepository.update(id, newAttendant);
    if (!res) {
      // TODO NotFoundException 을 쓰는게 아닌 것 같은데 일단 씀
      throw new NotFoundException('주문을 업데이트 할 수 없습니다.');
    }
    return;
  }

  async getAttendantByUserId(userId: number): Promise<Attendant> {
    const found = await this.attendantRepository.findOne({ where: { userId } });
    if (!found) {
      throw new NotFoundException(`값을 찾을 수 없습니다.`);
    }
    return found;
  }

  async getAllAttendants(): Promise<Attendant[]> {
    const found = await this.attendantRepository.find();
    if (!found) {
      throw new NotFoundException(`값을 찾을 수 없습니다.`);
    }
    return found;
  }
}
