import { Controller, Get, Post, Body, Param, HttpException, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.model';
import { UserDto } from './user.dto';

@Controller('v1/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getAll(): Promise<User[]> {
    return this.userService.getAll();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User> {
    return await this.userService.getUserById(id);
  }

  @Post()
  async addUser(@Body() user: UserDto): Promise<User> {
    try {
      return this.userService.addUser(user);
    }
    catch (error) {
      throw new BadRequestException('An error occurred while trying to add the user.', error);
    }
  }
}
