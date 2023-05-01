import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BillEntity } from './bill.entity';
import { CreateBillDto } from './dto/create-bill.dto';
import { Repository } from 'typeorm';
import { billType, priceInfoType } from './biil.type';
import { AttendantService } from 'src/attendant/attendant.service';
import { AttendantType } from 'src/attendant/attendant.type';

@Injectable()
export class BillService {
  constructor(
    @InjectRepository(BillEntity)
    private billRepository: Repository<BillEntity>,
    private attendantService: AttendantService,
  ) {}

  async saveBill(sentData: CreateBillDto): Promise<BillEntity> {
    const instance = await this.billRepository.save(sentData);
    if (!instance) throw new NotFoundException(`주문서를 생성할 수 없습니다.`);
    return instance;
  }

  async findAllBills(): Promise<billType[]> {
    const bills = await this.billRepository.find();
    const billsWithPriceInfos: billType[] = await Promise.all(
      bills.map(async (bill) => {
        const attendants =
          await this.attendantService.findAttendantsByFundingId(bill.fundingId);
        return {
          ...bill,
          priceInfo: this.getPriceInfoFromAttendants(bill, attendants),
        };
      }),
    );
    if (!billsWithPriceInfos)
      throw new NotFoundException(`주문서를 찾을 수 없습니다.`);
    return billsWithPriceInfos;
  }

  async findBillById(id: number): Promise<billType> {
    const bill = await this.billRepository.findOne({ where: { id } });
    const attendants = await this.attendantService.findAttendantsByFundingId(
      id,
    );
    const billWithPriceInfo: billType = {
      ...bill,
      priceInfo: this.getPriceInfoFromAttendants(bill, attendants),
    };
    if (!billWithPriceInfo)
      throw new NotFoundException(`주문서를 찾을 수 없습니다.`);
    return billWithPriceInfo;
  }

  async deleteBill(id: number): Promise<number> {
    const affectedRowsCnt = (await this.billRepository.delete(id)).affected;
    if (affectedRowsCnt === 0)
      throw new NotFoundException(`삭제할 주문서를 찾을 수 없습니다.`);
    return HttpStatus.ACCEPTED;
  }

  getPriceInfoFromAttendants(
    bill: BillEntity,
    attendants: AttendantType[],
  ): priceInfoType[] {
    const priceInfo: priceInfoType[] = attendants.map((attendant) => {
      const totalMenuPrice = attendant.menuInfo.reduce(
        (acc, cur) => acc + cur.menuPrice,
        0,
      );
      const deliveryFeeByPerson = bill.deliveryFee / attendants.length;
      return {
        userId: attendant.userId,
        userName: attendant.userName,
        totalPrice: totalMenuPrice + deliveryFeeByPerson,
        hasPaid: attendant.hasPaid,
      };
    });
    return priceInfo;
  }
}
