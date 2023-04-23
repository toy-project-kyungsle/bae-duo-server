export class CreateAttendantDto {
  fundingId: number;
  userId: number;
  userName: string;
  menuInfo: string;
}

export class UpdateAttendantDto {
  userId: number;
}
