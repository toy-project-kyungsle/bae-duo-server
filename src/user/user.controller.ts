import { Controller, Get, Delete, Param, Post, Body } from '@nestjs/common';
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

  @Post('/')
  async createFunding(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.saveUser(createUserDto);
  }

  @Delete('/:id')
  async deleteUserById(@Param('id') id: number): Promise<number> {
    return this.userService.deleteUser(id);
  }
}
