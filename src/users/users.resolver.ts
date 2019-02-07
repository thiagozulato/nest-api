import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UserDto } from './user.dto';

@Resolver('Users')
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Query()
  async users() {
    return await this.userService.getAll();
  }

  @Query()
  async user(@Args('id') id: string) {
    return await this.userService.getUserById(id);
  }

  @Mutation()
  async createUser(@Args('user') user: UserDto) {
    return await this.userService.addUser(user);
  }
}
