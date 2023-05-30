export class CreateBrandsDto {
  createdUserId: number;
  name: string;
  orderType: number;
  defaultDeadLine: Date | null;
  defaultMinPrice: number | null;
  defaultMinMember: number | null;
}
