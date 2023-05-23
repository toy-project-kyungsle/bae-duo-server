import { UploadsDto } from 'src/uploads/dto/uploads.dto';
import { FundingStatus } from '../funding.model';

export class FundingDto {
  constructor(
    private id: number,
    private starter: string,
    private brandId: number,
    private brand: string,
    private brandImage: string | null,
    private minPrice: number,
    private curPrice: number,
    private minMember: number,
    private curMember: number,
    private deadline: Date,
    private status: FundingStatus,
    private description: string | null,
    private menuImages: UploadsDto[] | null,
    private createdAt: Date,
  ) {}
}
