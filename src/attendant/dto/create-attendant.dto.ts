export class CreateAttendantDto {
  fundingId: number;
  userId: number;
  userName: string;
  menuInfo: { [x: string]: number }[];
}
