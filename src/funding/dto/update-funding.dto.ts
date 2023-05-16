export class UpdateFundingDto {
  starter: string;
  brandId?: number;
  brand?: string;
  deadline?: Date;
  minPrice?: number | null;
  minMember?: number | null;
  description?: string | null;
}
