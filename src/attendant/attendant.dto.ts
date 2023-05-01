export class CreateAttendantDto {
  fundingId: number;
  userId: number;
  userName: string;
  menuInfo: string;
}

export class UpdateAttendantDto {
  id: number;
  fundingId: number;
  userId: number;
  userName: string;
  hasPaid: boolean;
  menuInfo: string;
}
