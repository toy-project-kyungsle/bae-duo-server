import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bill } from './bill.entity';
import { CreateBillDto } from './dto/create-bill.dto';
import { Repository } from 'typeorm';
import { Attendant } from 'src/attendant/attendant.entity';
import { AttendantMenuInfo } from 'src/attendantMenuInfo/attendantMenuInfo.entity';
import { attendantWithMenuInfoType } from 'src/attendant/type/attendant.type';
import { attendantMenuInfoType } from 'src/attendantMenuInfo/type/attendantMenuInfo.type';

@Injectable()
export class BillService {
  constructor(
    @InjectRepository(Bill)
    private billRepository: Repository<Bill>,
    @InjectRepository(Attendant)
    private attendantRepository: Repository<Attendant>,
    @InjectRepository(AttendantMenuInfo)
    private attendantMenuInfoRepository: Repository<AttendantMenuInfo>,
  ) {}

  async findAllBills(): Promise<Bill[]> {
    const bills = await this.billRepository.find();
    if (!bills) throw new NotFoundException(`주문서를 찾을 수 없습니다.`);
    return bills;
  }

  async findBillById(id: number): Promise<Bill> {
    const bill = await this.billRepository.findOne({ where: { id } });
    if (!bill) throw new NotFoundException(`주문서를 찾을 수 없습니다.`);
    const attendant = await this.attendantRepository.findOne({
      where: { id },
    });
    if (!attendant)
      throw new NotFoundException(`참석 정보를 찾을 수 없습니다.`);
    const attendantWithMenuInfo = await this.findAttendantWithMenuInfo(
      attendant,
    );
    attendantWithMenuInfo.menuInfo.reduce((menuInfo, acc: number) => {
      return menuInfo.menuPrice + acc;
    }, 0);
    return bill;
  }

  async findBillWithDeliveryFee(id: number): Promise<Bill> {
    const bill = await this.billRepository.findOne({ where: { id } });
    if (!bill) throw new NotFoundException(`주문서를 찾을 수 없습니다.`);
    return bill;
  }

  async saveBill(sentData: CreateBillDto): Promise<Bill> {
    const instance = await this.billRepository.save(sentData);
    if (!instance) throw new NotFoundException(`주문서를 생성할 수 없습니다.`);
    return instance;
  }

  async deleteBill(id: number): Promise<number> {
    const affectedRowsCnt = (await this.billRepository.delete(id)).affected;
    if (affectedRowsCnt === 0)
      throw new NotFoundException(`삭제할 주문서를 찾을 수 없습니다.`);
    return HttpStatus.ACCEPTED;
  }

  // utils
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
