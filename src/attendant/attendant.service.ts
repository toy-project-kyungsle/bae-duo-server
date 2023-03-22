import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Attendant } from './attendant.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AttendantService {
  constructor(
    @InjectRepository(Attendant)
    private attendantRepository: Repository<Attendant>,
  ) {}

  async getAllFundings(): Promise<Attendant[]> {
    const found = await this.attendantRepository.find();
    if (!found) {
      throw new NotFoundException(`값을 찾을 수 없습니다.`);
    }
    return found;
  }
}
