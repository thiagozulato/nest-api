import { Controller, Get, Post, Body, Param, BadRequestException, UseGuards, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.model';
import { UserDto } from './user.dto';
import { AuthGuard } from '@nestjs/passport';
import { QueryDto } from './query.dto';

@Controller('v1/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard())
  async getAll(): Promise<User[]> {
    return this.userService.getAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  async getUserById(@Param('id') id: string): Promise<User> {
    return await this.userService.getUserById(id);
  }

  @Post('search')
  @UseGuards(AuthGuard())
  async customQuery(@Body() query: QueryDto): Promise<User[]> {
    return await this.userService.customQuery(query);
  }

  @Post()
  @UseGuards(AuthGuard())
  async addUser(@Body() user: UserDto): Promise<User> {
    try {
      return this.userService.addUser(user);
    }
    catch (error) {
      throw new BadRequestException('An error occurred while trying to add the user.', error);
    }
  }
}
