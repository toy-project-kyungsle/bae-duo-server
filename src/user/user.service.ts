import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getAllUsers(): Promise<User[]> {
    const found = await this.userRepository.find();
    if (!found) {
      throw new NotFoundException(`값을 찾을 수 없습니다.`);
    }
    return found;
  }

  async setUser(sentData: CreateUserDto): Promise<User> {
    const instance = await this.userRepository.save(sentData);
    if (!instance) {
      throw new NotFoundException(`주문서를 생성할 수 없습니다.`);
    }
    return instance;
  }

  async removeUser(id: number): Promise<number> {
    const affectedRowsCnt = (await this.userRepository.delete(id)).affected;
    if (affectedRowsCnt === 0)
      throw new NotFoundException(`삭제할 유저를 찾을 수 없습니다.`);
    return HttpStatus.ACCEPTED;
  }
}
