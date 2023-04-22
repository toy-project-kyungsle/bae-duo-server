import { Controller, Get, Delete, Param, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Post('/')
  async createFunding(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.setUser(createUserDto);
  }

  @Delete('/:id')
  async deleteUserById(@Param('id') id: number): Promise<number> {
    return this.userService.removeUser(id);
  }
}
