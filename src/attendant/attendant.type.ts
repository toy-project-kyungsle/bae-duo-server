import { attendantMenuInfoType } from 'src/attendantMenuInfo/attendantMenuInfo.type';

export interface AttendantType {
  id: number;
  fundingId: number;
  userId: number;
  userName: string;
  hasPaid: boolean;
  menuInfo: attendantMenuInfoType[];
  createdAt: Date;
}
