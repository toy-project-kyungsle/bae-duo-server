import {
  Controller,
  Get,
  Delete,
  Param,
  Post,
  Body,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
  async findAllUsers(): Promise<User[]> {
    return this.userService.findAllUsers();
  }

  @Get('/:id')
  async findUserById(@Param('id') id: number): Promise<User> {
    return this.userService.findUserById(id);
  }

  @Post('/')
  async findUser(
    @Body('name') name: string,
    @Body('password') password: string,
  ) {
    return this.userService.findUser(name, password);
  }

  @Post('/add')
  async createUser(
    @Body('name') name: string,
    @Body('password') password: string,
  ) {
    return this.userService.createUser(name, password);
  }
}
