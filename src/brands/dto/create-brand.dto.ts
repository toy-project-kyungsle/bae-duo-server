export class CreateBrandsDto {
  createdId: number;
  name: string;
  orderType: number;
  menuImage: string;
  defaultDeadLine: string | null;
  defaultMinPrice: number | null;
}
