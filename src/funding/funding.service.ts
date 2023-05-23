import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Funding } from './funding.entity';
import { Brands } from 'src/brands/brands.entity';
import { Repository } from 'typeorm';
import { CreateFundingDto } from './dto/create-funding.dto';
import { SearchFundingDto } from './dto/search-funding.dto';
import { UpdateFundingDto } from './dto/update-funding.dto';
import { UploadsService } from 'src/uploads/uploads.service';
import { FundingDto } from './dto/funding.dto';

@Injectable()
export class FundingService {
  constructor(
    @InjectRepository(Funding)
    private fundingRepository: Repository<Funding>,
    @InjectRepository(Brands)
    private brandRepository: Repository<Brands>,
    private uploadsService: UploadsService,
  ) {}

  async findFundingById(id: number): Promise<Funding> {
    const funding = await this.fundingRepository.findOne({ where: { id } });
    if (!funding)
      throw new NotFoundException(`펀딩을 찾을 수 없습니다. : ${id}`);
    return funding;
  }

  async findFundingResById(id: number): Promise<FundingDto> {
    const funding = await this.fundingRepository.findOne({ where: { id } });
    if (!funding)
      throw new NotFoundException(`펀딩을 찾을 수 없습니다. : ${id}`);

    const imageIds = funding.menuImageIds
      ? funding.menuImageIds.split(',').map((id) => Number(id))
      : null;

    let menuImages = null;
    if (imageIds) {
      const fileList = await this.uploadsService.findUploadsListByIds(imageIds);
      menuImages =
        fileList.length > 0
          ? fileList.map((file) => ({
              id: file.id,
              url: file.url,
            }))
          : null;
    }

    return new FundingDto(
      funding.id,
      funding.starter,
      funding.brandId,
      funding.brand,
      funding.brandImage,
      funding.minPrice,
      funding.curPrice,
      funding.minMember,
      funding.curMember,
      funding.deadline,
      funding.status,
      funding.description,
      menuImages,
      funding.createdAt,
    );
  }

  async findAllFundings(query: SearchFundingDto): Promise<Funding[]> {
    const fundings = query?.status
      ? await this.fundingRepository.find({
          where: {
            status: query.status,
          },
          order: {
            createdAt: 'DESC',
          },
        })
      : await this.fundingRepository.find({
          order: {
            createdAt: 'DESC',
          },
        });

    if (!fundings) throw new NotFoundException(`펀딩을 불러올 수 없습니다.`);
    return fundings;
  }

  async updateFunding(id: number, newFunding: UpdateFundingDto): Promise<void> {
    const funding = await this.fundingRepository.findOne({
      where: { id },
    });

    if (!funding) {
      throw new NotFoundException(`펀딩을 찾을 수 없습니다. : ${id}`);
    }
    if (funding.status !== 1) {
      throw new NotFoundException('펀딩은 진행 중일 때만 수정이 가능합니다.');
    }
    // if (funding.starter !== newFunding.starter) {
    //   throw new NotFoundException('펀딩을 만든 사용자만 수정할 수 있습니다.');
    // }

    const targetBarnd = await this.brandRepository.findOne({
      where: { id: newFunding.brandId },
    });

    if (!targetBarnd) {
      throw new NotFoundException(`선택한 브랜드는 없는 브랜드입니다.`);
    }

    if (funding.brandId !== newFunding.brandId) {
      newFunding.brandId = targetBarnd.id;
      newFunding.brand = targetBarnd.name;
    }

    await this.fundingRepository.update(id, newFunding);
  }

  async saveFunding(
    sentData: CreateFundingDto,
    files: Express.Multer.File[],
  ): Promise<Funding> {
    const targetBrand = await this.brandRepository.findOne({
      where: { id: sentData.brandId },
    });

    if (!targetBrand) {
      throw new NotFoundException(`선택한 브랜드는 없는 브랜드입니다.`);
    }

    const fileIdList = [];

    for (let i = 0; i < files.length; i++) {
      const fileInfo = await this.uploadsService.uploadFile(files[i]);
      fileIdList.push(fileInfo.id);
    }

    const instance = await this.fundingRepository.save({
      ...sentData,
      brand: targetBrand.name,
      brandImage: targetBrand?.brandImage || null,
      menuImageIds: fileIdList.length > 0 ? fileIdList.join(',') : null,
    });

    if (!instance) {
      throw new NotFoundException(`펀딩을 생성할 수 없습니다.`);
    }
    return instance;
  }

  async deleteFundingById(id: number): Promise<number> {
    const affectedRowsCnt = (await this.fundingRepository.delete(id)).affected;
    if (affectedRowsCnt === 0)
      throw new NotFoundException(`삭제할 펀딩을 찾을 수 없습니다.`);
    return HttpStatus.ACCEPTED;
  }
}
