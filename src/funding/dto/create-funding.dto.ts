export class CreateFundingDto {
  starterId: number;
  // starter: string;
  brandId: number;
  deadline: Date;
  minPrice?: number | null;
  minMember?: number | null;
  description?: string | null;
}
