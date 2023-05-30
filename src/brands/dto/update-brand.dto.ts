export class UpdateBrandsDto {
  createdUserId: number;
  name: string; // 브랜드명
  orderType: number; // 배달 or 포장
  // brandImage: string;
  defaultDeadLine: Date | null;
  defaultMinPrice: number | null;
  defaultMinMember: number | null;
}
