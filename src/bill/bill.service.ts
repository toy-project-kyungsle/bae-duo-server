import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bill } from './bill.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BillService {
  constructor(
    @InjectRepository(Bill)
    private billRepository: Repository<Bill>,
  ) {}

  async getAllFundings(): Promise<Bill[]> {
    const found = await this.billRepository.find();
    if (!found) {
      throw new NotFoundException(`값을 찾을 수 없습니다.`);
    }
    return found;
  }
}
