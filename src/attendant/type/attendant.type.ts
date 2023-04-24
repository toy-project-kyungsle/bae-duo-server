import { attendantMenuInfoType } from 'src/attendantMenuInfo/type/attendantMenuInfo.type';

export interface attendantWithMenuInfoType {
  id: number;
  fundingId: number;
  userId: number;
  userName: string;
  menuInfo: attendantMenuInfoType[];
  createdAt: string;
}
