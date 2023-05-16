// import { IsNumber, IsString } from 'class-validator';

export class CreateBrandsDto {
  // @IsNumber()
  createdUserId: number;
  // @IsString()
  name: string;
  // @IsNumber()
  orderType: number;
  defaultDeadLine: Date | null;
  // @IsNumber()
  defaultMinPrice: number | null;
  // @IsNumber()
  defaultMinMember: number | null;
}
