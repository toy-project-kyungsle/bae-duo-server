export class CreateBrandsDto {
  createdId: number;
  uuid: string;
  name: string;
  orderType: number;
  menuImage: string;
  defaultDeadLine: string | null;
  defaultMinPrice: number | null;
}
