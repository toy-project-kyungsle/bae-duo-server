import { HttpStatus, NotFoundException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Uploads } from './uploads.entity';
import { Repository } from 'typeorm';
import { CreateUploadsDto } from './dto/create-uploads.dto';

@Injectable()
export class UploadsService {
  constructor(
    @InjectRepository(Uploads)
    private uploadsRepository: Repository<Uploads>,
  ) {}

  async saveUploads(sentData: CreateUploadsDto): Promise<Uploads> {
    console.log('SENT', sentData);
    const instance = await this.uploadsRepository.save(sentData);
    if (!instance) {
      throw new NotFoundException(`업로드 리스트를 생성할 수 없습니다.`);
    }
    return instance;
  }

  async findUploadsById(name: string): Promise<Uploads> {
    const upload = await this.uploadsRepository.findOne({ where: { name } });
    if (!upload)
      throw new NotFoundException(`브랜드 리스트를 찾을 수 없습니다.`);
    return upload;
  }
}
