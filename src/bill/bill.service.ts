import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bill } from './bill.entity';
import { CreateBillDto } from './dto/create-bill.dto';
import { Repository } from 'typeorm';
import { priceInfoType } from './biil.type';
import { AttendantService } from 'src/attendant/attendant.service';

@Injectable()
export class BillService {
  constructor(
    @InjectRepository(Bill)
    private billRepository: Repository<Bill>,
    private attendantService: AttendantService,
  ) {}

  async saveBill(sentData: CreateBillDto): Promise<Bill> {
    const instance = await this.billRepository.save(sentData);
    if (!instance) throw new NotFoundException(`주문서를 생성할 수 없습니다.`);
    return instance;
  }

  async findAllBills(): Promise<Bill[]> {
    const bills = await this.billRepository.find();
    if (!bills) throw new NotFoundException(`주문서를 찾을 수 없습니다.`);
    return bills;
  }

  async findBillById(id: number): Promise<Bill> {
    const bill = await this.billRepository.findOne({ where: { id } });
    const attendants = await this.attendantService.findAttendantsByFundingId(
      id,
    );
    console.log(attendants);
    const priceInfoArr: priceInfoType[] = attendants.map((attendant) => {
      // const totalMenuPrice = attendant.menuInfo.reduce()
      return { userId: attendant.userId, userName: attendant.userName };
    });
    if (!bill) throw new NotFoundException(`주문서를 찾을 수 없습니다.`);
    return bill;
  }

  async deleteBill(id: number): Promise<number> {
    const affectedRowsCnt = (await this.billRepository.delete(id)).affected;
    if (affectedRowsCnt === 0)
      throw new NotFoundException(`삭제할 주문서를 찾을 수 없습니다.`);
    return HttpStatus.ACCEPTED;
  }
}
